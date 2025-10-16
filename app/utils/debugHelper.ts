/**
 * Advanced debugging utilities for the CatalogAI Optimizer
 * Provides comprehensive logging and error analysis
 */

export interface DebugContext {
  requestId: string
  shop: string
  userId?: string
  sessionId?: string
  timestamp: Date
}

export interface ErrorAnalysis {
  errorType: string
  isAuthenticationError: boolean
  isGraphQLError: boolean
  isNetworkError: boolean
  isDatabaseError: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
  suggestedAction: string
  errorDetails: {
    message: string
    stack?: string
    statusCode?: number
    responseHeaders?: Record<string, string>
  }
}

export class DebugHelper {
  private static generateRequestId(): string {
    return Math.random().toString(36).substring(7)
  }

  // Enhanced debugging methods
  static logMemoryUsage(context: DebugContext) {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage()
      console.log(`🧠 [${context.requestId}] Memory usage:`)
      console.log(`🧠 [${context.requestId}] - RSS: ${Math.round(memUsage.rss / 1024 / 1024)}MB`)
      console.log(`🧠 [${context.requestId}] - Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`)
      console.log(`🧠 [${context.requestId}] - Heap Total: ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`)
      console.log(`🧠 [${context.requestId}] - External: ${Math.round(memUsage.external / 1024 / 1024)}MB`)
    }
  }

  static logDatabaseMetrics(context: DebugContext, queryCount: number, queryTime: number) {
    console.log(`🗄️ [${context.requestId}] Database metrics:`)
    console.log(`🗄️ [${context.requestId}] - Queries executed: ${queryCount}`)
    console.log(`🗄️ [${context.requestId}] - Total query time: ${queryTime}ms`)
    console.log(`🗄️ [${context.requestId}] - Average query time: ${queryCount > 0 ? Math.round(queryTime / queryCount) : 0}ms`)
  }

  static logAPIMetrics(context: DebugContext, apiCalls: number, totalTime: number, successRate: number) {
    console.log(`🌐 [${context.requestId}] API metrics:`)
    console.log(`🌐 [${context.requestId}] - API calls made: ${apiCalls}`)
    console.log(`🌐 [${context.requestId}] - Total API time: ${totalTime}ms`)
    console.log(`🌐 [${context.requestId}] - Success rate: ${Math.round(successRate * 100)}%`)
    console.log(`🌐 [${context.requestId}] - Average call time: ${apiCalls > 0 ? Math.round(totalTime / apiCalls) : 0}ms`)
  }

  static logCacheMetrics(context: DebugContext, cacheHits: number, cacheMisses: number, cacheSize: number) {
    const totalRequests = cacheHits + cacheMisses
    const hitRate = totalRequests > 0 ? cacheHits / totalRequests : 0
    
    console.log(`💾 [${context.requestId}] Cache metrics:`)
    console.log(`💾 [${context.requestId}] - Cache hits: ${cacheHits}`)
    console.log(`💾 [${context.requestId}] - Cache misses: ${cacheMisses}`)
    console.log(`💾 [${context.requestId}] - Hit rate: ${Math.round(hitRate * 100)}%`)
    console.log(`💾 [${context.requestId}] - Cache size: ${cacheSize} items`)
  }

  static logSecurityEvent(context: DebugContext, eventType: string, details: Record<string, any>) {
    console.log(`🔒 [${context.requestId}] Security event: ${eventType}`)
    console.log(`🔒 [${context.requestId}] - Shop: ${context.shop}`)
    console.log(`🔒 [${context.requestId}] - User ID: ${context.userId || 'N/A'}`)
    console.log(`🔒 [${context.requestId}] - Timestamp: ${context.timestamp.toISOString()}`)
    console.log(`🔒 [${context.requestId}] - Details:`, details)
  }

  static logRateLimit(context: DebugContext, endpoint: string, remaining: number, resetTime: number) {
    console.log(`⏰ [${context.requestId}] Rate limit status:`)
    console.log(`⏰ [${context.requestId}] - Endpoint: ${endpoint}`)
    console.log(`⏰ [${context.requestId}] - Remaining requests: ${remaining}`)
    console.log(`⏰ [${context.requestId}] - Reset time: ${new Date(resetTime * 1000).toISOString()}`)
  }

  static logDataQuality(context: DebugContext, totalProducts: number, validProducts: number, issues: Record<string, number>) {
    const qualityScore = totalProducts > 0 ? Math.round((validProducts / totalProducts) * 100) : 0
    
    console.log(`📊 [${context.requestId}] Data quality metrics:`)
    console.log(`📊 [${context.requestId}] - Total products: ${totalProducts}`)
    console.log(`📊 [${context.requestId}] - Valid products: ${validProducts}`)
    console.log(`📊 [${context.requestId}] - Quality score: ${qualityScore}%`)
    console.log(`📊 [${context.requestId}] - Issues found:`, issues)
  }

  static logPerformanceBottleneck(context: DebugContext, operation: string, duration: number, threshold: number = 1000) {
    if (duration > threshold) {
      console.log(`🐌 [${context.requestId}] Performance bottleneck detected:`)
      console.log(`🐌 [${context.requestId}] - Operation: ${operation}`)
      console.log(`🐌 [${context.requestId}] - Duration: ${duration}ms (threshold: ${threshold}ms)`)
      console.log(`🐌 [${context.requestId}] - Over threshold by: ${duration - threshold}ms`)
    }
  }

  static logHealthCheck(context: DebugContext, services: Record<string, { status: string; responseTime?: number; error?: string }>) {
    console.log(`🏥 [${context.requestId}] Health check results:`)
    Object.entries(services).forEach(([service, health]) => {
      const status = health.status === 'healthy' ? '✅' : '❌'
      console.log(`🏥 [${context.requestId}] - ${service}: ${status} ${health.status}`)
      if (health.responseTime) {
        console.log(`🏥 [${context.requestId}]   Response time: ${health.responseTime}ms`)
      }
      if (health.error) {
        console.log(`🏥 [${context.requestId}]   Error: ${health.error}`)
      }
    })
  }

  static createContext(shop: string, userId?: string, sessionId?: string): DebugContext {
    return {
      requestId: this.generateRequestId(),
      shop,
      userId,
      sessionId,
      timestamp: new Date(),
    }
  }

  static logRequestStart(context: DebugContext, url: string, headers?: Record<string, string>) {
    console.log(`🔍 [${context.requestId}] Starting request for shop: ${context.shop}`)
    console.log(`🔍 [${context.requestId}] URL: ${url}`)
    if (headers) {
      console.log(`🔍 [${context.requestId}] Headers:`, headers)
    }
  }

  static logSessionDetails(context: DebugContext, session: any) {
    console.log(`🔍 [${context.requestId}] Session details:`)
    console.log(`🔍 [${context.requestId}] - ID: ${session.id}`)
    console.log(`🔍 [${context.requestId}] - Shop: ${session.shop}`)
    console.log(`🔍 [${context.requestId}] - Scope: ${session.scope}`)
    console.log(`🔍 [${context.requestId}] - IsOnline: ${session.isOnline}`)
    console.log(`🔍 [${context.requestId}] - Expires: ${session.expires}`)
    console.log(`🔍 [${context.requestId}] - Access token length: ${session.accessToken?.length}`)
    console.log(`🔍 [${context.requestId}] - Access token prefix: ${session.accessToken?.substring(0, 15)}...`)
  }

  static logOfflineSessionDetails(context: DebugContext, offlineSession: any) {
    if (offlineSession) {
      console.log(`🔍 [${context.requestId}] Offline session details:`)
      console.log(`🔍 [${context.requestId}] - ID: ${offlineSession.id}`)
      console.log(`🔍 [${context.requestId}] - Shop: ${offlineSession.shop}`)
      console.log(`🔍 [${context.requestId}] - Scope: ${offlineSession.scope}`)
      console.log(`🔍 [${context.requestId}] - IsOnline: ${offlineSession.isOnline}`)
      console.log(`🔍 [${context.requestId}] - Expires: ${offlineSession.expires}`)
      console.log(`🔍 [${context.requestId}] - Access token length: ${offlineSession.accessToken?.length}`)
      console.log(`🔍 [${context.requestId}] - Access token prefix: ${offlineSession.accessToken?.substring(0, 15)}...`)
    } else {
      console.log(`❌ [${context.requestId}] Offline session not found`)
    }
  }

  static analyzeError(error: any): ErrorAnalysis {
    const errorType = error?.constructor?.name || 'UnknownError'
    const message = error instanceof Error ? error.message : String(error)
    
    const isAuthenticationError = message.includes('401') || message.includes('Unauthorized')
    const isGraphQLError = message.includes('GraphQL Error')
    const isNetworkError = message.includes('fetch') || message.includes('network') || message.includes('timeout')
    const isDatabaseError = message.includes('database') || message.includes('Prisma') || message.includes('connection')
    
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
    let suggestedAction = 'Check logs for more details'
    
    if (isAuthenticationError) {
      severity = 'high'
      suggestedAction = 'Clear invalid session and force re-authentication'
    } else if (isDatabaseError) {
      severity = 'critical'
      suggestedAction = 'Check database connection and configuration'
    } else if (isNetworkError) {
      severity = 'medium'
      suggestedAction = 'Check network connectivity and API endpoints'
    } else if (isGraphQLError) {
      severity = 'high'
      suggestedAction = 'Check GraphQL query and API permissions'
    }

    return {
      errorType,
      isAuthenticationError,
      isGraphQLError,
      isNetworkError,
      isDatabaseError,
      severity,
      suggestedAction,
      errorDetails: {
        message,
        stack: error instanceof Error ? error.stack : undefined,
        statusCode: error?.status || error?.response?.status,
        responseHeaders: error?.response?.headers ? Object.fromEntries(error.response.headers.entries()) : undefined,
      }
    }
  }

  static logError(context: DebugContext, error: any, additionalInfo?: Record<string, any>) {
    const analysis = this.analyzeError(error)
    
    console.log(`❌ [${context.requestId}] Error occurred:`)
    console.log(`❌ [${context.requestId}] - Type: ${analysis.errorType}`)
    console.log(`❌ [${context.requestId}] - Message: ${analysis.errorDetails.message}`)
    console.log(`❌ [${context.requestId}] - Severity: ${analysis.severity}`)
    console.log(`❌ [${context.requestId}] - Suggested action: ${analysis.suggestedAction}`)
    
    if (analysis.errorDetails.stack) {
      console.log(`❌ [${context.requestId}] - Stack trace:`, analysis.errorDetails.stack)
    }
    
    if (additionalInfo) {
      console.log(`❌ [${context.requestId}] - Additional info:`, additionalInfo)
    }
    
    return analysis
  }

  static logPerformance(context: DebugContext, startTime: number, operation: string, details?: Record<string, any>) {
    const duration = Date.now() - startTime
    console.log(`⏱️ [${context.requestId}] ${operation} completed in ${duration}ms`)
    
    if (details) {
      console.log(`📊 [${context.requestId}] ${operation} details:`, details)
    }
  }

  static logSuccess(context: DebugContext, operation: string, details?: Record<string, any>) {
    console.log(`✅ [${context.requestId}] ${operation} completed successfully`)
    
    if (details) {
      console.log(`📊 [${context.requestId}] ${operation} results:`, details)
    }
  }

  static logWarning(context: DebugContext, message: string, details?: Record<string, any>) {
    console.log(`⚠️ [${context.requestId}] ${message}`)
    
    if (details) {
      console.log(`⚠️ [${context.requestId}] Warning details:`, details)
    }
  }

  static logInfo(context: DebugContext, message: string, details?: Record<string, any>) {
    console.log(`ℹ️ [${context.requestId}] ${message}`)
    
    if (details) {
      console.log(`ℹ️ [${context.requestId}] Info details:`, details)
    }
  }
}

/**
 * Utility function to create a debug context for any request
 */
export function createDebugContext(shop: string, userId?: string, sessionId?: string): DebugContext {
  return DebugHelper.createContext(shop, userId, sessionId)
}

/**
 * Utility function to analyze and log errors with context
 */
export function logErrorWithContext(context: DebugContext, error: any, additionalInfo?: Record<string, any>) {
  return DebugHelper.logError(context, error, additionalInfo)
}

/**
 * Utility function to log performance metrics
 */
export function logPerformance(context: DebugContext, startTime: number, operation: string, details?: Record<string, any>) {
  return DebugHelper.logPerformance(context, startTime, operation, details)
}

/**
 * Enhanced debugging utilities for production monitoring
 */
export class ProductionDebugger {
  static logSystemHealth(context: DebugContext) {
    // Memory usage
    DebugHelper.logMemoryUsage(context)
    
    // System uptime
    if (typeof process !== 'undefined' && process.uptime) {
      const uptime = Math.round(process.uptime())
      const hours = Math.floor(uptime / 3600)
      const minutes = Math.floor((uptime % 3600) / 60)
      const seconds = uptime % 60
      console.log(`⏰ [${context.requestId}] System uptime: ${hours}h ${minutes}m ${seconds}s`)
    }
    
    // Node.js version
    if (typeof process !== 'undefined' && process.version) {
      console.log(`🟢 [${context.requestId}] Node.js version: ${process.version}`)
    }
  }

  static logRequestMetrics(context: DebugContext, requestSize: number, responseSize: number, processingTime: number) {
    console.log(`📈 [${context.requestId}] Request metrics:`)
    console.log(`📈 [${context.requestId}] - Request size: ${requestSize} bytes`)
    console.log(`📈 [${context.requestId}] - Response size: ${responseSize} bytes`)
    console.log(`📈 [${context.requestId}] - Processing time: ${processingTime}ms`)
    console.log(`📈 [${context.requestId}] - Throughput: ${Math.round(responseSize / (processingTime / 1000))} bytes/sec`)
  }

  static logErrorPatterns(context: DebugContext, errorHistory: Array<{ error: string; count: number; lastOccurred: Date }>) {
    if (errorHistory.length > 0) {
      console.log(`🔍 [${context.requestId}] Error patterns detected:`)
      errorHistory.forEach((pattern, index) => {
        console.log(`🔍 [${context.requestId}] - Pattern ${index + 1}: ${pattern.error} (${pattern.count} occurrences, last: ${pattern.lastOccurred.toISOString()})`)
      })
    }
  }

  static logPerformanceTrends(context: DebugContext, operation: string, recentTimes: number[], averageTime: number) {
    const trend = recentTimes.length > 1 ? 
      (recentTimes[recentTimes.length - 1] > recentTimes[recentTimes.length - 2] ? 'increasing' : 'decreasing') : 
      'stable'
    
    console.log(`📊 [${context.requestId}] Performance trend for ${operation}:`)
    console.log(`📊 [${context.requestId}] - Recent times: ${recentTimes.join(', ')}ms`)
    console.log(`📊 [${context.requestId}] - Average time: ${averageTime}ms`)
    console.log(`📊 [${context.requestId}] - Trend: ${trend}`)
  }
}

/**
 * Real-time monitoring utilities
 */
export class RealTimeMonitor {
  private static metrics: Map<string, any> = new Map()

  static recordMetric(key: string, value: any, timestamp: Date = new Date()) {
    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }
    this.metrics.get(key).push({ value, timestamp })
    
    // Keep only last 100 entries per metric
    const entries = this.metrics.get(key)
    if (entries.length > 100) {
      entries.splice(0, entries.length - 100)
    }
  }

  static getMetricTrend(key: string, timeWindow: number = 300000) { // 5 minutes default
    const entries = this.metrics.get(key) || []
    const cutoff = new Date(Date.now() - timeWindow)
    const recentEntries = entries.filter((entry: any) => entry.timestamp > cutoff)
    
    if (recentEntries.length < 2) return 'insufficient_data'
    
    const first = recentEntries[0].value
    const last = recentEntries[recentEntries.length - 1].value
    
    if (last > first * 1.1) return 'increasing'
    if (last < first * 0.9) return 'decreasing'
    return 'stable'
  }

  static getMetricAverage(key: string, timeWindow: number = 300000) {
    const entries = this.metrics.get(key) || []
    const cutoff = new Date(Date.now() - timeWindow)
    const recentEntries = entries.filter((entry: any) => entry.timestamp > cutoff)
    
    if (recentEntries.length === 0) return 0
    
    const sum = recentEntries.reduce((acc: number, entry: any) => acc + entry.value, 0)
    return sum / recentEntries.length
  }
}
