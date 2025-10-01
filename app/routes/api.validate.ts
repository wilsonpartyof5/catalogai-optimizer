import { json, type ActionFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"
import { ShopifySyncService } from "../utils/shopifySync"
import { mapProductsToSpec } from "../utils/fieldMapper"
import { validateProducts, getValidationSummary } from "../utils/validator"
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
    
    if (action === "validate") {
      // Get a sample of products for validation (limit to 10 for demo)
      const syncService = new ShopifySyncService(session.shop, user.accessToken)
      const products = await syncService.syncProducts(user.id)
      
      // Limit to first 10 products for demo
      const sampleProducts = products.slice(0, 10)
      
      // Map Shopify products to OpenAI spec
      const mappedProducts = mapProductsToSpec(sampleProducts)
      
      // Validate the mapped products
      const validationResults = await validateProducts(mappedProducts.map(p => {
        const { originalId, score, ...spec } = p
        return spec
      }))
      
      // Get validation summary
      const summary = getValidationSummary(validationResults)
      
      // Create audit record
      const audit = await db.audit.create({
        data: {
          userId: user.id,
          score: summary.validationRate,
          totalProducts: summary.totalProducts,
          validProducts: summary.validProducts,
          gaps: summary.commonErrors.map(error => ({
            field: error.field,
            count: error.count,
            message: error.message
          })),
        },
      })

      // Log the validation
      await db.log.create({
        data: {
          userId: user.id,
          type: 'validation',
          message: `Validated ${summary.totalProducts} products - ${summary.validationRate}% passed validation`,
          metadata: {
            summary,
            auditId: audit.id,
            timestamp: new Date().toISOString(),
          },
        },
      })

      return json({
        success: true,
        data: {
          auditId: audit.id,
          summary,
          products: mappedProducts.map((product, index) => ({
            id: product.originalId,
            title: product.title,
            score: product.score,
            validation: validationResults[index],
          })),
        },
      })
    }

    return json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error('Validation error:', error)
    
    // Log the error
    await db.log.create({
      data: {
        userId: user.id,
        type: 'error',
        message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
