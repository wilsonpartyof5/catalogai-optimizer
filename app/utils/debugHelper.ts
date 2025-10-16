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
