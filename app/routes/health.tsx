import { json } from "@remix-run/node"
import { db } from "~/utils/db"

export async function loader() {
  try {
    // Check database connectivity
    await db.$queryRaw`SELECT 1`
    
    return json(
      { 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        service: "catalogai-optimizer",
        database: "connected",
        environment: process.env.NODE_ENV || "development"
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Health check failed:", error)
    return json(
      { 
        status: "unhealthy", 
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        database: "disconnected"
      },
      { status: 500 }
    )
  }
}