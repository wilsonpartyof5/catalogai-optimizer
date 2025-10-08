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
    take: 5,
  })

  return json({
    lastSync: recentLogs[0]?.createdAt || null,
    recentLogs: recentLogs.map(log => ({
      id: log.id,
      message: log.message,
      createdAt: log.createdAt,
      metadata: log.metadata,
    })),
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request)
  
  // Get user from database
  const user = await db.user.findUnique({
    where: { shopId: session.shop },
  })

  if (!user) {
    return json({ error: "User not found" }, { status: 404 })
  }

  try {
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
    console.error('Sync error:', error)
    
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
