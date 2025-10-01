import { json, type ActionFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"
import { ShopifySyncService } from "../utils/shopifySync"
import { AIEnrichmentService } from "../utils/aiEnrich"
import { db } from "../utils/db"

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
    const formData = await request.formData()
    const action = formData.get("action")
    
    if (action === "enrich") {
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

      // Get products from Shopify
      const syncService = new ShopifySyncService(session.shop, user.accessToken)
      const allProducts = await syncService.syncProducts(user.id)
      
      // Filter to selected products or get sample
      const productsToEnrich = productIds.length > 0 
        ? allProducts.filter(p => productIds.includes(p.id))
        : allProducts.slice(0, maxProducts)

      if (productsToEnrich.length === 0) {
        return json({
          success: false,
          error: "No products found to enrich"
        }, { status: 400 })
      }

      // Enrich products
      const enrichmentService = new AIEnrichmentService()
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

      // Apply enrichment to Shopify (optional - controlled by form data)
      const applyToShopify = formData.get("applyToShopify") === "true"
      const appliedResults = []

      if (applyToShopify) {
        for (const result of enrichmentResults) {
          try {
            const success = await enrichmentService.applyEnrichmentToShopify(
              user.id,
              session.shop,
              user.accessToken,
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
      
      // Log the enrichment operation
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

      return json({
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
      })
    }

    return json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error('Enrichment error:', error)
    
    // Log the error
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

    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
