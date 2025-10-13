import { AIClient } from './aiClient'
import { ShopifyProduct } from './shopifySync'
import { OpenAISpecProduct } from './openaiSpec'
import { db } from './db'

export interface EnrichmentOptions {
  enrichDescription?: boolean
  inferMaterial?: boolean
  generateUseCases?: boolean
  generateFeatures?: boolean
  generateKeywords?: boolean
  inferColor?: boolean
  inferSize?: boolean
  inferDimensions?: boolean
  inferWeight?: boolean
  inferTargetAudience?: boolean
  inferModel?: boolean
  inferSku?: boolean
  inferTags?: boolean
  inferWarranty?: boolean
  inferBrand?: boolean
  inferVendor?: boolean
}

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
    const fieldMappings = {
      description: {
        prompt: `Given the product title "${baseSpec.title}", generate a comprehensive and engaging product description. Highlight its key features, benefits, and target audience. Aim for a length of at least 200 words. Current description: "${baseSpec.description || 'No description'}"`,
        maxTokens: 500,
        reason: 'Generated comprehensive product description'
      },
      material: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the primary material(s) of the product. If multiple materials, list the most prominent ones. If no material can be inferred, state 'N/A'.`,
        maxTokens: 50,
        reason: 'Inferred primary material'
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
      color: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the primary color of the product. If multiple colors, list the most prominent one. If no color can be inferred, state 'N/A'.`,
        maxTokens: 30,
        reason: 'Inferred primary color'
      },
      size: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the size of the product. Provide a concise size description (e.g., 'Small', 'Medium', 'Large', 'One Size', '150cm'). If no size can be inferred, state 'N/A'.`,
        maxTokens: 30,
        reason: 'Inferred product size'
      },
      dimensions: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the dimensions of the product (e.g., '10cm x 20cm x 5cm'). If no dimensions can be inferred, state 'N/A'.`,
        maxTokens: 40,
        reason: 'Inferred product dimensions'
      },
      weight: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the weight of the product (e.g., '2.5 kg', '5 lbs'). If no weight can be inferred, state 'N/A'.`,
        maxTokens: 30,
        reason: 'Inferred product weight'
      },
      target_audience: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the primary target audience for this product (e.g., 'Beginner snowboarders', 'Professional athletes', 'Casual users'). If no specific audience can be inferred, state 'N/A'.`,
        maxTokens: 50,
        reason: 'Inferred target audience'
      },
      model: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the model name or number of the product. If no model can be inferred, state 'N/A'.`,
        maxTokens: 30,
        reason: 'Inferred product model'
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
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer typical warranty information for this type of product (e.g., '1-year limited warranty', 'Manufacturer warranty applies'). If no specific warranty can be inferred, state 'N/A'.`,
        maxTokens: 50,
        reason: 'Inferred warranty information'
      },
      brand: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the brand or manufacturer of the product. If no brand can be inferred, state 'N/A'.`,
        maxTokens: 30,
        reason: 'Inferred product brand'
      },
      vendor: {
        prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the vendor or seller of the product. If no vendor can be inferred, state 'N/A'.`,
        maxTokens: 30,
        reason: 'Inferred product vendor'
      }
    }

    const mapping = fieldMappings[gap as keyof typeof fieldMappings]
    if (!mapping) {
      console.log(`⚠️ No mapping found for gap: ${gap}`)
      return null
    }

    try {
      const aiResponse = await this.aiClient.generateText(mapping.prompt, mapping.maxTokens)
      
      if (aiResponse && aiResponse !== 'N/A' && aiResponse.trim() !== '') {
        return {
          field: gap,
          originalValue: baseSpec[gap as keyof OpenAISpecProduct] || null,
          newValue: aiResponse,
          improvement: mapping.reason
        }
      }
    } catch (error) {
      console.error(`Error generating recommendation for ${gap}:`, error)
    }

    return null
  }

  async enrichProducts(
          improvements.push({
            field: 'description',
            originalValue: baseSpec.description,
            newValue: result.enriched,
            improvement: `Expanded from ${baseSpec.description.length} to ${result.enriched.length} characters`
          })
          baseSpec.description = result.enriched
        }
        
        totalUsage += result.usage.totalTokens
      } catch (error) {
        errors.push(`Failed to enrich description: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Infer material
    if (inferMaterial) {
      try {
        const result = await this.aiClient.inferMaterial(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        )
        
        if (result.material !== 'Unknown') {
          improvements.push({
            field: 'material',
            originalValue: undefined,
            newValue: result.material,
            improvement: `Inferred material: ${result.material}`
          })
          baseSpec.material = result.material
        }
        
        totalUsage += result.usage.totalTokens
      } catch (error) {
        errors.push(`Failed to infer material: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Generate use cases
    if (generateUseCases) {
      try {
        const result = await this.aiClient.generateUseCases(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        )
        
        if (result.useCases.length > 0) {
          improvements.push({
            field: 'use_cases',
            originalValue: undefined,
            newValue: result.useCases,
            improvement: `Generated ${result.useCases.length} use cases`
          })
          baseSpec.use_cases = result.useCases
        }
        
        totalUsage += result.usage.totalTokens
      } catch (error) {
        errors.push(`Failed to generate use cases: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Generate features
    if (generateFeatures) {
      try {
        const result = await this.aiClient.generateFeatures(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        )
        
        if (result.features.length > 0) {
          improvements.push({
            field: 'features',
            originalValue: baseSpec.features || [],
            newValue: result.features,
            improvement: `Generated ${result.features.length} key features`
          })
          baseSpec.features = result.features
        }
        
        totalUsage += result.usage.totalTokens
      } catch (error) {
        errors.push(`Failed to generate features: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Generate keywords
    if (generateKeywords) {
      try {
        const result = await this.aiClient.generateKeywords(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        )
        
        if (result.keywords.length > 0) {
          improvements.push({
            field: 'keywords',
            originalValue: baseSpec.keywords || [],
            newValue: result.keywords,
            improvement: `Generated ${result.keywords.length} SEO keywords`
          })
          baseSpec.keywords = result.keywords
        }
        
        totalUsage += result.usage.totalTokens
      } catch (error) {
        errors.push(`Failed to generate keywords: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Infer brand
    if (inferBrand) {
      const prompt = `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the brand or manufacturer of the product. If no brand can be inferred, state 'N/A'.`
      const aiBrand = await this.aiClient.generateText(prompt, 30)
      if (aiBrand && aiBrand !== 'N/A') {
        improvements.push({ field: 'brand', original: baseSpec.brand, recommended: aiBrand, reason: 'Inferred product brand.' })
        totalUsage += aiBrand.length
      }
    }

    // Infer vendor
    if (inferVendor) {
      const prompt = `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", infer the vendor or seller of the product. If no vendor can be inferred, state 'N/A'.`
      const aiVendor = await this.aiClient.generateText(prompt, 30)
      if (aiVendor && aiVendor !== 'N/A') {
        improvements.push({ field: 'vendor', original: baseSpec.vendor, recommended: aiVendor, reason: 'Inferred product vendor.' })
        totalUsage += aiVendor.length
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

  async enrichProducts(
    userId: string,
    products: ShopifyProduct[],
    options: EnrichmentOptions = {},
    maxProducts: number = 5
  ): Promise<EnrichmentResult[]> {
    // Limit the number of products to prevent excessive API usage
    const limitedProducts = products.slice(0, maxProducts)
    const results: EnrichmentResult[] = []

    for (const product of limitedProducts) {
      try {
        const result = await this.enrichProduct(userId, product, options)
        results.push(result)
      } catch (error) {
        console.error(`Failed to enrich product ${product.id}:`, error)
        results.push({
          originalProduct: product,
          enrichedSpec: {
            title: product.title || '',
            description: product.description || '',
            price: product.variants[0]?.price ? `${product.variants[0].price} USD` : '0.00 USD',
            availability: this.getAvailabilityStatus(product.variants),
            category: product.productType || 'Uncategorized',
          },
          improvements: [],
          totalUsage: 0,
          errors: [`Failed to enrich product: ${error instanceof Error ? error.message : 'Unknown error'}`]
        })
      }
    }

    return results
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
