import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { healthCheckQueue, backgroundJobsQueue } from "~/utils/queue"
import { authenticate } from "~/shopify.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    // Get queue statistics
    const healthCheckStats = await healthCheckQueue.getJobCounts()
    const backgroundJobsStats = await backgroundJobsQueue.getJobCounts()
    
    // Get recent completed jobs
    const recentHealthChecks = await healthCheckQueue.getJobs(['completed'], 0, 5)
    const recentBackgroundJobs = await backgroundJobsQueue.getJobs(['completed'], 0, 5)

    return json({
      success: true,
      queues: {
        healthChecks: {
          ...healthCheckStats,
          recentJobs: recentHealthChecks.map(job => ({
            id: job.id,
            name: job.name,
            data: job.data,
            result: job.returnvalue,
            completedOn: job.finishedOn,
          })),
        },
        backgroundJobs: {
          ...backgroundJobsStats,
          recentJobs: recentBackgroundJobs.map(job => ({
            id: job.id,
            name: job.name,
            data: job.data,
            result: job.returnvalue,
            completedOn: job.finishedOn,
          })),
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to get queue status",
    }, { status: 500 })
  }
}
