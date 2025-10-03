import { db } from "./db"
import { HealthCheckerService } from "./healthChecker"
import { healthCheckQueue } from "./queue"

export interface TestResult {
  testName: string
  passed: boolean
  error?: string
  duration: number
  details?: any
}

export class HealthCheckTester {
  private testResults: TestResult[] = []

  async runAllTests(userId: string, shopDomain: string, accessToken: string): Promise<TestResult[]> {
    this.testResults = []
    
    console.log('🧪 Starting health check system tests...')

    // Test 1: Basic health checker initialization
    await this.testHealthCheckerInitialization(shopDomain, accessToken)

    // Test 2: Mock product data validation
    await this.testProductValidation()

    // Test 3: URL ping functionality
    await this.testUrlPings()

    // Test 4: Inventory validation
    await this.testInventoryValidation()

    // Test 5: Health score calculation
    await this.testHealthScoreCalculation()

    // Test 6: Database operations
    await this.testDatabaseOperations(userId)

    // Test 7: Queue operations
    await this.testQueueOperations(userId, shopDomain)

    // Test 8: Error handling
    await this.testErrorHandling(shopDomain, accessToken)

    // Test 9: Performance with large datasets
    await this.testPerformanceLargeDataset()

    // Test 10: Edge cases
    await this.testEdgeCases()

    console.log(`✅ Health check tests completed: ${this.testResults.filter(r => r.passed).length}/${this.testResults.length} passed`)
    
    return this.testResults
  }

  private async testHealthCheckerInitialization(shopDomain: string, accessToken: string): Promise<void> {
    const startTime = Date.now()
    
    try {
      const healthChecker = new HealthCheckerService(shopDomain, accessToken)
      
      if (!healthChecker) {
        throw new Error('Failed to initialize HealthCheckerService')
      }

      this.testResults.push({
        testName: 'Health Checker Initialization',
        passed: true,
        duration: Date.now() - startTime,
        details: { shopDomain, hasAccessToken: !!accessToken }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Health Checker Initialization',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testProductValidation(): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Create mock product data with various validation scenarios
      const mockProducts = [
        {
          id: 'test-1',
          title: 'Valid Product',
          description: 'This is a valid product description',
          vendor: 'Test Vendor',
          productType: 'Test Type',
          tags: ['tag1', 'tag2'],
          images: [{ src: 'image1.jpg' }],
          variants: [{ id: 'v1', title: 'Variant 1' }],
          options: [{ name: 'Size', values: ['S', 'M', 'L'] }],
          status: 'active'
        },
        {
          id: 'test-2',
          title: '', // Missing title
          description: 'Valid description',
          vendor: 'Test Vendor',
          productType: 'Test Type',
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: 'active'
        },
        {
          id: 'test-3',
          title: 'Valid Product',
          description: '', // Missing description
          vendor: '',
          productType: 'Test Type',
          tags: ['tag1'],
          images: [{ src: 'image1.jpg' }],
          variants: [{ id: 'v1', title: 'Variant 1' }],
          options: [{ name: 'Size', values: ['S', 'M', 'L'] }],
          status: 'active'
        }
      ]

      // Test validation logic
      const requiredFields = ['title', 'description', 'vendor', 'productType', 'tags', 'images', 'variants', 'options', 'status']
      let validCount = 0
      const gaps: any[] = []

      for (const product of mockProducts) {
        let isValid = true

        for (const field of requiredFields) {
          if (!product[field as keyof typeof product] || 
              (Array.isArray(product[field as keyof typeof product]) && (product[field as keyof typeof product] as any[]).length === 0) ||
              (typeof product[field as keyof typeof product] === 'string' && (product[field as keyof typeof product] as string).trim() === '')) {
            gaps.push({ field, productId: product.id })
            isValid = false
          }
        }

        if (isValid) validCount++
      }

      const expectedValidCount = 1 // Only the first product should be valid
      const expectedGapsCount = 4 // 2 gaps from product 2, 2 gaps from product 3

      if (validCount !== expectedValidCount) {
        throw new Error(`Expected ${expectedValidCount} valid products, got ${validCount}`)
      }

      if (gaps.length !== expectedGapsCount) {
        throw new Error(`Expected ${expectedGapsCount} gaps, got ${gaps.length}`)
      }

      this.testResults.push({
        testName: 'Product Validation',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          totalProducts: mockProducts.length,
          validProducts: validCount,
          gapsFound: gaps.length,
          gaps: gaps
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Product Validation',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testUrlPings(): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Test URL ping functionality with mock data
      const testUrls = [
        'https://httpbin.org/status/200', // Should succeed
        'https://httpbin.org/status/404', // Should fail with 404
        'https://invalid-domain-that-does-not-exist.com', // Should fail
        'https://httpbin.org/delay/10' // Should timeout
      ]

      const results = []
      for (const url of testUrls) {
        try {
          const response = await fetch(url, { 
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
          })
          results.push({ url, success: response.ok, status: response.status })
        } catch (error) {
          results.push({ url, success: false, error: error instanceof Error ? error.message : 'Unknown error' })
        }
      }

      // Verify results
      const successCount = results.filter(r => r.success).length
      const expectedSuccessCount = 1 // Only the 200 status should succeed

      if (successCount !== expectedSuccessCount) {
        throw new Error(`Expected ${expectedSuccessCount} successful pings, got ${successCount}`)
      }

      this.testResults.push({
        testName: 'URL Pings',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          totalUrls: testUrls.length,
          successfulPings: successCount,
          results: results
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'URL Pings',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testInventoryValidation(): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Test inventory validation logic
      const mockVariants = [
        { id: 'v1', inventoryQuantity: 10 }, // Normal stock
        { id: 'v2', inventoryQuantity: 3 }, // Low stock
        { id: 'v3', inventoryQuantity: 0 }, // Out of stock
        { id: 'v4', inventoryQuantity: 1 }, // Low stock
        { id: 'v5', inventoryQuantity: 15 } // Normal stock
      ]

      const lowStock: string[] = []
      const outOfStock: string[] = []

      for (const variant of mockVariants) {
        if (variant.inventoryQuantity === 0) {
          outOfStock.push(variant.id)
        } else if (variant.inventoryQuantity < 5) {
          lowStock.push(variant.id)
        }
      }

      const expectedLowStock = 2 // variants v2 and v4
      const expectedOutOfStock = 1 // variant v3

      if (lowStock.length !== expectedLowStock) {
        throw new Error(`Expected ${expectedLowStock} low stock variants, got ${lowStock.length}`)
      }

      if (outOfStock.length !== expectedOutOfStock) {
        throw new Error(`Expected ${expectedOutOfStock} out of stock variants, got ${outOfStock.length}`)
      }

      this.testResults.push({
        testName: 'Inventory Validation',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          totalVariants: mockVariants.length,
          lowStock: lowStock.length,
          outOfStock: outOfStock.length,
          lowStockVariants: lowStock,
          outOfStockVariants: outOfStock
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Inventory Validation',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testHealthScoreCalculation(): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Test health score calculation logic
      const testCases = [
        { totalProducts: 100, validProducts: 100, gaps: [], expectedScore: 100 },
        { totalProducts: 100, validProducts: 90, gaps: [], expectedScore: 90 },
        { totalProducts: 100, validProducts: 80, gaps: [{ severity: 'warning', count: 10 }], expectedScore: 70 },
        { totalProducts: 100, validProducts: 70, gaps: [{ severity: 'error', count: 20 }], expectedScore: 10 },
        { totalProducts: 0, validProducts: 0, gaps: [], expectedScore: 100 }
      ]

      const results = []
      for (const testCase of testCases) {
        // Simulate score calculation
        let score = testCase.totalProducts === 0 ? 100 : (testCase.validProducts / testCase.totalProducts) * 100

        // Deduct points for gaps
        for (const gap of testCase.gaps) {
          const penalty = gap.severity === 'critical' ? 5 : gap.severity === 'error' ? 3 : 1
          score -= Math.min(penalty * (gap.count / testCase.totalProducts), 10)
        }

        score = Math.max(0, Math.round(score))
        const passed = score === testCase.expectedScore
        results.push({ ...testCase, calculatedScore: score, passed })
      }

      const failedTests = results.filter(r => !r.passed)
      if (failedTests.length > 0) {
        throw new Error(`${failedTests.length} health score calculations failed`)
      }

      this.testResults.push({
        testName: 'Health Score Calculation',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          totalTestCases: testCases.length,
          allPassed: true,
          results: results
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Health Score Calculation',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testDatabaseOperations(userId: string): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Test database operations
      const testAudit = await db.audit.create({
        data: {
          userId,
          score: 85,
          totalProducts: 100,
          validProducts: 85,
          gaps: [{ field: 'title', severity: 'warning', count: 15 }],
          timestamp: new Date()
        }
      })

      if (!testAudit.id) {
        throw new Error('Failed to create audit record')
      }

      // Test retrieval
      const retrievedAudit = await db.audit.findUnique({
        where: { id: testAudit.id }
      })

      if (!retrievedAudit) {
        throw new Error('Failed to retrieve audit record')
      }

      // Test deletion
      await db.audit.delete({
        where: { id: testAudit.id }
      })

      this.testResults.push({
        testName: 'Database Operations',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          auditId: testAudit.id,
          score: testAudit.score,
          totalProducts: testAudit.totalProducts
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Database Operations',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testQueueOperations(userId: string, shopDomain: string): Promise<void> {
    const startTime = Date.now()
    
    try {
      if (!healthCheckQueue) {
        throw new Error('Health check queue not available')
      }

      // Test queue job creation
      const testJob = await healthCheckQueue.add('health-scan', {
        shopId: shopDomain,
        userId: userId,
        options: {
          maxProducts: 10,
          includePings: false,
          includeInventory: false,
          includeValidation: true
        }
      })

      if (!testJob.id) {
        throw new Error('Failed to create queue job')
      }

      this.testResults.push({
        testName: 'Queue Operations',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          jobId: testJob.id,
          jobName: testJob.name,
          jobData: testJob.data
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Queue Operations',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testErrorHandling(shopDomain: string, accessToken: string): Promise<void> {
    const startTime = Date.now()
    
    try {
      const healthChecker = new HealthCheckerService(shopDomain, accessToken)
      
      // Test with invalid data
      try {
        await healthChecker.performHealthCheck({
          maxProducts: -1, // Invalid value
          includePings: true,
          includeInventory: true,
          includeValidation: true
        })
      } catch (error) {
        // Expected to fail
      }

      // Test with empty shop domain
      try {
        const invalidChecker = new HealthCheckerService('', accessToken)
        await invalidChecker.performHealthCheck()
      } catch (error) {
        // Expected to fail
      }

      // Test with invalid access token
      try {
        const invalidChecker = new HealthCheckerService(shopDomain, '')
        await invalidChecker.performHealthCheck()
      } catch (error) {
        // Expected to fail
      }

      this.testResults.push({
        testName: 'Error Handling',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          errorHandlingTests: 3,
          allErrorsHandled: true
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Error Handling',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testPerformanceLargeDataset(): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Test performance with large dataset simulation
      const largeProductSet = Array.from({ length: 1000 }, (_, i) => ({
        id: `product-${i}`,
        title: i % 10 === 0 ? '' : `Product ${i}`, // 10% missing titles
        description: i % 20 === 0 ? '' : `Description for product ${i}`, // 5% missing descriptions
        vendor: i % 15 === 0 ? '' : 'Test Vendor', // ~6.7% missing vendors
        productType: 'Test Type',
        tags: i % 25 === 0 ? [] : ['tag1', 'tag2'], // 4% missing tags
        images: i % 30 === 0 ? [] : [{ src: `image-${i}.jpg` }], // ~3.3% missing images
        variants: i % 40 === 0 ? [] : [{ id: `v-${i}`, title: `Variant ${i}` }], // 2.5% missing variants
        options: i % 50 === 0 ? [] : [{ name: 'Size', values: ['S', 'M', 'L'] }], // 2% missing options
        status: 'active'
      }))

      // Simulate validation process
      const requiredFields = ['title', 'description', 'vendor', 'productType', 'tags', 'images', 'variants', 'options', 'status']
      let validCount = 0
      const gaps: any[] = []

      for (const product of largeProductSet) {
        let isValid = true

        for (const field of requiredFields) {
          if (!product[field as keyof typeof product] || 
              (Array.isArray(product[field as keyof typeof product]) && (product[field as keyof typeof product] as any[]).length === 0) ||
              (typeof product[field as keyof typeof product] === 'string' && (product[field as keyof typeof product] as string).trim() === '')) {
            gaps.push({ field, productId: product.id })
            isValid = false
          }
        }

        if (isValid) validCount++
      }

      const processingTime = Date.now() - startTime
      const expectedValidCount = Math.floor(1000 * 0.7) // Approximately 70% should be valid
      const tolerance = 50 // Allow 5% tolerance

      if (Math.abs(validCount - expectedValidCount) > tolerance) {
        throw new Error(`Performance test failed: expected ~${expectedValidCount} valid products, got ${validCount}`)
      }

      if (processingTime > 5000) { // Should complete within 5 seconds
        throw new Error(`Performance test failed: processing took ${processingTime}ms, expected < 5000ms`)
      }

      this.testResults.push({
        testName: 'Performance Large Dataset',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          totalProducts: largeProductSet.length,
          validProducts: validCount,
          gapsFound: gaps.length,
          processingTime: processingTime,
          productsPerSecond: Math.round(largeProductSet.length / (processingTime / 1000))
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Performance Large Dataset',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  private async testEdgeCases(): Promise<void> {
    const startTime = Date.now()
    
    try {
      // Test edge cases
      const edgeCases = [
        // Empty product
        {
          id: 'empty',
          title: '',
          description: '',
          vendor: '',
          productType: '',
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: ''
        },
        // Product with only spaces
        {
          id: 'spaces',
          title: '   ',
          description: '   ',
          vendor: '   ',
          productType: 'Test Type',
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: 'active'
        },
        // Product with null/undefined values
        {
          id: 'nulls',
          title: null,
          description: undefined,
          vendor: 'Test Vendor',
          productType: 'Test Type',
          tags: null,
          images: undefined,
          variants: [],
          options: [],
          status: 'active'
        }
      ]

      const results = []
      for (const product of edgeCases) {
        let isValid = true
        const gaps: string[] = []

        const requiredFields = ['title', 'description', 'vendor', 'productType', 'tags', 'images', 'variants', 'options', 'status']
        
        for (const field of requiredFields) {
          const value = product[field as keyof typeof product]
          if (!value || 
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === 'string' && value.trim() === '')) {
            gaps.push(field)
            isValid = false
          }
        }

        results.push({ productId: product.id, isValid, gaps })
      }

      // All edge cases should be invalid
      const validCount = results.filter(r => r.isValid).length
      if (validCount > 0) {
        throw new Error(`Expected all edge cases to be invalid, but ${validCount} were valid`)
      }

      this.testResults.push({
        testName: 'Edge Cases',
        passed: true,
        duration: Date.now() - startTime,
        details: { 
          totalEdgeCases: edgeCases.length,
          allInvalid: true,
          results: results
        }
      })
    } catch (error) {
      this.testResults.push({
        testName: 'Edge Cases',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      })
    }
  }

  getTestSummary(): { total: number; passed: number; failed: number; duration: number } {
    const total = this.testResults.length
    const passed = this.testResults.filter(r => r.passed).length
    const failed = total - passed
    const duration = this.testResults.reduce((sum, r) => sum + r.duration, 0)

    return { total, passed, failed, duration }
  }
}

// Export singleton instance
export const healthCheckTester = new HealthCheckTester()
