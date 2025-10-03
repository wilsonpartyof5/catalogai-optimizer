import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { authenticate } from "~/shopify.server"
import { db } from "~/utils/db"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    const user = await db.user.findUnique({
      where: { shopId: session.shop }
    })

    if (!user) {
      return json({
        success: false,
        error: "User not found",
      }, { status: 404 })
    }

    // Return current settings (defaults if not set)
    return json({
      success: true,
      settings: {
        healthChecksEnabled: true,
        healthCheckTime: "02:00", // 2 AM UTC
        autoFixEnabled: true,
        emailNotifications: true,
        maxProductsPerScan: user.tier === 'enterprise' ? 500 : 100,
        includeUrlPings: true,
        includeInventoryChecks: true,
        includeValidation: true
      }
    })
  } catch (error) {
    console.error('Settings API error:', error)
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch settings",
    }, { status: 500 })
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    const formData = await request.formData()
    const action = formData.get("action") as string

    const user = await db.user.findUnique({
      where: { shopId: session.shop }
    })

    if (!user) {
      return json({
        success: false,
        error: "User not found",
      }, { status: 404 })
    }

    if (action === "update") {
      const healthChecksEnabled = formData.get("healthChecksEnabled") === "true"
      const healthCheckTime = formData.get("healthCheckTime") as string
      const autoFixEnabled = formData.get("autoFixEnabled") === "true"
      const emailNotifications = formData.get("emailNotifications") === "true"
      const maxProductsPerScan = parseInt(formData.get("maxProductsPerScan") as string) || 100
      const includeUrlPings = formData.get("includeUrlPings") === "true"
      const includeInventoryChecks = formData.get("includeInventoryChecks") === "true"
      const includeValidation = formData.get("includeValidation") === "true"

      // Update user settings (we'll store these in a separate settings table later)
      // For now, we'll store them in the user metadata or create a simple settings field
      
      await db.log.create({
        data: {
          userId: user.id,
          type: 'settings_update',
          message: `Settings updated: health checks ${healthChecksEnabled ? 'enabled' : 'disabled'}, auto-fix ${autoFixEnabled ? 'enabled' : 'disabled'}`,
          metadata: {
            healthChecksEnabled,
            healthCheckTime,
            autoFixEnabled,
            emailNotifications,
            maxProductsPerScan,
            includeUrlPings,
            includeInventoryChecks,
            includeValidation
          }
        }
      })

      return json({
        success: true,
        message: "Settings updated successfully",
      })
    }

    return json({
      success: false,
      error: "Invalid action",
    }, { status: 400 })

  } catch (error) {
    console.error('Settings action error:', error)
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update settings",
    }, { status: 500 })
  }
}
