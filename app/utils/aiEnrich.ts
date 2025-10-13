import { AIClient } from './aiClient'
import { ShopifyProduct } from './shopifySync'
import { OpenAISpecProduct } from './openaiSpec'
import { db } from './db'


export interface EnrichmentResult {
  originalProduct: ShopifyProduct
  enrichedSpec: OpenAISpecProduct
  improvements: EnrichmentImprovement[]
  totalUsage: number
  errors: string[]
}

export interface EnrichmentImprovement {
  field: string
  originalValue: any
  newValue: any
  improvement: string
}

export class AIEnrichmentService {
  private aiClient: AIClient

  constructor() {
    this.aiClient = new AIClient()
  }

  async enrichProduct(
    userId: string,
    product: ShopifyProduct,
    gaps: string[] = []
  ): Promise<EnrichmentResult> {
    const improvements: EnrichmentImprovement[] = []
    const errors: string[] = []
    let totalUsage = 0

    // Start with basic mapping
    const baseSpec: OpenAISpecProduct = {
      title: product.title || '',
      description: product.description || '',
      price: product.variants[0]?.price ? `${product.variants[0].price} USD` : '0.00 USD',
      availability: this.getAvailabilityStatus(product.variants),
      category: product.productType || 'Uncategorized',
      sku: product.variants[0]?.sku,
      image_urls: product.images.map(img => img.url),
      vendor: product.vendor,
    }

    console.log('🎯 Enriching product for gaps:', gaps)

    // Dynamic gap-driven enrichment
    for (const gap of gaps) {
      try {
        const result = await this.generateRecommendationForGap(gap, baseSpec, userId)
        if (result) {
          improvements.push(result)
          totalUsage += result.newValue?.length || 0
        }
      } catch (error) {
        errors.push(`Failed to generate recommendation for ${gap}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return {
      originalProduct: product,
      enrichedSpec: baseSpec,
      improvements,
      totalUsage,
      errors
    }
  }

  private async generateRecommendationForGap(
    gap: string,
    baseSpec: OpenAISpecProduct,
    userId: string
  ): Promise<EnrichmentImprovement | null> {
    // Fields that require actual product specifications from the brand/customer
    // AI cannot make up factual product data like dimensions, weight, UPC, etc.
    const customerInputFields = [
      'material', 'dimensions', 'weight', 'color', 'size', 'model', 'brand', 'vendor',
      'upc', 'age_range', 'gender', 'compatibility', 'specifications', 
      'video_urls', 'documentation_url', 'return_policy', 'shipping_info'
    ]
    
    if (customerInputFields.includes(gap)) {
      return {
        field: gap,
        originalValue: (baseSpec as any)[gap] || null,
        newValue: 'Need Customer Input',
        improvement: `This field requires actual product specifications from the brand/manufacturer`
      }
    }

    // Fields that AI can generate (marketing content, suggestions)
    const fieldMappings = {
      description: {
        prompt: `Given the product title "${baseSpec.title}", generate a comprehensive and engaging product description. Highlight its key features, benefits, and target audience. Aim for a length of at least 200 words. Current description: "${baseSpec.description || 'No description'}"`,
        maxTokens: 500,
        reason: 'Generated comprehensive product description'
      },
      use_cases: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of 3-5 practical use cases or scenarios where this product would be ideal. Focus on how a customer would use it.`,
        maxTokens: 100,
        reason: 'Generated practical use cases'
      },
      features: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a bulleted list of 3-5 key features of the product. Focus on unique selling points and technical specifications.`,
        maxTokens: 150,
        reason: 'Generated key product features'
      },
      keywords: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of relevant keywords for SEO and search. Focus on terms a customer would use to find this product. Do not include the product title itself as a keyword.`,
        maxTokens: 100,
        reason: 'Generated SEO keywords'
      },
      target_audience: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", suggest the primary target audience for this product (e.g., 'Beginner snowboarders', 'Professional athletes', 'Casual users').`,
        maxTokens: 50,
        reason: 'Suggested target audience'
      },
      sku: {
        prompt: `Given the product title "${baseSpec.title}", description "${baseSpec.description}", and current SKU "${baseSpec.sku || 'N/A'}", suggest a concise SKU for the product if it's missing or generic. If a good SKU exists, state 'N/A'.`,
        maxTokens: 20,
        reason: 'Suggested concise SKU'
      },
      tags: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of relevant tags for product categorization and search. Focus on broad categories and attributes.`,
        maxTokens: 100,
        reason: 'Generated relevant tags'
      },
      warranty: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", suggest typical warranty information for this type of product (e.g., '1-year limited warranty', 'Manufacturer warranty applies').`,
        maxTokens: 50,
        reason: 'Suggested warranty information'
      },
      ai_search_queries: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate 5-7 example search queries that customers might use to find this product when using AI search or voice search. Focus on natural language queries.`,
        maxTokens: 150,
        reason: 'Generated AI search query examples'
      },
      semantic_description: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", create a concise semantic description optimized for AI understanding. Focus on key attributes, use cases, and context in 2-3 sentences.`,
        maxTokens: 150,
        reason: 'Generated AI-optimized semantic description'
      },
      image_urls: {
        prompt: `Note: Image URLs cannot be generated by AI. This field requires actual product images to be uploaded to Shopify.`,
        maxTokens: 10,
        reason: 'Images require manual upload'
      }
    }

    const mapping = fieldMappings[gap as keyof typeof fieldMappings]
    if (!mapping) {
      console.log(`⚠️ No mapping found for gap: ${gap}`)
      return null
    }

    try {
      const aiResponse = await this.aiClient.generateText(mapping.prompt, mapping.maxTokens)
      
      console.log(`🤖 AI Response for ${gap}:`, aiResponse)
      
      // Filter out empty responses, errors, or N/A responses (not useful)
      if (
        aiResponse && 
        aiResponse.trim() !== '' && 
        !aiResponse.toLowerCase().includes('error') &&
        aiResponse.trim().toLowerCase() !== 'n/a'
      ) {
        return {
          field: gap,
          originalValue: baseSpec[gap as keyof OpenAISpecProduct] || null,
          newValue: aiResponse,
          improvement: mapping.reason
        }
      } else {
        console.log(`⚠️ Skipping ${gap}: Response was empty, N/A, or contained error`)
      }
    } catch (error) {
      console.error(`Error generating recommendation for ${gap}:`, error)
    }

    return null
  }



  async applyEnrichmentToShopify(
    userId: string,
    shopDomain: string,
    accessToken: string,
    enrichmentResult: EnrichmentResult
  ): Promise<boolean> {
    try {
      // Apply enrichment to Shopify metafields
      const metafieldsToUpdate = []

      if (enrichmentResult.enrichedSpec.material) {
        metafieldsToUpdate.push({
          namespace: 'catalogai',
          key: 'material',
          value: enrichmentResult.enrichedSpec.material,
          type: 'single_line_text_field'
        })
      }

      if (enrichmentResult.enrichedSpec.use_cases) {
        metafieldsToUpdate.push({
          namespace: 'catalogai',
          key: 'use_cases',
          value: JSON.stringify(enrichmentResult.enrichedSpec.use_cases),
          type: 'json'
        })
      }

      if (enrichmentResult.enrichedSpec.features) {
        metafieldsToUpdate.push({
          namespace: 'catalogai',
          key: 'features',
          value: JSON.stringify(enrichmentResult.enrichedSpec.features),
          type: 'json'
        })
      }

      if (enrichmentResult.enrichedSpec.keywords) {
        metafieldsToUpdate.push({
          namespace: 'catalogai',
          key: 'keywords',
          value: JSON.stringify(enrichmentResult.enrichedSpec.keywords),
          type: 'json'
        })
      }

      // Update product description if it was enriched
      const descriptionImprovement = enrichmentResult.improvements.find(imp => imp.field === 'description')
      if (descriptionImprovement) {
        // Update the main product description
        await this.updateProductDescription(
          shopDomain,
          accessToken,
          enrichmentResult.originalProduct.id,
          enrichmentResult.enrichedSpec.description
        )
      }

      // Create metafields
      for (const metafield of metafieldsToUpdate) {
        await this.createProductMetafield(
          shopDomain,
          accessToken,
          enrichmentResult.originalProduct.id,
          metafield
        )
      }

      // Log the enrichment
      await db.log.create({
        data: {
          userId,
          type: 'enrichment',
          message: `Applied AI enrichment to product: ${enrichmentResult.originalProduct.title}`,
          metadata: {
            productId: enrichmentResult.originalProduct.id,
            improvements: enrichmentResult.improvements.length,
            usage: enrichmentResult.totalUsage,
            timestamp: new Date().toISOString(),
          },
        },
      })

      return true
    } catch (error) {
      console.error('Failed to apply enrichment to Shopify:', error)
      
      await db.log.create({
        data: {
          userId,
          type: 'error',
          message: `Failed to apply enrichment to Shopify: ${error instanceof Error ? error.message : 'Unknown error'}`,
          error: error instanceof Error ? error.stack : String(error),
          metadata: {
            productId: enrichmentResult.originalProduct.id,
            timestamp: new Date().toISOString(),
          },
        },
      })

      return false
    }
  }

  private getAvailabilityStatus(variants: ShopifyProduct['variants']): "in_stock" | "out_of_stock" | "pre_order" | "discontinued" {
    if (variants.length === 0) return 'out_of_stock'
    
    const hasAvailable = variants.some(v => v.availableForSale && (v.inventoryQuantity || 0) > 0)
    const hasInventory = variants.some(v => (v.inventoryQuantity || 0) > 0)
    
    if (hasAvailable) return 'in_stock'
    if (hasInventory && !hasAvailable) return 'pre_order'
    return 'out_of_stock'
  }

  private getMetafieldValue(metafields: ShopifyProduct['metafields'], key: string): string | undefined {
    const metafield = metafields.find(m => 
      m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
    )
    return metafield?.value
  }

  private getMetafieldArray(metafields: ShopifyProduct['metafields'], key: string): string[] | undefined {
    const value = this.getMetafieldValue(metafields, key)
    if (!value) return undefined
    
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return parsed.filter(item => typeof item === 'string')
      }
    } catch {
      return value.split(/[,;|]/).map(item => item.trim()).filter(Boolean)
    }
    
    return undefined
  }

  private async updateProductDescription(
    shopDomain: string,
    accessToken: string,
    productId: string,
    description: string
  ): Promise<void> {
    const mutation = `
      mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            title
            description
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      input: {
        id: `gid://shopify/Product/${productId}`,
        description: description
      }
    }

    const response = await fetch(`https://${shopDomain}/admin/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update product description: ${response.status}`)
    }

    const result = await response.json()
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }
  }

  private async createProductMetafield(
    shopDomain: string,
    accessToken: string,
    productId: string,
    metafield: {
      namespace: string
      key: string
      value: string
      type: string
    }
  ): Promise<void> {
    const mutation = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      metafields: [
        {
          ownerId: `gid://shopify/Product/${productId}`,
          namespace: metafield.namespace,
          key: metafield.key,
          value: metafield.value,
          type: metafield.type,
        }
      ]
    }

    const response = await fetch(`https://${shopDomain}/admin/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create metafield: ${response.status}`)
    }

    const result = await response.json()
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }
  }
}
