import { GraphQLClient } from 'graphql-request'
import { db } from './db'

export interface ShopifyProduct {
  id: string
  title: string
  description: string
  handle: string
  productType: string
  vendor: string
  tags: string[]
  variants: ShopifyVariant[]
  metafields: ShopifyMetafield[]
  images: ShopifyImage[]
}

export interface ShopifyVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  sku?: string
  inventoryQuantity?: number
  availableForSale: boolean
}

export interface ShopifyMetafield {
  id: string
  namespace: string
  key: string
  value: string
  type: string
}

export interface ShopifyImage {
  id: string
  url: string
  altText?: string
}

const PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                availableForSale
              }
            }
          }
          metafields(first: 100) {
            edges {
              node {
                id
                namespace
                key
                value
                type
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

export class ShopifySyncService {
  private client: GraphQLClient

  constructor(shopDomain: string, accessToken: string) {
    console.log('🔧 ShopifySyncService constructor:', {
      shopDomain,
      accessTokenLength: accessToken?.length || 0,
      accessTokenPrefix: accessToken?.substring(0, 10) + '...',
      endpoint: `https://${shopDomain}/admin/api/2023-10/graphql`
    })
    
    // Test the access token with a simple REST API call first
    this.testAccessToken(shopDomain, accessToken)
    
    this.client = new GraphQLClient(
      `https://${shopDomain}/admin/api/2023-10/graphql`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  private async testAccessToken(shopDomain: string, accessToken: string) {
    try {
      console.log('🧪 Testing access token with REST API...')
      const response = await fetch(`https://${shopDomain}/admin/api/2023-10/shop.json`, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      })
      
      console.log('🧪 REST API test response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Access token is valid, shop name:', data.shop?.name)
      } else {
        console.log('❌ Access token test failed:', response.status, response.statusText)
      }
    } catch (error) {
      console.log('❌ Access token test error:', error)
    }
  }

  async syncProducts(userId: string): Promise<ShopifyProduct[]> {
    const allProducts: ShopifyProduct[] = []
    let hasNextPage = true
    let after: string | undefined
    let pageCount = 0

    console.log('🔄 Starting product sync for user:', userId)
    
    try {
      while (hasNextPage) {
        pageCount++
        console.log(`📄 Fetching page ${pageCount}${after ? ` (after: ${after.substring(0, 20)}...)` : ' (first page)'}`)
        
        const startTime = Date.now()
        const response = await this.client.request(PRODUCTS_QUERY, {
          first: 250,
          after,
        }) as any
        const fetchTime = Date.now() - startTime
        
        console.log(`⏱️  Page ${pageCount} fetched in ${fetchTime}ms`)
        console.log(`📦 Products in this page: ${response.products.edges.length}`)

        const products = response.products.edges.map((edge: any) => ({
          id: edge.node.id.replace('gid://shopify/Product/', ''),
          title: edge.node.title,
          description: edge.node.description || '',
          handle: edge.node.handle,
          productType: edge.node.productType || '',
          vendor: edge.node.vendor || '',
          tags: edge.node.tags || [],
          variants: edge.node.variants.edges.map((v: any) => ({
            id: v.node.id.replace('gid://shopify/ProductVariant/', ''),
            title: v.node.title,
            price: v.node.price,
            compareAtPrice: v.node.compareAtPrice,
            sku: v.node.sku,
            inventoryQuantity: v.node.inventoryQuantity,
            availableForSale: v.node.availableForSale,
          })),
          metafields: edge.node.metafields.edges.map((m: any) => ({
            id: m.node.id.replace('gid://shopify/Metafield/', ''),
            namespace: m.node.namespace,
            key: m.node.key,
            value: m.node.value,
            type: m.node.type,
          })),
          images: edge.node.images.edges.map((i: any) => ({
            id: i.node.id.replace('gid://shopify/MediaImage/', ''),
            url: i.node.url,
            altText: i.node.altText,
          })),
        }))

        allProducts.push(...products)
        console.log(`📊 Total products so far: ${allProducts.length}`)

        hasNextPage = response.products.pageInfo.hasNextPage
        after = response.products.pageInfo.endCursor
        
        console.log(`🔗 Has next page: ${hasNextPage}`)
        if (hasNextPage) {
          console.log(`⏳ Waiting 500ms before next request...`)
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
      
      console.log(`✅ Sync complete! Total products: ${allProducts.length}`)

      // Log the sync operation
      await db.log.create({
        data: {
          userId,
          type: 'sync',
          message: `Synchronized ${allProducts.length} products from Shopify`,
          metadata: {
            productsCount: allProducts.length,
            timestamp: new Date().toISOString(),
          },
        },
      })

      return allProducts
    } catch (error) {
      console.error('❌ Sync failed:', error)
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : String(error),
        pageCount,
        totalProducts: allProducts.length,
      })
      
      // Log the error
      await db.log.create({
        data: {
          userId,
          type: 'error',
          message: `Failed to sync products: ${error instanceof Error ? error.message : 'Unknown error'}`,
          error: error instanceof Error ? error.stack : String(error),
          metadata: {
            timestamp: new Date().toISOString(),
            pageCount,
            totalProducts: allProducts.length,
          },
        },
      })

      throw error
    }
  }

  async getInventoryLevels(shopDomain: string, accessToken: string): Promise<any[]> {
    try {
      const response = await fetch(
        `https://${shopDomain}/admin/api/2023-10/inventory_levels.json`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json() as any
      return data.inventory_levels || []
    } catch (error) {
      console.error('Error fetching inventory levels:', error)
      throw error
    }
  }

  async getRecentOrders(shopDomain: string, accessToken: string, limit: number = 50): Promise<any[]> {
    try {
      const response = await fetch(
        `https://${shopDomain}/admin/api/2023-10/orders.json?limit=${limit}&status=any`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json() as any
      return data.orders || []
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }
}
