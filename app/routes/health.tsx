import { json } from "@remix-run/node"

export async function loader() {
  try {
    // Simple health check without database dependency
    return json(
      { 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        service: "catalogai-optimizer",
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Health check failed:", error)
    return json(
      { 
        status: "unhealthy", 
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}