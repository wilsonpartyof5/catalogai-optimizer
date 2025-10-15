import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { healthCheckQueue, backgroundJobsQueue } from "~/utils/queue"
import { authenticate } from "~/shopify.server"
import { db } from "~/utils/db"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    console.log('Health check API called', {
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT,
      hasRedisPassword: !!process.env.REDIS_PASSWORD,
      healthCheckQueueExists: !!healthCheckQueue,
      timestamp: new Date().toISOString()
    })
    
    // Check if health check queue is available
    if (!healthCheckQueue) {
      console.error('Health check queue is null - Redis connection failed')
      return json({
        success: false,
        error: "Health check system not available - Redis connection failed",
      }, { status: 503 })
    }

    // Get user for manual health scan
    const user = await db.user.findUnique({
      where: { shopId: session.shop }
    })

    if (!user) {
      return json({
        success: false,
        error: "User not found",
      }, { status: 404 })
    }

    // Trigger comprehensive health scan
    const healthScanJob = await healthCheckQueue.add('health-scan', {
      shopId: session.shop,
      userId: user.id,
      options: {
        maxProducts: 100,
        includePings: true,
        includeInventory: true,
        includeValidation: true
      }
    })

    // Get latest audit for comparison
    const latestAudit = await db.audit.findFirst({
      where: { userId: user.id },
      orderBy: { timestamp: 'desc' }
    })

    return json({
      success: true,
      jobId: healthScanJob.id,
      currentScore: latestAudit?.score || 0,
      currentGaps: latestAudit?.gaps || [],
      message: "Health scan initiated",
    })
  } catch (error) {
    console.error('Health check API error:', error)
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to initiate health checks",
    }, { status: 500 })
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    const formData = await request.formData()
    const action = formData.get("action") as string

    if (action === "trigger-scan") {
      // Get user for manual health scan
      const user = await db.user.findUnique({
        where: { shopId: session.shop }
      })

      if (!user) {
        return json({
          success: false,
          error: "User not found",
        }, { status: 404 })
      }

      // Check if health check queue is available
      if (!healthCheckQueue) {
        console.error('Health check queue is null - Redis connection failed')
        return json({
          success: false,
          error: "Health check system not available - Redis connection failed",
        }, { status: 503 })
      }

      // Trigger comprehensive health scan
      const healthScanJob = await healthCheckQueue.add('health-scan', {
        shopId: session.shop,
        userId: user.id,
        options: {
          maxProducts: 100,
          includePings: true,
          includeInventory: true,
          includeValidation: true
        }
      })

      // Get latest audit for comparison
      const latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: 'desc' }
      })

      return json({
        success: true,
        jobId: healthScanJob.id,
        currentScore: latestAudit?.score || 0,
        currentGaps: latestAudit?.gaps || [],
        message: "Health scan initiated",
      })
    }

    if (action === "get-results") {
      const jobId = formData.get("jobId") as string
      
      if (!jobId) {
        return json({
          success: false,
          error: "Job ID is required",
        }, { status: 400 })
      }

      // Get user
      const user = await db.user.findUnique({
        where: { shopId: session.shop }
      })

      if (!user) {
        return json({
          success: false,
          error: "User not found",
        }, { status: 404 })
      }

      // Get latest audit results
      const latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: 'desc' }
      })

      // Get trends from last 7 days
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const trends = await db.audit.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: sevenDaysAgo
          }
        },
        orderBy: {
          timestamp: 'asc'
        }
      })

      return json({
        success: true,
        result: latestAudit ? {
          score: latestAudit.score,
          totalProducts: latestAudit.totalProducts,
          validProducts: latestAudit.validProducts,
          gaps: latestAudit.gaps,
          timestamp: latestAudit.timestamp,
          trends: trends.map((t: any) => ({
            date: t.timestamp.toISOString().split('T')[0],
            score: t.score,
            totalProducts: t.totalProducts,
            validProducts: t.validProducts
          }))
        } : null
      })
    }

    if (action === "auto-fix") {
      const gapTypes = formData.get("gapTypes") as string
      
      if (!gapTypes) {
        return json({
          success: false,
          error: "Gap types are required",
        }, { status: 400 })
      }

      // Get user
      const user = await db.user.findUnique({
        where: { shopId: session.shop }
      })

      if (!user) {
        return json({
          success: false,
          error: "User not found",
        }, { status: 404 })
      }

      // Trigger AI enrichment for fixable gaps
      const aiEnrichmentJob = await backgroundJobsQueue?.add('ai-enrichment', {
        shopId: session.shop,
        userId: user.id,
        productIds: [], // Will be determined by gap types
        gapTypes: JSON.parse(gapTypes)
      })

      return json({
        success: true,
        jobId: aiEnrichmentJob?.id,
        message: "Auto-fix initiated",
      })
    }

    return json({
      success: false,
      error: "Invalid action",
    }, { status: 400 })

  } catch (error) {
    console.error('Health check action error:', error)
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to process action",
    }, { status: 500 })
  }
}
