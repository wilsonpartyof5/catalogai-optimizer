import { shopifyApp } from "@shopify/shopify-app-remix/server"
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma"
import { db } from "./utils/db"

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  appUrl: process.env.SHOPIFY_APP_URL!,
  apiVersion: "2025-10" as any,
  scopes: process.env.SCOPES?.split(",") || ["read_products", "read_inventory", "write_metafields", "read_orders"],
  sessionStorage: new PrismaSessionStorage(db),
  distribution: "app" as any,
  useOnlineTokens: false, // Use offline tokens for background API calls
  hooks: {
    afterAuth: async ({ session }) => {
      const requestId = Math.random().toString(36).substring(7)
      console.log(`🔍 [${requestId}] afterAuth triggered for shop:`, session.shop)
      console.log(`🔍 [${requestId}] Session details:`, {
        id: session.id,
        shop: session.shop,
        scope: session.scope,
        isOnline: session.isOnline,
        expires: session.expires,
        accessTokenLength: session.accessToken?.length,
        accessTokenPrefix: session.accessToken?.substring(0, 15) + '...',
      })
      
      try {
        // Create or update user in database
        const user = await db.user.upsert({
        where: { shopId: session.shop! },
        update: {
          accessToken: session.accessToken!,
          updatedAt: new Date(),
        },
        create: {
          shopId: session.shop!,
          shopDomain: session.shop!,
          accessToken: session.accessToken!,
          tier: "starter",
          aiUsage: 0,
        },
      })
      
      console.log(`✅ [${requestId}] User created/updated:`, user.id)
      console.log(`🔍 [${requestId}] User details:`, {
        id: user.id,
        shopId: user.shopId,
        tier: user.tier,
        aiUsage: user.aiUsage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      } catch (error) {
        console.error(`❌ [${requestId}] afterAuth error:`, error)
        console.error(`❌ [${requestId}] Error details:`, {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace',
          errorType: error?.constructor?.name,
        })
        throw error
      }
    },
  },
})

export default shopify
export const apiVersion = "2025-10"
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders
export const authenticate = shopify.authenticate
export const unauthenticated = shopify.unauthenticated
export const registerWebhooks = shopify.registerWebhooks
export const sessionStorage = shopify.sessionStorage

// Import REST resources
// import { restResources } from "@shopify/shopify-api/rest/admin/2023-10"
