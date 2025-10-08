import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"
import { ShopifySyncService } from "../utils/shopifySync"
import { db } from "../utils/db"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request)
  
  // Get user from database
  const user = await db.user.findUnique({
    where: { shopId: session.shop },
  })

  if (!user) {
    return json({ error: "User not found" }, { status: 404 })
  }

  // Get recent sync logs
  const recentLogs = await db.log.findMany({
    where: {
      userId: user.id,
      type: 'sync',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })

  return json({
    logs: recentLogs.map(log => ({
      id: log.id,
      type: log.type,
      message: log.message,
      createdAt: log.createdAt,
      metadata: log.metadata,
    })),
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('🎯 SYNC ACTION CALLED - Request method:', request.method)
  console.log('🎯 SYNC ACTION CALLED - Request URL:', request.url)
  
  try {
    const { session } = await authenticate.admin(request)
    console.log('🎯 Authentication successful for shop:', session.shop)
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { shopId: session.shop },
    })

    if (!user) {
      return json({ error: "User not found" }, { status: 404 })
    }

    console.log('🚀 Starting sync for shop:', session.shop)
    console.log('👤 User ID:', user.id)
    
    // Initialize sync service
    const syncService = new ShopifySyncService(session.shop, user.accessToken)
    console.log('🔧 Sync service initialized')
    
    // Sync products
    console.log('📦 Starting product sync...')
    const products = await syncService.syncProducts(user.id)
    console.log('✅ Product sync completed:', products.length, 'products')
    
    // Get inventory levels for analytics
    console.log('📊 Fetching inventory levels...')
    const inventoryLevels = await syncService.getInventoryLevels(session.shop, user.accessToken)
    console.log('📈 Inventory levels:', inventoryLevels.length)
    
    // Get recent orders for attribution
    console.log('🛒 Fetching recent orders...')
    const recentOrders = await syncService.getRecentOrders(session.shop, user.accessToken, 50)
    console.log('📋 Recent orders:', recentOrders.length)

    // Create an audit record for this sync
    console.log('📝 Creating audit record...')
    const audit = await db.audit.create({
      data: {
        userId: user.id,
        score: 0, // Will be calculated after field mapping
        totalProducts: products.length,
        validProducts: 0, // Will be calculated after validation
        gaps: [], // Will be populated after field mapping and validation
      },
    })
    console.log('✅ Audit record created:', audit.id)

    const response = {
      success: true,
      message: `Successfully synced ${products.length} products`,
      data: {
        productsCount: products.length,
        inventoryLevelsCount: inventoryLevels.length,
        recentOrdersCount: recentOrders.length,
        auditId: audit.id,
      },
    }
    
    console.log('🎉 Sync response:', response)
    return json(response)
  } catch (error) {
    console.error('❌ SYNC ACTION ERROR:', error)
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : String(error),
    })
    
    // If it's a Response (OAuth redirect), re-throw it to allow the redirect to happen
    if (error instanceof Response) {
      console.log('🔄 Re-throwing OAuth redirect response')
      throw error
    }
    
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}