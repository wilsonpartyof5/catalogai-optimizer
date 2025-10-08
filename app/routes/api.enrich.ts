import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"
import { ShopifySyncService } from "../utils/shopifySync"
import { AIEnrichmentService } from "../utils/aiEnrich"
import { db } from "../utils/db"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('🎯 AI ENRICH LOADER CALLED')
  try {
    const { session } = await authenticate.admin(request)
    console.log('✅ AI Enrich loader authentication successful for shop:', session.shop)
    return json({ success: true, message: "AI Enrichment API ready" })
  } catch (error) {
    console.error('❌ AI Enrich loader authentication failed:', error)
    return json({ success: false, error: "Authentication failed" }, { status: 401 })
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('🎯 AI ENRICH ACTION CALLED - Fixed Syntax Error')
  
  try {
    console.log('🔍 Attempting authentication for AI enrichment...')
    console.log('🔍 Request URL:', request.url)
    console.log('🔍 Request method:', request.method)
    console.log('🔍 Request headers:', Object.fromEntries(request.headers.entries()))
    
    const { session } = await authenticate.admin(request)
    console.log('✅ AI Enrich authentication successful for shop:', session.shop)
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { shopId: session.shop },
    })

    if (!user) {
      console.log('❌ User not found for shop:', session.shop)
      return json({ error: "User not found" }, { status: 404 })
    }
    console.log('👤 User found:', user.id)
    const formData = await request.formData()
    const action = formData.get("action")
    const shopFromForm = formData.get("shop")
    console.log('📝 Form data action:', action)
    console.log('🏪 Shop from form:', shopFromForm)
    
    if (action === "enrich") {
      console.log('🚀 Starting AI enrichment process...')
      const productIds = formData.getAll("productIds") as string[]
      const maxProducts = parseInt(formData.get("maxProducts") as string) || 5
      
      // Check tier limits
      const tierLimits = {
        starter: 5,
        pro: 25,
        enterprise: 100
      }
      
      const limit = tierLimits[user.tier as keyof typeof tierLimits] || tierLimits.starter
      
      if (maxProducts > limit) {
        return json({
          success: false,
          error: `Your ${user.tier} tier allows up to ${limit} products per enrichment. Please upgrade to process more products.`
        }, { status: 400 })
      }

      // Get products from Shopify using offline session token
      console.log('🔑 Loading offline session for AI enrichment...')
      const { sessionStorage } = await import("../shopify.server")
      const offlineSessionId = `offline_${session.shop}`
      const offlineSession = await sessionStorage.loadSession(offlineSessionId)
      
      if (!offlineSession?.accessToken) {
        console.log('❌ Offline session not found for AI enrichment')
        return json({
          success: false,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 })
      }
      console.log('✅ Offline session loaded for AI enrichment')
      
      console.log('📦 Fetching products for AI enrichment...')
      const syncService = new ShopifySyncService(session.shop, offlineSession.accessToken)
      const allProducts = await syncService.syncProducts(user.id)
      console.log('📦 Products fetched:', allProducts.length)
      
      // Filter to selected products or get sample
      const productsToEnrich = productIds.length > 0 
        ? allProducts.filter(p => productIds.includes(p.id))
        : allProducts.slice(0, maxProducts)

      console.log('🎯 Products selected for enrichment:', productsToEnrich.length)

      if (productsToEnrich.length === 0) {
        console.log('❌ No products found to enrich')
        return json({
          success: false,
          error: "No products found to enrich"
        }, { status: 400 })
      }

      // Enrich products
      console.log('🤖 Starting AI enrichment service...')
      const enrichmentService = new AIEnrichmentService()
      console.log('🤖 Calling enrichProducts with', productsToEnrich.length, 'products')
      
      const enrichmentResults = await enrichmentService.enrichProducts(
        user.id,
        productsToEnrich,
        {
          enrichDescription: true,
          inferMaterial: true,
          generateUseCases: true,
          generateFeatures: true,
          generateKeywords: true,
        },
        maxProducts
      )
      
      console.log('✅ AI enrichment completed, results:', enrichmentResults.length)

      // Apply enrichment to Shopify (optional - controlled by form data)
      const applyToShopify = formData.get("applyToShopify") === "true"
      const appliedResults = []

      if (applyToShopify) {
        for (const result of enrichmentResults) {
          try {
            const success = await enrichmentService.applyEnrichmentToShopify(
              user.id,
              session.shop,
              offlineSession.accessToken,
              result
            )
            appliedResults.push({
              productId: result.originalProduct.id,
              success,
              improvements: result.improvements
            })
          } catch (error) {
            appliedResults.push({
              productId: result.originalProduct.id,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            })
          }
        }
      }

      // Calculate total usage
      const totalUsage = enrichmentResults.reduce((sum, result) => sum + result.totalUsage, 0)
      console.log('💰 Total usage calculated:', totalUsage)
      
      // Log the enrichment operation
      console.log('📝 Creating database log...')
      await db.log.create({
        data: {
          userId: user.id,
          type: 'enrichment',
          message: `AI enrichment completed for ${enrichmentResults.length} products`,
          metadata: {
            productsProcessed: enrichmentResults.length,
            totalUsage,
            appliedToShopify: applyToShopify,
            timestamp: new Date().toISOString(),
          },
        },
      })
      console.log('✅ Database log created')

      const response = {
        success: true,
        data: {
          productsProcessed: enrichmentResults.length,
          totalUsage,
          appliedToShopify: applyToShopify,
          results: enrichmentResults.map(result => ({
            productId: result.originalProduct.id,
            title: result.originalProduct.title,
            improvements: result.improvements,
            totalUsage: result.totalUsage,
            errors: result.errors,
          })),
          appliedResults,
        },
      }
      
      console.log('🎉 Returning successful response:', response)
      return json(response)
    }

    return json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error('❌ CRITICAL ERROR in AI enrichment:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    // Log the error (but don't fail if user is undefined)
    try {
      // Try to get user for logging (might not be available if error occurred early)
      const { session } = await authenticate.admin(request).catch(() => null)
      if (session) {
        const user = await db.user.findUnique({
          where: { shopId: session.shop },
        }).catch(() => null)
        
        if (user) {
          await db.log.create({
            data: {
              userId: user.id,
              type: 'error',
              message: `Enrichment error: ${error instanceof Error ? error.message : 'Unknown error'}`,
              error: error instanceof Error ? error.stack : String(error),
              metadata: {
                timestamp: new Date().toISOString(),
              },
            },
          })
          console.log('📝 Error logged to database')
        }
      }
    } catch (logError) {
      console.error('❌ Failed to log error to database:', logError)
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
