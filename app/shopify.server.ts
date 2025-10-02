import { shopifyApp } from "@shopify/shopify-app-remix/server"
import { db } from "./utils/db"
import { InMemorySessionStorage } from "./utils/sessionStorage"

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  appUrl: process.env.SHOPIFY_APP_URL!,
  apiVersion: "2025-10" as any,
  scopes: process.env.SCOPES?.split(",") || ["read_products", "read_inventory", "write_metafields", "read_orders"],
  sessionStorage: new InMemorySessionStorage(),
  distribution: "app" as any,
  hooks: {
    afterAuth: async ({ session }) => {
      // Create or update user in database
      await db.user.upsert({
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
