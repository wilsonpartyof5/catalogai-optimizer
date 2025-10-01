import { json, type ActionFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"
import { db } from "../utils/db"
import { ShopifySyncService } from "../utils/shopifySync"

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session } = await authenticate.webhook(request)

  if (!session) {
    return json({ error: "No session found" }, { status: 401 })
  }

  try {
    // Get user from database
    const user = await db.user.findUnique({
      where: { shopId: shop },
    })

    if (!user) {
      return json({ error: "User not found" }, { status: 404 })
    }

    // Handle different webhook topics
    switch (topic) {
      case 'PRODUCTS_CREATE':
      case 'PRODUCTS_UPDATE':
        await handleProductWebhook(user.id, session.shop, user.accessToken, topic)
        break
      
      case 'PRODUCTS_DELETE':
        await handleProductDelete(user.id, topic)
        break
      
      default:
        console.log(`Unhandled webhook topic: ${topic}`)
    }

    return json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    
    // Log the error
    if (session?.shop) {
      const user = await db.user.findUnique({
        where: { shopId: session.shop },
      })
      
      if (user) {
        await db.log.create({
          data: {
            userId: user.id,
            type: 'error',
            message: `Webhook error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            error: error instanceof Error ? error.stack : String(error),
            metadata: {
              topic,
              timestamp: new Date().toISOString(),
            },
          },
        })
      }
    }

    return json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function handleProductWebhook(
  userId: string,
  shopDomain: string,
  accessToken: string,
  topic: string
) {
  try {
    // Log the webhook trigger
    await db.log.create({
      data: {
        userId,
        type: 'webhook',
        message: `Product webhook triggered: ${topic}`,
        metadata: {
          topic,
          timestamp: new Date().toISOString(),
        },
      },
    })

    // For now, just log the webhook
    // In a full implementation, you might want to:
    // 1. Sync only the specific product that changed
    // 2. Re-run field mapping and validation for that product
    // 3. Update the audit score
    // 4. Trigger a feed update if configured

    console.log(`Product webhook received: ${topic} for shop: ${shopDomain}`)
  } catch (error) {
    console.error('Error handling product webhook:', error)
    throw error
  }
}

async function handleProductDelete(userId: string, topic: string) {
  try {
    // Log the deletion
    await db.log.create({
      data: {
        userId,
        type: 'webhook',
        message: `Product deleted: ${topic}`,
        metadata: {
          topic,
          timestamp: new Date().toISOString(),
        },
      },
    })

    console.log(`Product deletion webhook: ${topic}`)
  } catch (error) {
    console.error('Error handling product deletion webhook:', error)
    throw error
  }
}
