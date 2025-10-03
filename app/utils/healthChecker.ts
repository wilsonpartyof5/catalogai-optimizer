import { db } from "./db"
import { ShopifySyncService } from "./shopifySync"
import { emailService, WeeklyHealthSummary } from "./emailService"
import { analyticsService, PerformanceMetrics } from "./analyticsService"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import axios from "axios"

const ajv = new Ajv()
addFormats(ajv)

export interface HealthCheckResult {
  score: number
  totalProducts: number
  validProducts: number
  gaps: HealthGap[]
  trends: HealthTrend[]
  timestamp: Date
}

export interface HealthGap {
  field: string
  severity: 'warning' | 'error' | 'critical'
  count: number
  products: string[]
  fixable: boolean
}

export interface HealthTrend {
  date: string
  score: number
  totalProducts: number
  validProducts: number
}

export interface HealthCheckOptions {
  maxProducts?: number
  includePings?: boolean
  includeInventory?: boolean
  includeValidation?: boolean
}

export class HealthCheckerService {
  private shopDomain: string
  private accessToken: string

  constructor(shopDomain: string, accessToken: string) {
    this.shopDomain = shopDomain
    this.accessToken = accessToken
  }

  async performHealthCheck(options: HealthCheckOptions = {}): Promise<HealthCheckResult> {
    const {
      maxProducts = 100,
      includePings = true,
      includeInventory = true,
      includeValidation = true
    } = options

    try {
      // Get latest products from database
      const user = await db.user.findUnique({
        where: { shopId: this.shopDomain }
      })

      if (!user) {
        throw new Error('User not found')
      }

      // Get recent products (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const products = await db.product.findMany({
        where: {
          userId: user.id,
          updatedAt: {
            gte: thirtyDaysAgo
          }
        },
        take: maxProducts,
        orderBy: {
          updatedAt: 'desc'
        }
      })

      const gaps: HealthGap[] = []
      let validProducts = 0

      // Validation checks
      if (includeValidation) {
        const validationResults = await this.validateProducts(products)
        gaps.push(...validationResults.gaps)
        validProducts = validationResults.validCount
      }

      // URL ping checks
      if (includePings) {
        const pingResults = await this.checkProductUrls(products.slice(0, 20)) // Limit to 20 for performance
        gaps.push(...pingResults)
      }

      // Inventory checks
      if (includeInventory) {
        const inventoryResults = await this.checkInventoryDeltas(products)
        gaps.push(...inventoryResults)
      }

      // Calculate overall score
      const score = this.calculateHealthScore(products.length, validProducts, gaps)

      // Get trends from last 7 days
      const trends = await this.getHealthTrends(user.id, 7)

      // Save audit record
      await db.audit.create({
        data: {
          userId: user.id,
          score,
          totalProducts: products.length,
          validProducts,
          gaps: gaps as any, // Store as JSON
          timestamp: new Date()
        }
      })

      // Track performance metrics
      const performanceMetrics: PerformanceMetrics = {
        userId: user.id,
        shopDomain: this.shopDomain,
        timestamp: new Date(),
        healthScore: score,
        totalProducts: products.length,
        validProducts,
        issuesFound: gaps.length,
        issuesFixed: 0, // Will be updated after auto-fix
        aiUsage: user.aiUsage,
        syncCount: 0, // Will be calculated separately
        enrichmentCount: 0 // Will be calculated separately
      }

      await analyticsService.trackPerformanceMetrics(performanceMetrics)

      return {
        score,
        totalProducts: products.length,
        validProducts,
        gaps,
        trends,
        timestamp: new Date()
      }

    } catch (error) {
      console.error('Health check failed:', error)
      throw new Error(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async validateProducts(products: any[]): Promise<{ gaps: HealthGap[], validCount: number }> {
    const gaps: HealthGap[] = []
    let validCount = 0

    const requiredFields = [
      'title', 'description', 'vendor', 'productType', 'tags', 
      'images', 'variants', 'options', 'status'
    ]

    const fieldCounts: { [key: string]: number } = {}
    const missingFieldProducts: { [key: string]: string[] } = {}

    for (const product of products) {
      let isValid = true

      for (const field of requiredFields) {
        if (!product[field] || 
            (Array.isArray(product[field]) && product[field].length === 0) ||
            (typeof product[field] === 'string' && product[field].trim() === '')) {
          
          fieldCounts[field] = (fieldCounts[field] || 0) + 1
          missingFieldProducts[field] = missingFieldProducts[field] || []
          missingFieldProducts[field].push(product.id)
          isValid = false
        }
      }

      if (isValid) validCount++
    }

    // Create gaps for missing fields
    for (const [field, count] of Object.entries(fieldCounts)) {
      if (count > 0) {
        const severity = count > products.length * 0.5 ? 'critical' : 
                        count > products.length * 0.2 ? 'error' : 'warning'
        
        gaps.push({
          field,
          severity,
          count,
          products: missingFieldProducts[field],
          fixable: ['title', 'description', 'tags'].includes(field)
        })
      }
    }

    return { gaps, validCount }
  }

  private async checkProductUrls(products: any[]): Promise<HealthGap[]> {
    const gaps: HealthGap[] = []
    const failedUrls: string[] = []

    for (const product of products) {
      if (product.handle) {
        try {
          const url = `https://${this.shopDomain}/products/${product.handle}`
          const response = await axios.get(url, { 
            timeout: 5000,
            validateStatus: (status) => status < 500 // Accept redirects and client errors
          })
          
          if (response.status >= 400) {
            failedUrls.push(product.id)
          }
        } catch (error) {
          failedUrls.push(product.id)
        }
      }
    }

    if (failedUrls.length > 0) {
      gaps.push({
        field: 'product_url',
        severity: failedUrls.length > products.length * 0.3 ? 'error' : 'warning',
        count: failedUrls.length,
        products: failedUrls,
        fixable: false
      })
    }

    return gaps
  }

  private async checkInventoryDeltas(products: any[]): Promise<HealthGap[]> {
    const gaps: HealthGap[] = []
    const lowInventory: string[] = []
    const outOfStock: string[] = []

    for (const product of products) {
      if (product.variants && Array.isArray(product.variants)) {
        for (const variant of product.variants) {
          if (variant.inventoryQuantity !== undefined) {
            if (variant.inventoryQuantity === 0) {
              outOfStock.push(variant.id)
            } else if (variant.inventoryQuantity < 5) {
              lowInventory.push(variant.id)
            }
          }
        }
      }
    }

    if (outOfStock.length > 0) {
      gaps.push({
        field: 'inventory_out_of_stock',
        severity: 'error',
        count: outOfStock.length,
        products: outOfStock,
        fixable: false
      })
    }

    if (lowInventory.length > 0) {
      gaps.push({
        field: 'inventory_low',
        severity: 'warning',
        count: lowInventory.length,
        products: lowInventory,
        fixable: false
      })
    }

    return gaps
  }

  private calculateHealthScore(totalProducts: number, validProducts: number, gaps: HealthGap[]): number {
    if (totalProducts === 0) return 100

    // Base score from validation
    let score = (validProducts / totalProducts) * 100

    // Deduct points for gaps
    for (const gap of gaps) {
      const penalty = gap.severity === 'critical' ? 5 : 
                     gap.severity === 'error' ? 3 : 1
      score -= Math.min(penalty * (gap.count / totalProducts), 10)
    }

    return Math.max(0, Math.round(score))
  }

  private async getHealthTrends(userId: string, days: number): Promise<HealthTrend[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const audits = await db.audit.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate
        }
      },
      orderBy: {
        timestamp: 'asc'
      }
    })

    return audits.map(audit => ({
      date: audit.timestamp.toISOString().split('T')[0],
      score: audit.score,
      totalProducts: audit.totalProducts,
      validProducts: audit.validProducts
    }))
  }

  async autoFixGaps(gaps: HealthGap[]): Promise<{ fixed: number, failed: number }> {
    let fixed = 0
    let failed = 0

    for (const gap of gaps) {
      if (!gap.fixable) continue

      try {
        // This would integrate with AI enrichment service
        // For now, we'll just log the intent
        console.log(`Auto-fixing gap: ${gap.field} for ${gap.count} products`)
        
        // TODO: Implement actual AI fixes
        // await this.aiEnrichmentService.fixField(gap.field, gap.products)
        
        fixed++
      } catch (error) {
        console.error(`Failed to fix gap ${gap.field}:`, error)
        failed++
      }
    }

    return { fixed, failed }
  }

  async sendWeeklyHealthSummary(userId: string): Promise<boolean> {
    try {
      // Get health trends from last 14 days
      const fourteenDaysAgo = new Date()
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

      const audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: {
            gte: fourteenDaysAgo
          }
        },
        orderBy: {
          timestamp: 'desc'
        }
      })

      if (audits.length === 0) {
        console.log('No audit data available for weekly summary')
        return false
      }

      const currentAudit = audits[0]
      const previousAudit = audits[audits.length - 1] || currentAudit

      // Get issues fixed in the last week
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const fixedIssues = await db.log.count({
        where: {
          userId,
          type: 'auto_fix',
          createdAt: {
            gte: oneWeekAgo
          }
        }
      })

      const summary: WeeklyHealthSummary = {
        userId,
        shopDomain: this.shopDomain,
        currentScore: currentAudit.score,
        previousScore: previousAudit.score,
        scoreChange: currentAudit.score - previousAudit.score,
        totalProducts: currentAudit.totalProducts,
        issuesFound: Array.isArray(currentAudit.gaps) ? currentAudit.gaps.length : 0,
        issuesFixed: fixedIssues,
        trendData: audits.slice(0, 7).map(audit => ({
          date: audit.timestamp.toISOString().split('T')[0],
          score: audit.score
        }))
      }

      return await emailService.sendWeeklyHealthSummary(summary)
    } catch (error) {
      console.error('Failed to send weekly health summary:', error)
      return false
    }
  }

  async sendHealthAlert(userId: string, alertType: 'critical' | 'warning', message: string): Promise<boolean> {
    return await emailService.sendHealthAlert(userId, this.shopDomain, alertType, message)
  }
}
