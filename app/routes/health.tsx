import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { db } from "~/utils/db"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`
    
    return json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected"
    })
  } catch (error) {
    console.error("Health check failed:", error)
    
    return json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
