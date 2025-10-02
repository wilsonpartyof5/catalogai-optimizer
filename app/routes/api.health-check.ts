import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { healthCheckQueue, backgroundJobsQueue } from "~/utils/queue"
import { authenticate } from "~/shopify.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    // Check if health check queue is available
    if (!healthCheckQueue) {
      return json({
        success: false,
        error: "Health check system not available - Redis not configured",
      }, { status: 503 })
    }

    // Trigger manual health checks
    const urlPingJob = await healthCheckQueue.add('url-ping', {
      url: process.env.SHOPIFY_APP_URL + '/health',
    })
    
    const inventoryJob = await healthCheckQueue.add('inventory-validation', {
      shopId: session.shop,
    })
    
    const apiStatusJob = await healthCheckQueue.add('api-status', {
      shopId: session.shop,
    })

    return json({
      success: true,
      jobs: {
        urlPing: urlPingJob.id,
        inventoryValidation: inventoryJob.id,
        apiStatus: apiStatusJob.id,
      },
      message: "Health checks initiated",
    })
  } catch (error) {
    console.error('Health check API error:', error)
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to initiate health checks",
    }, { status: 500 })
  }
}
