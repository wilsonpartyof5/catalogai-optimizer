import { db } from "./db"

export interface PerformanceMetrics {
  userId: string
  shopDomain: string
  timestamp: Date
  healthScore: number
  totalProducts: number
  validProducts: number
  issuesFound: number
  issuesFixed: number
  aiUsage: number
  syncCount: number
  enrichmentCount: number
}

export interface DeltaMetrics {
  scoreDelta: number
  productsDelta: number
  issuesDelta: number
  aiUsageDelta: number
  syncDelta: number
  enrichmentDelta: number
  timePeriod: 'hour' | 'day' | 'week' | 'month'
}

export interface ROIMetrics {
  userId: string
  shopDomain: string
  timePeriod: string
  healthScoreImprovement: number
  productsProcessed: number
  aiTokensUsed: number
  estimatedValueAdded: number
  costPerImprovement: number
  roi: number
}

export class AnalyticsService {
  private static instance: AnalyticsService

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  async trackPerformanceMetrics(metrics: PerformanceMetrics): Promise<void> {
    try {
      // Store performance metrics in database
      await db.log.create({
        data: {
          userId: metrics.userId,
          type: 'performance_metrics',
          message: `Performance tracked: ${metrics.healthScore}% health, ${metrics.totalProducts} products, ${metrics.issuesFound} issues`,
          metadata: {
            healthScore: metrics.healthScore,
            totalProducts: metrics.totalProducts,
            validProducts: metrics.validProducts,
            issuesFound: metrics.issuesFound,
            issuesFixed: metrics.issuesFixed,
            aiUsage: metrics.aiUsage,
            syncCount: metrics.syncCount,
            enrichmentCount: metrics.enrichmentCount,
            timestamp: metrics.timestamp
          }
        }
      })

      // Calculate and store delta metrics
      const deltaMetrics = await this.calculateDeltaMetrics(metrics.userId, metrics.timestamp)
      if (deltaMetrics) {
        await this.storeDeltaMetrics(metrics.userId, deltaMetrics)
      }

      // Calculate ROI metrics
      const roiMetrics = await this.calculateROIMetrics(metrics.userId, metrics.shopDomain)
      if (roiMetrics) {
        await this.storeROIMetrics(roiMetrics)
      }

    } catch (error) {
      console.error('Failed to track performance metrics:', error)
    }
  }

  private async calculateDeltaMetrics(userId: string, currentTimestamp: Date): Promise<DeltaMetrics | null> {
    try {
      // Get previous metrics from different time periods
      const hourAgo = new Date(currentTimestamp.getTime() - 60 * 60 * 1000)
      const dayAgo = new Date(currentTimestamp.getTime() - 24 * 60 * 60 * 1000)
      const weekAgo = new Date(currentTimestamp.getTime() - 7 * 24 * 60 * 60 * 1000)

      // Get current metrics
      const currentMetrics = await this.getLatestMetrics(userId)
      if (!currentMetrics) return null

      // Get previous metrics
      const previousMetrics = await this.getPreviousMetrics(userId, dayAgo)
      if (!previousMetrics) return null

      // Calculate deltas
      const scoreDelta = currentMetrics.healthScore - previousMetrics.healthScore
      const productsDelta = currentMetrics.totalProducts - previousMetrics.totalProducts
      const issuesDelta = currentMetrics.issuesFound - previousMetrics.issuesFound
      const aiUsageDelta = currentMetrics.aiUsage - previousMetrics.aiUsage
      const syncDelta = currentMetrics.syncCount - previousMetrics.syncCount
      const enrichmentDelta = currentMetrics.enrichmentCount - previousMetrics.enrichmentCount

      return {
        scoreDelta,
        productsDelta,
        issuesDelta,
        aiUsageDelta,
        syncDelta,
        enrichmentDelta,
        timePeriod: 'day'
      }
    } catch (error) {
      console.error('Failed to calculate delta metrics:', error)
      return null
    }
  }

  private async getLatestMetrics(userId: string): Promise<PerformanceMetrics | null> {
    try {
      const latestAudit = await db.audit.findFirst({
        where: { userId },
        orderBy: { timestamp: 'desc' }
      })

      const user = await db.user.findUnique({
        where: { id: userId }
      })

      if (!latestAudit || !user) return null

      // Get recent activity counts
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

      const syncCount = await db.log.count({
        where: {
          userId,
          type: 'sync',
          createdAt: { gte: oneDayAgo }
        }
      })

      const enrichmentCount = await db.log.count({
        where: {
          userId,
          type: 'ai_enrichment',
          createdAt: { gte: oneDayAgo }
        }
      })

      return {
        userId,
        shopDomain: user.shopDomain,
        timestamp: latestAudit.timestamp,
        healthScore: latestAudit.score,
        totalProducts: latestAudit.totalProducts,
        validProducts: latestAudit.validProducts,
        issuesFound: Array.isArray(latestAudit.gaps) ? latestAudit.gaps.length : 0,
        issuesFixed: 0, // Will be calculated separately
        aiUsage: user.aiUsage,
        syncCount,
        enrichmentCount
      }
    } catch (error) {
      console.error('Failed to get latest metrics:', error)
      return null
    }
  }

  private async getPreviousMetrics(userId: string, fromDate: Date): Promise<PerformanceMetrics | null> {
    try {
      const audit = await db.audit.findFirst({
        where: {
          userId,
          timestamp: { gte: fromDate }
        },
        orderBy: { timestamp: 'asc' }
      })

      const user = await db.user.findUnique({
        where: { id: userId }
      })

      if (!audit || !user) return null

      return {
        userId,
        shopDomain: user.shopDomain,
        timestamp: audit.timestamp,
        healthScore: audit.score,
        totalProducts: audit.totalProducts,
        validProducts: audit.validProducts,
        issuesFound: Array.isArray(audit.gaps) ? audit.gaps.length : 0,
        issuesFixed: 0,
        aiUsage: user.aiUsage,
        syncCount: 0,
        enrichmentCount: 0
      }
    } catch (error) {
      console.error('Failed to get previous metrics:', error)
      return null
    }
  }

  private async storeDeltaMetrics(userId: string, deltaMetrics: DeltaMetrics): Promise<void> {
    try {
      await db.log.create({
        data: {
          userId,
          type: 'delta_metrics',
          message: `Delta metrics: ${deltaMetrics.scoreDelta >= 0 ? '+' : ''}${deltaMetrics.scoreDelta.toFixed(1)}% score, ${deltaMetrics.productsDelta >= 0 ? '+' : ''}${deltaMetrics.productsDelta} products`,
          metadata: {
            scoreDelta: deltaMetrics.scoreDelta,
            productsDelta: deltaMetrics.productsDelta,
            issuesDelta: deltaMetrics.issuesDelta,
            aiUsageDelta: deltaMetrics.aiUsageDelta,
            syncDelta: deltaMetrics.syncCount,
            enrichmentDelta: deltaMetrics.enrichmentDelta,
            timePeriod: deltaMetrics.timePeriod
          }
        }
      })
    } catch (error) {
      console.error('Failed to store delta metrics:', error)
    }
  }

  private async calculateROIMetrics(userId: string, shopDomain: string): Promise<ROIMetrics | null> {
    try {
      // Get metrics from the last week
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

      const audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: { gte: oneWeekAgo }
        },
        orderBy: { timestamp: 'asc' }
      })

      if (audits.length < 2) return null

      const firstAudit = audits[0]
      const lastAudit = audits[audits.length - 1]

      // Get AI usage and activity counts
      const user = await db.user.findUnique({
        where: { id: userId }
      })

      if (!user) return null

      const aiTokensUsed = user.aiUsage
      const healthScoreImprovement = lastAudit.score - firstAudit.score
      const productsProcessed = lastAudit.totalProducts

      // Calculate estimated value added (simplified formula)
      const estimatedValueAdded = healthScoreImprovement * productsProcessed * 0.1 // $0.10 per product per 1% improvement

      // Calculate cost per improvement (AI tokens cost)
      const tokenCost = aiTokensUsed * 0.0001 // $0.0001 per token (approximate)
      const costPerImprovement = tokenCost / Math.max(healthScoreImprovement, 1)

      // Calculate ROI
      const roi = estimatedValueAdded / Math.max(tokenCost, 1)

      return {
        userId,
        shopDomain,
        timePeriod: 'week',
        healthScoreImprovement,
        productsProcessed,
        aiTokensUsed,
        estimatedValueAdded,
        costPerImprovement,
        roi
      }
    } catch (error) {
      console.error('Failed to calculate ROI metrics:', error)
      return null
    }
  }

  private async storeROIMetrics(roiMetrics: ROIMetrics): Promise<void> {
    try {
      await db.log.create({
        data: {
          userId: roiMetrics.userId,
          type: 'roi_metrics',
          message: `ROI: ${roiMetrics.roi.toFixed(2)}x return, $${roiMetrics.estimatedValueAdded.toFixed(2)} value added`,
          metadata: {
            healthScoreImprovement: roiMetrics.healthScoreImprovement,
            productsProcessed: roiMetrics.productsProcessed,
            aiTokensUsed: roiMetrics.aiTokensUsed,
            estimatedValueAdded: roiMetrics.estimatedValueAdded,
            costPerImprovement: roiMetrics.costPerImprovement,
            roi: roiMetrics.roi,
            timePeriod: roiMetrics.timePeriod
          }
        }
      })
    } catch (error) {
      console.error('Failed to store ROI metrics:', error)
    }
  }

  async getPerformanceTrends(userId: string, days: number = 30): Promise<Array<{
    date: string
    healthScore: number
    totalProducts: number
    issuesFound: number
    aiUsage: number
  }>> {
    try {
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

      const audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: { gte: startDate }
        },
        orderBy: { timestamp: 'asc' }
      })

      const user = await db.user.findUnique({
        where: { id: userId }
      })

      return audits.map(audit => ({
        date: audit.timestamp.toISOString().split('T')[0],
        healthScore: audit.score,
        totalProducts: audit.totalProducts,
        issuesFound: Array.isArray(audit.gaps) ? audit.gaps.length : 0,
        aiUsage: user?.aiUsage || 0
      }))
    } catch (error) {
      console.error('Failed to get performance trends:', error)
      return []
    }
  }

  async getROISummary(userId: string): Promise<{
    totalROI: number
    totalValueAdded: number
    totalCost: number
    averageROI: number
  } | null> {
    try {
      const roiLogs = await db.log.findMany({
        where: {
          userId,
          type: 'roi_metrics'
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      })

      if (roiLogs.length === 0) return null

      let totalValueAdded = 0
      let totalCost = 0
      let totalROI = 0

      for (const log of roiLogs) {
        const metadata = log.metadata as any
        if (metadata) {
          totalValueAdded += metadata.estimatedValueAdded || 0
          totalCost += (metadata.aiTokensUsed || 0) * 0.0001
          totalROI += metadata.roi || 0
        }
      }

      return {
        totalROI,
        totalValueAdded,
        totalCost,
        averageROI: totalROI / roiLogs.length
      }
    } catch (error) {
      console.error('Failed to get ROI summary:', error)
      return null
    }
  }
}

// Export singleton instance
export const analyticsService = AnalyticsService.getInstance()
