/**
 * BullMQ Queue Configuration for Health Checks and Background Jobs
 */

import { Queue, Worker, QueueEvents } from 'bullmq'
import { Redis } from 'ioredis'
import { db } from './db'

// Redis connection configuration
let redis: Redis | null = null

try {
  if (process.env.REDIS_HOST && process.env.REDIS_PASSWORD) {
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: null, // Required by BullMQ for blocking operations
      retryDelayOnFailover: 100,
    })
  }
} catch (error) {
  console.error('Failed to initialize Redis connection:', error)
}

// Health check queue (only if Redis is available)
export const healthCheckQueue = redis ? new Queue('health-checks', {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
}) : null

// Background jobs queue (only if Redis is available)
export const backgroundJobsQueue = redis ? new Queue('background-jobs', {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 10,
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
}) : null

// Queue events for monitoring (only if Redis is available)
export const queueEvents = redis ? new QueueEvents('health-checks', { connection: redis }) : null

// Health check worker (only if Redis is available)
export const healthCheckWorker = redis ? new Worker(
  'health-checks',
  async (job) => {
    const { type, data } = job.data
    
    switch (type) {
      case 'url-ping':
        return await performUrlPing(data)
      case 'inventory-validation':
        return await performInventoryValidation(data)
      case 'database-health':
        return await performDatabaseHealthCheck(data)
      case 'api-status':
        return await performApiStatusCheck(data)
      default:
        throw new Error(`Unknown health check type: ${type}`)
    }
  },
  {
    connection: redis,
    concurrency: 5,
  }
) : null

// Background jobs worker (only if Redis is available)
export const backgroundJobsWorker = redis ? new Worker(
  'background-jobs',
  async (job) => {
    const { type, data } = job.data
    
    switch (type) {
      case 'sync-products':
        return await performProductSync(data)
      case 'ai-enrichment':
        return await performAIEnrichment(data)
      case 'cleanup-logs':
        return await performLogCleanup(data)
      default:
        throw new Error(`Unknown background job type: ${type}`)
    }
  },
  {
    connection: redis,
    concurrency: 3,
  }
) : null

// Health check functions
async function performUrlPing(data: { url: string; timeout?: number }) {
  try {
    const response = await fetch(data.url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(data.timeout || 5000),
    })
    
    return {
      success: response.ok,
      status: response.status,
      responseTime: Date.now(),
      url: data.url,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      url: data.url,
    }
  }
}

async function performInventoryValidation(data: { shopId: string }) {
  try {
    // Check if user exists and has products
    const user = await db.user.findUnique({
      where: { shopId: data.shopId },
      include: {
        audits: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    })

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        shopId: data.shopId,
      }
    }

    const latestAudit = user.audits[0]
    const hasRecentSync = latestAudit && 
      (Date.now() - new Date(latestAudit.timestamp).getTime()) < 24 * 60 * 60 * 1000 // 24 hours

    return {
      success: true,
      hasRecentSync,
      totalProducts: latestAudit?.totalProducts || 0,
      lastSync: latestAudit?.timestamp || null,
      shopId: data.shopId,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Database error',
      shopId: data.shopId,
    }
  }
}

async function performDatabaseHealthCheck(data: { shopId?: string }) {
  try {
    // Test database connectivity
    await db.$queryRaw`SELECT 1`
    
    // Check if we can read user data
    const userCount = await db.user.count()
    
    return {
      success: true,
      userCount,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Database connection failed',
    }
  }
}

async function performApiStatusCheck(data: { shopId: string }) {
  try {
    // This would check Shopify API connectivity
    // For now, return a mock response
    return {
      success: true,
      shopId: data.shopId,
      apiVersion: '2025-10',
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'API check failed',
      shopId: data.shopId,
    }
  }
}

// Background job functions
async function performProductSync(data: { shopId: string; userId: string }) {
  try {
    // This would trigger actual product sync
    // For now, log the request
    await db.log.create({
      data: {
        userId: data.userId,
        type: 'sync',
        message: `Product sync initiated for shop ${data.shopId}`,
      },
    })

    return {
      success: true,
      shopId: data.shopId,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sync failed',
      shopId: data.shopId,
    }
  }
}

async function performAIEnrichment(data: { shopId: string; userId: string; productIds: string[] }) {
  try {
    // This would trigger AI enrichment
    await db.log.create({
      data: {
        userId: data.userId,
        type: 'ai_enrichment',
        message: `AI enrichment initiated for ${data.productIds.length} products`,
      },
    })

    return {
      success: true,
      shopId: data.shopId,
      productCount: data.productIds.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'AI enrichment failed',
      shopId: data.shopId,
    }
  }
}

async function performLogCleanup(data: { daysToKeep?: number }) {
  try {
    const daysToKeep = data.daysToKeep || 30
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

    const deletedCount = await db.log.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    })

    return {
      success: true,
      deletedCount: deletedCount.count,
      cutoffDate: cutoffDate.toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Log cleanup failed',
    }
  }
}

// Schedule recurring health checks
export async function scheduleHealthChecks() {
  if (!healthCheckQueue || !backgroundJobsQueue) {
    console.log('Health checks skipped - queues not available')
    return
  }

  try {
    // Database health check every 5 minutes
    await healthCheckQueue.add(
      'database-health',
      {},
      {
        repeat: { cron: '*/5 * * * *' },
        jobId: 'database-health-recurring',
      }
    )

    // URL ping every 2 minutes
    await healthCheckQueue.add(
      'url-ping',
      { url: process.env.SHOPIFY_APP_URL + '/health' },
      {
        repeat: { cron: '*/2 * * * *' },
        jobId: 'url-ping-recurring',
      }
    )

    // Log cleanup daily at 2 AM
    await backgroundJobsQueue.add(
      'cleanup-logs',
      { daysToKeep: 30 },
      {
        repeat: { cron: '0 2 * * *' },
        jobId: 'log-cleanup-recurring',
      }
    )
    
    console.log('Health checks scheduled successfully')
  } catch (error) {
    console.error('Failed to schedule health checks:', error)
  }
}

// Graceful shutdown
export async function shutdownQueues() {
  const promises = []
  
  if (healthCheckWorker) promises.push(healthCheckWorker.close())
  if (backgroundJobsWorker) promises.push(backgroundJobsWorker.close())
  if (queueEvents) promises.push(queueEvents.close())
  if (redis) promises.push(redis.disconnect())
  
  await Promise.all(promises)
}

// Error handling (only if workers exist)
if (healthCheckWorker) {
  healthCheckWorker.on('error', (error) => {
    console.error('Health check worker error:', error)
  })
}

if (backgroundJobsWorker) {
  backgroundJobsWorker.on('error', (error) => {
    console.error('Background jobs worker error:', error)
  })
}

if (queueEvents) {
  queueEvents.on('error', (error) => {
    console.error('Queue events error:', error)
  })
}
