import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { useState, useEffect } from "react"
import "../styles/product-grid.css"
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Button, 
  Banner, 
  DataTable, 
  Badge, 
  Toast,
  InlineStack,
  Box,
  Modal,
  TextField,
  Select,
  Collapsible,
  ProgressBar,
  BlockStack
} from "@shopify/polaris"
import { authenticate } from "../shopify.server"
import { db } from "../utils/db"
import { HealthCheckModal } from "../components/HealthCheckModal"
import { getFieldInputType, FIELD_LABELS } from "../utils/openaiSpec"

// TypeScript interfaces for type safety
interface Product {
  id: string
  title: string
  description: string
  score: number
  gaps: string[]
  rawProduct?: any // Store raw Shopify product data
  spec?: any // Store mapped spec data
  recommendations?: any // Store persisted AI recommendations with status
}

interface LogEntry {
  id: string
  type: string
  message: string
  createdAt: string
}

interface User {
  id: string
  shopId: string
  tier: string
  aiUsage: number
}

interface Audit {
  id: string
  userId: string
  totalProducts: number
  score: number
  timestamp: Date
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    console.log('🔍 DEBUG - Starting authentication for request:', request.url)
    const { session } = await authenticate.admin(request)
    
    // DEBUG: Add logging to see what's happening
    console.log('🔍 DEBUG - Session shop:', session.shop)
    console.log('🔍 DEBUG - Session exists:', !!session)
    console.log('🔍 DEBUG - Access token exists:', !!session.accessToken)
    console.log('🔍 DEBUG - Session ID:', session.id)

    // Get user from database with error handling
    let user = null
    let latestAudit = null
    let recentLogs = []

    try {
      user = await db.user.findUnique({
        where: { shopId: session.shop },
      })

      if (user) {
        // Get latest audit if available
        latestAudit = await db.audit.findFirst({
          where: { userId: user.id },
          orderBy: { timestamp: 'desc' },
        })

        // Clean up old error logs with raw details
        await db.log.deleteMany({
          where: {
            userId: user.id,
            message: {
              contains: 'GraphQL Error'
            }
          }
        })
        
        // Get recent logs (filter out raw error details)
        recentLogs = await db.log.findMany({
          where: { 
            userId: user.id,
            // Filter out logs with raw error details
            message: {
              not: {
                contains: 'GraphQL Error'
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        })
      }
    } catch (dbError) {
      console.error('Database error in loader:', dbError)
      // Continue with mock data if database fails
    }

  // Fetch real products with scores
  let products: Product[] = []
  let totalProducts = 0
  let averageScore = 0

  if (user) {
    try {
      // Load offline session to fetch products
      const { sessionStorage } = await import("../shopify.server")
      const offlineSessionId = `offline_${session.shop}`
      const offlineSession = await sessionStorage.loadSession(offlineSessionId)
      
      if (offlineSession?.accessToken) {
        // Import services
        const { ShopifySyncService } = await import("../utils/shopifySync")
        const { mapShopifyToSpec, calculateProductScore } = await import("../utils/fieldMapper")
        
        // Fetch products from Shopify
        const syncService = new ShopifySyncService(session.shop, offlineSession.accessToken)
        const shopifyProducts = await syncService.syncProducts(user.id)
        
        // Fetch stored recommendations for all products
        const storedProducts = await db.product.findMany({
          where: { userId: user.id },
          select: {
            shopifyId: true,
            recommendations: true
          }
        })
        
        const recommendationsMap = new Map()
        storedProducts.forEach(sp => {
          if (sp.recommendations) {
            recommendationsMap.set(sp.shopifyId, sp.recommendations)
          }
        })
        
        // Map to spec format and calculate scores
        products = shopifyProducts.map((shopifyProduct: any) => {
          const spec = mapShopifyToSpec(shopifyProduct)
          const scoreData = calculateProductScore(spec)
          const productId = shopifyProduct.id.replace('gid://shopify/Product/', '')
          
          return {
            id: productId,
            title: shopifyProduct.title || 'Untitled Product',
            description: shopifyProduct.description || 'No description',
            score: scoreData.score,
            gaps: scoreData.gaps,
            rawProduct: shopifyProduct, // Store raw product for detail view
            spec: spec, // Store mapped spec for recommendations
            recommendations: recommendationsMap.get(productId) || null, // Include stored recommendations
          }
        })
        
        totalProducts = shopifyProducts.length
        averageScore = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.score, 0) / products.length) : 0
      }
    } catch (error) {
      console.error('Error fetching products in loader:', error)
      // Fall back to mock data if there's an error
      products = [
    {
      id: "1",
      title: "Sample Product 1",
      description: "Basic product description",
      score: 75,
      gaps: ["material", "weight"],
    },
    {
      id: "2", 
      title: "Sample Product 2",
      description: "Another product with minimal details",
      score: 60,
      gaps: ["material", "dimensions", "use_cases"],
    },
    {
      id: "3",
      title: "Sample Product 3", 
      description: "Well-described product with comprehensive details",
      score: 95,
      gaps: [],
    },
  ]
    }
  }

    return json({
      shop: session.shop,
      user,
      products: products,
      totalProducts: totalProducts,
      averageScore: averageScore,
      lastSync: recentLogs.find((log: any) => log.type === 'sync')?.createdAt || null,
      recentLogs: recentLogs.map((log: any): LogEntry => ({
        id: log.id,
        type: log.type,
        message: log.message,
        createdAt: log.createdAt,
      })),
    })
  } catch (error) {
    console.error('❌ ERROR in index loader:', error)
    console.error('❌ ERROR details:', {
      message: (error as any).message,
      stack: (error as any).stack,
      name: (error as any).name
    })
    
    // If it's a Response (OAuth redirect), re-throw it to allow the redirect to happen
    if (error instanceof Response) {
      console.log('🔄 Re-throwing OAuth redirect response')
      throw error
    }
    
    // For other errors, return minimal data
    return json({
      shop: 'unknown',
      products: [],
      user: null,
      totalProducts: 0,
      averageScore: 0,
      lastSync: null,
      recentLogs: [],
    })
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('🎯 INDEX ACTION CALLED')
  
  try {
    const { admin, session } = await authenticate.admin(request)
    console.log('✅ Authentication successful in index action')
    console.log('🔑 Admin API client available:', !!admin)
    console.log('📍 Session shop:', session.shop)
    
    const formData = await request.formData()
    const actionType = formData.get("action")

    if (actionType === "sync") {
      console.log('🚀 Starting sync in index action')
      
      // Get user from database
      const user = await db.user.findUnique({
        where: { shopId: session.shop },
      })

      if (!user) {
        console.log('❌ User not found for shop:', session.shop)
        return json({ success: false, error: "User not found" }, { status: 404 })
      }

      console.log('👤 User ID:', user.id)
      
      // Load the offline session from storage
      const { sessionStorage } = await import("../shopify.server")
      const offlineSessionId = `offline_${session.shop}`
      console.log('🔑 Loading offline session:', offlineSessionId)
      
      const offlineSession = await sessionStorage.loadSession(offlineSessionId)
      
      if (!offlineSession) {
        console.log('❌ Offline session not found')
        return json({ success: false, error: "Offline session not found. Please reinstall the app." }, { status: 401 })
      }
      
      console.log('✅ Offline session loaded, has accessToken:', !!offlineSession.accessToken)
      console.log('🔑 Access token prefix:', offlineSession.accessToken?.substring(0, 15) + '...')
      console.log('🔑 Access token length:', offlineSession.accessToken?.length)
      console.log('🔍 Session scope:', offlineSession.scope)
      console.log('🔍 Session isOnline:', offlineSession.isOnline)
      
      // Create a GraphQL client with the offline access token
      const { GraphQLClient } = await import('graphql-request')
      const graphqlClient = new GraphQLClient(
        `https://${session.shop}/admin/api/2025-10/graphql`,
        {
          headers: {
            'X-Shopify-Access-Token': offlineSession.accessToken!,
            'Content-Type': 'application/json',
          },
        }
      )
      
      console.log('📦 Starting product sync with offline access token...')
      
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
      
      const allProducts: any[] = []
      let hasNextPage = true
      let after: string | undefined
      let pageCount = 0
      
      while (hasNextPage) {
        pageCount++
        console.log(`📄 Fetching page ${pageCount}${after ? ` (after cursor)` : ' (first page)'}`)
        
        const response = await graphqlClient.request(PRODUCTS_QUERY, {
          first: 250,
          after,
        }) as any
        
        console.log('📦 Products in this page:', response.products?.edges?.length || 0)
        
        if (response.products?.edges) {
          allProducts.push(...response.products.edges)
        }
        
        hasNextPage = response.products?.pageInfo?.hasNextPage || false
        after = response.products?.pageInfo?.endCursor
        
        if (hasNextPage) {
          console.log('⏳ Waiting 500ms before next request...')
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
      
      console.log('✅ Product sync completed:', allProducts.length, 'products')
      
      // Log the sync operation
      await db.log.create({
        data: {
          userId: user.id,
          type: 'sync',
          message: `Synchronized ${allProducts.length} products from Shopify`,
          metadata: {
            productsCount: allProducts.length,
            timestamp: new Date().toISOString(),
          },
        },
      })

      // Create an audit record for this sync
      console.log('📝 Creating audit record...')
      const audit = await db.audit.create({
        data: {
          userId: user.id,
          score: 0, // Will be calculated after field mapping
          totalProducts: allProducts.length,
          validProducts: 0, // Will be calculated after validation
          gaps: [], // Will be populated after field mapping and validation
        },
      })
      console.log('✅ Audit record created:', audit.id)

      return json({
        success: true,
        message: `Successfully synced ${allProducts.length} products`,
        data: {
          productsCount: allProducts.length,
          auditId: audit.id,
        },
      })
    }


    if (actionType === "generate-recommendations") {
      console.log('🤖 Generating AI recommendations for single product')
      
      const user = await db.user.findUnique({
        where: { shopId: session.shop },
      })

      if (!user) {
        return json({ success: false, error: "User not found" }, { status: 404 })
      }

      const productId = formData.get("productId") as string
      console.log('🎯 Product ID:', productId)
      
      const forceRegenerate = formData.get("forceRegenerate") === "true"
      
      // Check if we have existing recommendations for this product (unless forcing regeneration)
      if (!forceRegenerate) {
        const existingProduct = await db.product.findFirst({
          where: {
            userId: user.id,
            shopifyId: productId
          }
        })
        
        if (existingProduct?.recommendations) {
          const recData = existingProduct.recommendations as any
          console.log('📋 Returning existing recommendations for product:', productId)
          return json({
            success: true,
            recommendations: recData.recommendations || [],
            isExisting: true
          })
        }
      }
      
      // Load offline session
      const { sessionStorage } = await import("../shopify.server")
      const offlineSessionId = `offline_${session.shop}`
      const offlineSession = await sessionStorage.loadSession(offlineSessionId)
      
      if (!offlineSession?.accessToken) {
        return json({
          success: false,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 })
      }
      
      // Fetch the specific product
      const { ShopifySyncService } = await import("../utils/shopifySync")
      const { AIEnrichmentService } = await import("../utils/aiEnrich")
      
      const syncService = new ShopifySyncService(session.shop, offlineSession.accessToken)
      const allProducts = await syncService.syncProducts(user.id)
      const product = allProducts.find(p => p.id.includes(productId))
      
      if (!product) {
        return json({ success: false, error: "Product not found" }, { status: 404 })
      }
      
      // Get the product's gaps from the health score system
      const { mapShopifyToSpec, calculateProductScore } = await import("../utils/fieldMapper")
      const spec = mapShopifyToSpec(product)
      const scoreData = calculateProductScore(spec)
      const gaps = scoreData.gaps
      
      console.log('🎯 Product gaps identified:', gaps)
      
      // Generate AI recommendations for all identified gaps (gap-driven approach)
      const enrichmentService = new AIEnrichmentService()
      const result = await enrichmentService.enrichProduct(user.id, product, gaps)
      
      console.log('✅ Generated recommendations:', result.improvements.length)
      
      // Store recommendations in database with status tracking
      const recommendationData = {
        recommendations: result.improvements.map((rec: any) => ({
          ...rec,
          status: 'pending' // pending, approved, rejected, applied
        })),
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
      
      // Create or update product record with recommendations
      await db.product.upsert({
        where: {
          userId_shopifyId: {
            userId: user.id,
            shopifyId: productId
          }
        },
        create: {
          userId: user.id,
          shopifyId: productId,
          title: product.title,
          recommendations: recommendationData
        },
        update: {
          recommendations: recommendationData
        }
      })
      
      console.log('💾 Stored recommendations in database for product:', productId)
      
      return json({
        success: true,
        recommendations: recommendationData.recommendations,
        isExisting: false
      })
    }

    if (actionType === "apply-recommendations") {
      console.log('📝 Applying approved recommendations to Shopify')
      
      const user = await db.user.findUnique({
        where: { shopId: session.shop },
      })

      if (!user) {
        return json({ success: false, error: "User not found" }, { status: 404 })
      }

      const productId = formData.get("productId") as string
      const approvedRecommendationsJson = formData.get("approvedRecommendations") as string
      const approvedRecommendations = JSON.parse(approvedRecommendationsJson)
      
      console.log('🎯 Product ID:', productId)
      console.log('✅ Approved recommendations:', approvedRecommendations.length)
      console.log('📋 Approved recommendation fields:', approvedRecommendations.map((r: any) => r.field))
      
      // Validation: Ensure we only process approved recommendations
      if (!Array.isArray(approvedRecommendations) || approvedRecommendations.length === 0) {
        return json({
          success: false,
          error: "No approved recommendations provided"
        }, { status: 400 })
      }
      
      // Get current stored recommendations to update their status
      const productRecord = await db.product.findFirst({
        where: {
          userId: user.id,
          shopifyId: productId
        }
      })
      
      let updatedRecommendationData = null
      if (productRecord?.recommendations) {
        const recData = productRecord.recommendations as any
        // Update status of approved recommendations to 'applied'
        const approvedFields = approvedRecommendations.map((r: any) => r.field)
        updatedRecommendationData = {
          ...recData,
          recommendations: recData.recommendations.map((rec: any) => ({
            ...rec,
            status: approvedFields.includes(rec.field) ? 'applied' : rec.status
          })),
          lastUpdated: new Date().toISOString()
        }
      }
      
      // Load offline session
      const { sessionStorage } = await import("../shopify.server")
      const offlineSessionId = `offline_${session.shop}`
      const offlineSession = await sessionStorage.loadSession(offlineSessionId)
      
      if (!offlineSession?.accessToken) {
        return json({
          success: false,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 })
      }
      
      // Fetch the product and calculate initial score
      const { ShopifySyncService } = await import("../utils/shopifySync")
      const { mapShopifyToSpec, calculateProductScore } = await import("../utils/fieldMapper")
      
      const syncService = new ShopifySyncService(session.shop, offlineSession.accessToken)
      const allProducts = await syncService.syncProducts(user.id)
      const product = allProducts.find(p => p.id.includes(productId))
      
      if (!product) {
        return json({ success: false, error: "Product not found" }, { status: 404 })
      }
      
      // Calculate initial score for comparison
      const initialSpec = mapShopifyToSpec(product)
      const initialScore = calculateProductScore(initialSpec).score
      console.log('📊 Initial product score:', initialScore)
      
      // Apply approved changes to Shopify
      const { AIEnrichmentService } = await import("../utils/aiEnrich")
      const enrichmentService = new AIEnrichmentService()
      
      // Create a partial enrichment result with only approved improvements
      const partialResult = {
        originalProduct: product,
        enrichedSpec: {} as any,
        improvements: approvedRecommendations,
        totalUsage: 0,
        errors: [],
      }
      
      const success = await enrichmentService.applyEnrichmentToShopify(
        user.id,
        session.shop,
        offlineSession.accessToken,
        partialResult
      )
      
      console.log('✅ Applied changes to Shopify:', success)
      
      // Validate score improvement by re-fetching and recalculating
      let finalScore = initialScore
      if (success) {
        try {
          // Re-fetch the product to get updated data
          const updatedProducts = await syncService.syncProducts(user.id)
          const updatedProduct = updatedProducts.find(p => p.id.includes(productId))
          
          if (updatedProduct) {
            const updatedSpec = mapShopifyToSpec(updatedProduct)
            finalScore = calculateProductScore(updatedSpec).score
            console.log('📊 Final product score:', finalScore)
            console.log('📈 Score improvement:', finalScore - initialScore)
          }
        } catch (error) {
          console.warn('Could not validate score improvement:', error)
        }
      }
      
      // Update recommendation status in database
      if (updatedRecommendationData && productRecord) {
        await db.product.update({
          where: { id: productRecord.id },
          data: {
            recommendations: updatedRecommendationData
          }
        })
        console.log('💾 Updated recommendation status to applied in database')
      }
      
      // Log the operation
      await db.log.create({
        data: {
          userId: user.id,
          type: 'enrichment',
          message: `Applied ${approvedRecommendations.length} approved AI recommendations to product ${productId}`,
          metadata: {
            productId,
            approvedCount: approvedRecommendations.length,
            timestamp: new Date().toISOString(),
          },
        },
      })
      
      return json({
        success: true,
        appliedCount: approvedRecommendations.length,
        scoreImprovement: {
          initial: initialScore,
          final: finalScore,
          improvement: finalScore - initialScore
        }
      })
    }

    if (actionType === "save-customer-input") {
      console.log('💾 Saving customer input data')
      
      const user = await db.user.findUnique({
        where: { shopId: session.shop },
      })

      if (!user) {
        return json({ success: false, error: "User not found" }, { status: 404 })
      }

      const productId = formData.get("productId") as string
      const inputDataJson = formData.get("inputData") as string
      const inputData = JSON.parse(inputDataJson)
      
      console.log('🎯 Product ID:', productId)
      console.log('📝 Input data:', inputData)
      
      // Load offline session
      const { sessionStorage } = await import("../shopify.server")
      const offlineSessionId = `offline_${session.shop}`
      const offlineSession = await sessionStorage.loadSession(offlineSessionId)
      
      if (!offlineSession?.accessToken) {
        return json({
          success: false,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 })
      }
      
      // Apply customer input to Shopify metafields
      const { GraphQLClient } = await import('graphql-request')
      const graphqlClient = new GraphQLClient(
        `https://${session.shop}/admin/api/2025-10/graphql`,
        {
          headers: {
            'X-Shopify-Access-Token': offlineSession.accessToken,
            'Content-Type': 'application/json',
          },
        }
      )
      
      let appliedCount = 0
      const appliedFields: string[] = []
      
      // Process each input field
      for (const [field, value] of Object.entries(inputData)) {
        try {
          let metafieldValue = value as string
          let metafieldType = 'single_line_text_field'
          
          // Handle special field types
          if (field.startsWith('dimensions_')) {
            // Skip individual dimension components, we'll handle dimensions as a group
            continue
          } else if (field === 'specifications' || field === 'warranty' || field === 'return_policy') {
            metafieldType = 'multi_line_text_field'
          }
          
          const CREATE_METAFIELD_MUTATION = `
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
          
          const response = await graphqlClient.request(CREATE_METAFIELD_MUTATION, {
            metafields: [
              {
                ownerId: `gid://shopify/Product/${productId}`,
                namespace: 'catalogai',
                key: field,
                type: metafieldType,
                value: metafieldValue
              }
            ]
          }) as any
          
          if (!response.metafieldsSet.userErrors?.length) {
            appliedCount++
            appliedFields.push(field)
            console.log(`✅ Applied ${field}: ${metafieldValue}`)
          } else {
            console.error(`❌ Error applying ${field}:`, response.metafieldsSet.userErrors)
          }
        } catch (error) {
          console.error(`❌ Error applying ${field}:`, error)
        }
      }
      
      // Handle dimensions separately if provided
      const dimensionFields = ['dimensions_length', 'dimensions_width', 'dimensions_height']
      const dimensionData = dimensionFields.reduce((acc, key) => {
        if (inputData[key]) {
          const dimKey = key.replace('dimensions_', '')
          acc[dimKey] = inputData[key]
        }
        return acc
      }, {} as Record<string, string>)
      
      if (Object.keys(dimensionData).length > 0) {
        try {
          const CREATE_METAFIELD_MUTATION = `
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
          
          const response = await graphqlClient.request(CREATE_METAFIELD_MUTATION, {
            metafields: [
              {
                ownerId: `gid://shopify/Product/${productId}`,
                namespace: 'catalogai',
                key: 'dimensions',
                type: 'json',
                value: JSON.stringify(dimensionData)
              }
            ]
          }) as any
          
          if (!response.metafieldsSet.userErrors?.length) {
            appliedCount++
            appliedFields.push('dimensions')
            console.log(`✅ Applied dimensions:`, dimensionData)
          }
        } catch (error) {
          console.error('❌ Error applying dimensions:', error)
        }
      }
      
      // Log the operation
      await db.log.create({
        data: {
          userId: user.id,
          type: 'customer_input',
          message: `Applied ${appliedCount} customer input fields to product ${productId}`,
          metadata: {
            productId,
            appliedFields,
            appliedCount,
            timestamp: new Date().toISOString(),
          },
        },
      })
      
      return json({
        success: true,
        appliedCount,
        appliedFields,
        message: `Successfully saved ${appliedCount} fields to your product!`
      })
    }

    return json({ success: true })
  } catch (error) {
    console.error('❌ Error in index action:', error)
    
    // If it's a Response (OAuth redirect), re-throw it
    if (error instanceof Response) {
      console.log('🔄 Re-throwing OAuth redirect response')
      throw error
    }
    
    // Create user-friendly error message
    let userFriendlyError = 'Sync failed. Please try again.'
    
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        userFriendlyError = 'Authentication failed. Please reinstall the app.'
      } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        userFriendlyError = 'Insufficient permissions. Please check app permissions.'
      } else if (error.message.includes('429') || error.message.includes('rate limit')) {
        userFriendlyError = 'Rate limit exceeded. Please try again in a few minutes.'
      } else if (error.message.includes('GraphQL')) {
        userFriendlyError = 'API connection failed. Please try again.'
      }
    }
    
    // Log the error to database with user-friendly message
    try {
      const { session } = await authenticate.admin(request)
      const user = await db.user.findUnique({
        where: { shopId: session.shop },
      })
      
      if (user) {
        await db.log.create({
          data: {
            userId: user.id,
            type: 'error',
            message: userFriendlyError,
            error: error instanceof Error ? error.message : 'Unknown error',
            metadata: {
              timestamp: new Date().toISOString(),
              action: 'sync'
            }
          }
        })
      }
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }
    
    return json(
      {
        success: false,
        error: userFriendlyError,
      },
      { status: 500 }
    )
  }
}

interface LoaderData {
  shop: string
  products: Product[]
  totalProducts: number
  averageScore: number
  lastSync: string | null
  recentLogs: LogEntry[]
  user: User | null
}

export default function Index() {
  const loaderData = useLoaderData<LoaderData>()
  const { shop, totalProducts, averageScore, lastSync, recentLogs, user } = loaderData
  
  // Local state for products that can be updated
  const [products, setProducts] = useState<Product[]>(loaderData.products)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isHealthChecking, setIsHealthChecking] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [healthModalOpen, setHealthModalOpen] = useState(false)
  const [healthCheckJobId, setHealthCheckJobId] = useState<string | undefined>()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [approvalState, setApprovalState] = useState<Record<string, boolean>>({})
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false)
  const [isApplyingChanges, setIsApplyingChanges] = useState(false)
  const [justAppliedChanges, setJustAppliedChanges] = useState(false)
  
  // Customer input form state
  const [customerInputOpen, setCustomerInputOpen] = useState(false)
  const [customerInputData, setCustomerInputData] = useState<Record<string, string>>({})
  const [isSavingCustomerInput, setIsSavingCustomerInput] = useState(false)
  
  // Filter state for health dashboard
  const [showOnlyLowHealth, setShowOnlyLowHealth] = useState(false)
  const [showOnlyNoDescription, setShowOnlyNoDescription] = useState(false)
  
  const syncFetcher = useFetcher()
  const healthCheckFetcher = useFetcher()
  const recommendationFetcher = useFetcher()
  const customerInputFetcher = useFetcher()

  // Update local products state when loader data changes (e.g., after sync)
  useEffect(() => {
    setProducts(loaderData.products)
  }, [loaderData.products])

  const handleSync = () => {
    setIsSyncing(true)
    syncFetcher.submit(
      { action: "sync" },
      { method: "post" } // Same route action, no need to specify action path
    )
  }


  const handleHealthCheck = () => {
    setIsHealthChecking(true)
    healthCheckFetcher.submit(
      {},
      { method: "get", action: "/api/health-check" }
    )
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setProductModalOpen(true)
    setJustAppliedChanges(false)
    
    // Load existing recommendations if available
    if (product.recommendations?.recommendations) {
      console.log('📋 Loading existing recommendations for product:', product.id)
      const existingRecs = product.recommendations.recommendations
      setRecommendations(existingRecs)
      
      // Set approval state based on existing status
      const approvalState: Record<string, boolean> = {}
      existingRecs.forEach((rec: any) => {
        if (rec.status === 'approved' || rec.status === 'applied') {
          approvalState[rec.field] = true
        } else if (rec.status === 'rejected') {
          approvalState[rec.field] = false
        }
        // pending recommendations remain undefined in approvalState
      })
      setApprovalState(approvalState)
    } else {
    setRecommendations([])
    setApprovalState({})
    }
  }

  const handleGenerateRecommendations = () => {
    if (!selectedProduct) return
    
    setIsGeneratingRecommendations(true)
    setJustAppliedChanges(false) // Reset the applied changes flag
    recommendationFetcher.submit(
      { 
        action: "generate-recommendations",
        productId: selectedProduct.id,
        forceRegenerate: recommendations.length > 0 ? "true" : "false", // Force regenerate if called from regenerate button
      },
      { method: "post" }
    )
  }

  const handleToggleApproval = (fieldName: string, newState?: boolean) => {
    setApprovalState(prev => ({
      ...prev,
      [fieldName]: newState !== undefined ? newState : (prev[fieldName] === true ? false : prev[fieldName] === false ? undefined : true)
    }))
  }

  const handleApplyChanges = () => {
    if (!selectedProduct) return
    
    const approvedRecommendations = recommendations.filter(
      rec => approvalState[rec.field] === true
    )
    
    const rejectedRecommendations = recommendations.filter(
      rec => approvalState[rec.field] === false
    )
    
    const pendingRecommendations = recommendations.filter(
      rec => approvalState[rec.field] === undefined
    )
    
    console.log('📊 Approval Summary:', {
      total: recommendations.length,
      approved: approvedRecommendations.length,
      rejected: rejectedRecommendations.length,
      pending: pendingRecommendations.length,
      approvedFields: approvedRecommendations.map(r => r.field),
      rejectedFields: rejectedRecommendations.map(r => r.field)
    })
    
    if (approvedRecommendations.length === 0) {
      setToastMessage('Please approve at least one recommendation before applying changes')
      setToastActive(true)
      return
    }
    
    console.log('🚀 Starting apply changes...')
    console.log('📋 Approved recommendations to apply:', approvedRecommendations)
    
    setIsApplyingChanges(true)
    recommendationFetcher.submit(
      { 
        action: "apply-recommendations",
        productId: selectedProduct.id,
        approvedRecommendations: JSON.stringify(approvedRecommendations),
      },
      { method: "post" }
    )
  }

  // Handle sync completion
  if (syncFetcher.data && isSyncing) {
    const data = syncFetcher.data as any
    if (data.success) {
      setToastMessage(`Successfully synced ${data.data?.productsCount || 0} products`)
      setToastActive(true)
    } else {
      setToastMessage(`Sync failed: ${data.error}`)
      setToastActive(true)
    }
    setIsSyncing(false)
  }


  // Handle health check completion
  if (healthCheckFetcher.data && isHealthChecking) {
    const data = healthCheckFetcher.data as any
    if (data.success) {
      setHealthCheckJobId(data.jobId)
      setHealthModalOpen(true)
      setToastMessage(`Health scan initiated - analyzing ${data.currentScore}% current score`)
      setToastActive(true)
    } else {
      setToastMessage(`Health check failed: ${data.error}`)
      setToastActive(true)
    }
    setIsHealthChecking(false)
  }

  // Handle recommendation generation completion
  if (recommendationFetcher.data && isGeneratingRecommendations) {
    const data = recommendationFetcher.data as any
    if (data.success && data.recommendations) {
      setRecommendations(data.recommendations)
      
      if (data.isExisting) {
        setToastMessage(`Loaded existing ${data.recommendations.length} AI recommendations`)
      } else {
        setToastMessage(`Generated ${data.recommendations.length} new AI recommendations`)
      }
      setToastActive(true)
      
      // Update approval state based on stored status
      if (data.isExisting) {
        const approvalState: Record<string, boolean> = {}
        data.recommendations.forEach((rec: any) => {
          if (rec.status === 'approved' || rec.status === 'applied') {
            approvalState[rec.field] = true
          } else if (rec.status === 'rejected') {
            approvalState[rec.field] = false
          }
        })
        setApprovalState(approvalState)
      }
    } else if (data.error) {
      setToastMessage(`Failed to generate recommendations: ${data.error}`)
      setToastActive(true)
    }
    setIsGeneratingRecommendations(false)
  }

  // Handle apply changes completion
  if (recommendationFetcher.data && isApplyingChanges) {
    const data = recommendationFetcher.data as any
    console.log('🔍 Apply changes response:', data)
    console.log('🔍 Response type:', typeof data)
    console.log('🔍 Response keys:', Object.keys(data))
    
    if (data.success && selectedProduct) {
      // Get the applied field names for personalized celebrations
      const appliedFields = recommendations
        .filter(rec => approvalState[rec.field] === true)
        .map(rec => rec.field)
      
      // Field-specific celebration messages
      const getFieldCelebration = (field: string): string => {
        const celebrations: Record<string, string> = {
          keywords: "🎯 Awesome! Keywords added - your product is now more discoverable!",
          description: "📝 Great work! Enhanced description will help customers understand your product better!",
          features: "✨ Fantastic! Feature list added - customers can see what makes your product special!",
          use_cases: "💡 Perfect! Use cases added - customers now know how to use your product!",
          target_audience: "👥 Excellent! Target audience defined - your marketing just got more focused!",
          material: "🔬 Nice! Material info added - customers can make informed decisions!",
          dimensions: "📏 Great! Dimensions added - no more size surprises for customers!",
          weight: "⚖️ Perfect! Weight information helps with shipping expectations!",
          color: "🎨 Colorful! Color info added - visual buyers will love this!",
          brand: "🏷️ Brand power! Brand info strengthens customer trust!",
          warranty: "🛡️ Security boost! Warranty info builds customer confidence!",
          sku: "📦 Organized! SKU added for better inventory management!",
          tags: "🏷️ Tagged! Product categorization just got better!",
          ai_search_queries: "🤖 AI-ready! Search queries optimized for AI discovery!",
          semantic_description: "🧠 Smart! AI-optimized description for better search matching!"
        }
        return celebrations[field] || `✅ ${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')} updated!`
      }

      // Create celebration message based on applied fields
      let message = ''
      if (appliedFields.length === 1) {
        message = getFieldCelebration(appliedFields[0])
      } else if (appliedFields.length === 2) {
        message = `🎉 Double win! Updated ${appliedFields.map(f => f.replace(/_/g, ' ')).join(' and ')}!`
      } else if (appliedFields.length >= 3) {
        message = `🚀 Amazing progress! Applied ${appliedFields.length} improvements - you're on fire!`
      }
      
      // Get the final score from response or calculate improvement
      let finalScore = selectedProduct.score
      let pointsEarned = 0
      
      if (data.scoreImprovement) {
        finalScore = data.scoreImprovement.final
        const improvement = data.scoreImprovement.improvement
        pointsEarned = appliedFields.length * 15 // Estimate points based on fields
        
        if (improvement > 0) {
          message += ` 📈 Score: ${data.scoreImprovement.initial}% → ${data.scoreImprovement.final}% (+${improvement.toFixed(0)}%) | +${pointsEarned} points!`
        } else {
          message += ` 📊 Score: ${data.scoreImprovement.final}%`
        }
      }
      
      // Update gaps by removing applied fields
      const updatedGaps = selectedProduct.gaps.filter(gap => !appliedFields.includes(gap))
      
      // Update selected product with new score and gaps
      const updatedSelectedProduct = {
        ...selectedProduct,
        score: finalScore,
        gaps: updatedGaps
      }
      
      // Update products array with new score and gaps
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id 
          ? updatedSelectedProduct
          : p
      ))
      
      // Update selected product state
      setSelectedProduct(updatedSelectedProduct)
      
      // Clear recommendations and approval state for next use
      setRecommendations([])
      setApprovalState({})
      setJustAppliedChanges(true)
      
      // Safety check: ensure message is user-friendly
      const safeMessage = typeof message === 'string' && message.length > 0 && !message.match(/^\d{3}$/) 
        ? message 
        : 'Changes applied successfully!'
      
      setToastMessage(safeMessage)
      setToastActive(true)
      
      // Keep modal open to show the updated score - don't close or reload!
      
    } else if (data.error) {
      setToastMessage(`Failed to apply changes: ${data.error}`)
      setToastActive(true)
    } else {
      // Handle unexpected response format
      console.error('🚨 Unexpected response format:', data)
      setToastMessage(`Unexpected response: ${JSON.stringify(data)}`)
      setToastActive(true)
    }
    setIsApplyingChanges(false)
  }

  // Handle customer input save completion
  if (customerInputFetcher.data && isSavingCustomerInput) {
    const data = customerInputFetcher.data as any
    console.log('🔍 Customer input save response:', data)
    
    if (data.success && selectedProduct) {
      const appliedFields = data.appliedFields || []
      const appliedCount = data.appliedCount || 0
      
      // Create celebration message
      let message = ''
      if (appliedCount === 1) {
        const fieldName = appliedFields[0]?.replace(/_/g, ' ')
        message = `🎉 Great! ${fieldName} added to your product specs!`
      } else if (appliedCount > 1) {
        message = `🚀 Excellent! Added ${appliedCount} product specifications!`
      }
      
      // Estimate score improvement (customer input fields typically worth 3-5% each)
      const estimatedImprovement = appliedCount * 4
      message += ` 📈 Health score boost: ~+${estimatedImprovement}% | +${appliedCount * 15} points!`
      
      // Update selected product to remove applied fields from gaps
      const updatedGaps = selectedProduct.gaps.filter(gap => !appliedFields.includes(gap))
      const updatedScore = Math.min(100, selectedProduct.score + estimatedImprovement)
      
      const updatedSelectedProduct = {
        ...selectedProduct,
        score: updatedScore,
        gaps: updatedGaps
      }
      
      // Update products array
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id 
          ? updatedSelectedProduct
          : p
      ))
      
      // Update selected product state
      setSelectedProduct(updatedSelectedProduct)
      
      // Clear customer input form
      setCustomerInputData({})
      setCustomerInputOpen(false)
      setJustAppliedChanges(true)
      
      setToastMessage(message)
      setToastActive(true)
    } else if (data.error) {
      setToastMessage(`Failed to save: ${data.error}`)
      setToastActive(true)
    }
    setIsSavingCustomerInput(false)
  }

  // Helper functions for customer input forms
  const getFieldPlaceholder = (field: string): string => {
    const placeholders: Record<string, string> = {
      material: 'e.g., Cotton, Polyester, Steel, Wood',
      weight: 'e.g., 2.5 lbs, 1.2 kg',
      color: 'e.g., Navy Blue, Black, Red',
      size: 'e.g., Large, XL, 12x8x4',
      brand: 'e.g., Your Brand Name',
      model: 'e.g., Model ABC-123',
      upc: 'e.g., 123456789012',
      vendor: 'e.g., Supplier Company',
      age_range: 'e.g., 18-65, Adults, 3+',
      compatibility: 'e.g., iPhone 12, Samsung Galaxy',
      warranty: 'e.g., 1 year limited warranty',
      return_policy: 'e.g., 30-day returns accepted',
      shipping_info: 'e.g., Free shipping over $50',
      specifications: 'e.g., Power: 110V, Material: ABS Plastic',
      documentation_url: 'e.g., https://yoursite.com/manual.pdf',
      video_urls: 'e.g., https://youtube.com/watch?v=abc123'
    }
    return placeholders[field] || `Enter ${field.replace(/_/g, ' ')}`
  }

  const getFieldHelpText = (field: string): string => {
    const helpTexts: Record<string, string> = {
      material: 'Primary material or fabric composition',
      weight: 'Product weight with unit (lbs, kg, oz)',
      color: 'Primary color or color options',
      brand: 'Manufacturer or brand name',
      warranty: 'Warranty terms and duration',
      upc: 'Universal Product Code for inventory',
      specifications: 'Technical specs, one per line'
    }
    return helpTexts[field] || ''
  }

  const getFieldPoints = (field: string): number => {
    const fieldCategories = {
      required: 25,
      high: 20, 
      medium: 15,
      low: 10
    }
    
    const highFields = ['material', 'dimensions', 'weight', 'brand']
    const mediumFields = ['color', 'size', 'upc', 'compatibility', 'age_range', 'gender']
    
    if (highFields.includes(field)) return fieldCategories.high
    if (mediumFields.includes(field)) return fieldCategories.medium
    return fieldCategories.low
  }

  const getFieldImpact = (field: string): string => {
    const highFields = ['material', 'dimensions', 'weight', 'brand']
    const mediumFields = ['color', 'size', 'upc', 'compatibility', 'age_range', 'gender']
    
    if (highFields.includes(field)) return '4-5'
    if (mediumFields.includes(field)) return '3-4'
    return '2-3'
  }

  const handleSaveCustomerInput = () => {
    if (!selectedProduct) return
    
    // Validate and filter data
    const validationErrors: string[] = []
    const filledData: Record<string, string> = {}
    
    Object.entries(customerInputData).forEach(([field, value]) => {
      const trimmedValue = value.trim()
      if (!trimmedValue) return
      
      // Basic field validation
      if (field === 'upc' && trimmedValue.length < 8) {
        validationErrors.push('UPC must be at least 8 digits')
      } else if (field === 'weight' && !/\d+(\.\d+)?\s*(lbs?|kgs?|oz|pounds?|kilograms?|ounces?)/i.test(trimmedValue)) {
        validationErrors.push('Weight must include unit (e.g., "2.5 lbs", "1.2 kg")')
      } else if ((field === 'documentation_url' || field === 'video_urls') && trimmedValue && !trimmedValue.startsWith('http')) {
        validationErrors.push(`${field.replace(/_/g, ' ')} must be a valid URL starting with http`)
      } else if (field === 'age_range' && trimmedValue && !/\d+/.test(trimmedValue)) {
        validationErrors.push('Age range must contain numbers (e.g., "18+", "3-12")')
      } else {
        filledData[field] = trimmedValue
      }
    })
    
    if (validationErrors.length > 0) {
      setToastMessage(`Validation errors: ${validationErrors.join(', ')}`)
      setToastActive(true)
      return
    }
    
    if (Object.keys(filledData).length === 0) {
      setToastMessage('Please fill in at least one field before saving')
      setToastActive(true)
      return
    }
    
    setIsSavingCustomerInput(true)
    customerInputFetcher.submit(
      {
        action: 'save-customer-input',
        productId: selectedProduct.id,
        inputData: JSON.stringify(filledData)
      },
      { method: 'post' }
    )
  }

  // Filter products based on current filter state
  const filteredProducts = products.filter((product) => {
    if (showOnlyLowHealth && product.score >= 70) return false
    if (showOnlyNoDescription && (product.description && product.description !== "No description")) return false
    return true
  })

  const rows = products.map((product) => [
    product.id,
    product.title,
    product.description.length > 50 
      ? `${product.description.substring(0, 50)}...` 
      : product.description,
    `${product.score}%`,
    product.gaps.length > 0 ? product.gaps.join(", ") : "None",
  ])

  return (
    <Page title="CatalogAI Optimizer Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack>
              <InlineStack align="space-between">
                <BlockStack>
                  <Text variant="headingMd" as="h2">
                    {shop}
                  </Text>
                  <Text variant="bodyMd" tone="subdued" as="p">
                    {averageScore < 50 ? `Low density? Quick scan fixes ${products.filter(p => p.gaps.length > 0).length} gaps.` : 
                     averageScore < 90 ? `Your catalog needs attention. ${products.filter(p => p.gaps.length > 0).length} products have gaps.` :
                     `Great job! Your catalog is healthy.`}
                  </Text>
                </BlockStack>
                <BlockStack align="center">
                  <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke={averageScore >= 90 ? '#10b981' : averageScore >= 50 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeDasharray={`${(averageScore / 100) * 220} 220`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: averageScore >= 90 ? '#10b981' : averageScore >= 50 ? '#f59e0b' : '#ef4444'
                    }}>
                      {averageScore}%
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    size="slim"
                    onClick={() => {
                      // Trigger health scan
                      console.log('Running health scan...')
                    }}
                  >
                    Run Now
                  </Button>
                </BlockStack>
              </InlineStack>
              <InlineStack gap="400" align="start">
                <Box>
                  <Text variant="bodyMd" tone="subdued" as="p">Total Products</Text>
                  <Text variant="headingMd" as="p">{totalProducts}</Text>
                </Box>
                {lastSync && (
                  <Box>
                    <Text variant="bodyMd" tone="subdued" as="p">Last Sync</Text>
                    <Text variant="bodyMd" as="p">{new Date(lastSync).toLocaleString()}</Text>
                  </Box>
                )}
                {user && (
                  <>
                    <Box>
                      <Text variant="bodyMd" tone="subdued" as="p">Tier</Text>
                      <Text variant="bodyMd" as="p">{user.tier}</Text>
                    </Box>
                    <Box>
                      <Text variant="bodyMd" tone="subdued" as="p">AI Usage</Text>
                      <Text variant="bodyMd" as="p">{user.aiUsage} tokens</Text>
                    </Box>
                  </>
                )}
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack spacing="loose">
              <InlineStack distribution="equalSpacing" alignment="center">
                <BlockStack spacing="tight">
                  <Text variant="headingLg" as="h2">
                    📊 Product Catalog Health
                </Text>
                  <Text variant="bodyMd" tone="subdued">
                    Monitor and improve your product data quality
                  </Text>
                </BlockStack>
                <InlineStack spacing="tight">
                  <Button 
                    onClick={handleSync}
                    loading={isSyncing}
                    variant="primary"
                    size="large"
                  >
                    {isSyncing ? "Syncing..." : "🔄 Sync Products"}
                  </Button>
                </InlineStack>
              </InlineStack>
              
              {/* Health Overview Cards */}
              <InlineStack spacing="loose">
                <InlineStack distribution="equalSpacing">
                  <Card sectioned>
                    <BlockStack spacing="tight">
                      <Text variant="bodyMd" tone="subdued">Overall Health</Text>
                      <InlineStack alignment="center" spacing="tight">
                        <Badge 
                          tone={averageScore >= 90 ? 'success' : averageScore >= 70 ? 'warning' : 'critical'}
                          size="large"
                        >
                          {`${averageScore}%`}
                        </Badge>
                        <ProgressBar progress={averageScore} size="small" />
                      </InlineStack>
                    </BlockStack>
                  </Card>
                  
                  <Card sectioned>
                    <BlockStack spacing="tight">
                      <Text variant="bodyMd" tone="subdued">Products Needing Attention</Text>
                      <Text variant="headingLg" as="p" tone={products.filter(p => p.score < 70).length > 0 ? 'critical' : 'success'}>
                        {products.filter(p => p.score < 70).length}
                      </Text>
                      <Text variant="bodySm" tone="subdued">
                        {products.filter(p => p.score < 70).length > 0 
                          ? `${Math.round((products.filter(p => p.score < 70).length / products.length) * 100)}% of catalog`
                          : 'All products healthy! 🎉'
                        }
                      </Text>
                    </BlockStack>
                  </Card>

                  <Card sectioned>
                    <BlockStack spacing="tight">
                      <Text variant="bodyMd" tone="subdued">Common Issues</Text>
                      <BlockStack spacing="extraTight">
                        {(() => {
                          const gapCounts = products.reduce((acc, product) => {
                            product.gaps.forEach(gap => {
                              acc[gap] = (acc[gap] || 0) + 1
                            })
                            return acc
                          }, {} as Record<string, number>)
                          
                          const topGaps = Object.entries(gapCounts)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                            .map(([gap, count]) => (
                              <Text key={gap} variant="bodySm">
                                {gap}: {count} products
                              </Text>
                            ))
                          
                          return topGaps.length > 0 ? topGaps : <Text variant="bodySm" tone="success">No common issues found!</Text>
                        })()}
                      </BlockStack>
                    </BlockStack>
                  </Card>
                </InlineStack>
              </InlineStack>

              {/* Filter and Search */}
              <Card sectioned>
                <InlineStack distribution="equalSpacing" alignment="center">
                  <InlineStack spacing="tight" alignment="center">
                    <Text variant="bodyMd" tone="subdued">Filter by:</Text>
                    <Button 
                      variant={showOnlyLowHealth ? 'primary' : 'tertiary'}
                      size="slim"
                      onClick={() => setShowOnlyLowHealth(!showOnlyLowHealth)}
                    >
                      🚨 Low Health Only
                    </Button>
                    <Button 
                      variant={showOnlyNoDescription ? 'primary' : 'tertiary'}
                      size="slim"
                      onClick={() => setShowOnlyNoDescription(!showOnlyNoDescription)}
                    >
                      📝 Missing Descriptions
                    </Button>
                  </InlineStack>
                  <Text variant="bodySm" tone="subdued">
                    Showing {filteredProducts.length} of {products.length} products
                  </Text>
                </InlineStack>
              </Card>

              {/* Enhanced Product List */}
              <div 
                className="product-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '20px',
                  marginTop: '20px',
                  width: '100%'
                }}
              >
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    sectioned 
                    className="product-card"
                    style={{
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <InlineStack distribution="equalSpacing" alignment="start">
                      <InlineStack spacing="loose" alignment="start">
                        <BlockStack spacing="tight">
                          <Button 
                            variant="plain"
                            onClick={() => handleProductClick(product)}
                    style={{ 
                              textAlign: 'left',
                      padding: 0,
                              height: 'auto',
                              fontWeight: 600
                            }}
                          >
                            <Text variant="headingSm" as="p">
                              {product.title}
                            </Text>
                          </Button>
                          <Text variant="bodySm" tone="subdued">
                            ID: {product.id}
                          </Text>
                        </BlockStack>

                        <BlockStack spacing="extraTight">
                          <Text variant="bodyMd" as="p">
                            {product.description && product.description !== "No description" 
                              ? (product.description.length > 100 
                                  ? `${product.description.substring(0, 100)}...` 
                                  : product.description)
                              : <Text tone="subdued" variant="bodyMd">No description available</Text>
                            }
                          </Text>
                          {product.gaps.length > 0 && (
                            <InlineStack spacing="extraTight" wrap>
                              {product.gaps.slice(0, 3).map((gap, gapIndex) => (
                                <Badge key={gapIndex} tone="attention" size="small">
                                  {gap}
                                </Badge>
                              ))}
                              {product.gaps.length > 3 && (
                                <Badge tone="subdued" size="small">
                                  +{product.gaps.length - 3} more
                                </Badge>
                              )}
                            </InlineStack>
                          )}
                        </BlockStack>
                      </InlineStack>

                      <BlockStack spacing="tight" alignment="trailing">
                        <InlineStack spacing="tight" alignment="center">
                          <ProgressBar 
                            progress={product.score} 
                            size="small"
                            color={product.score >= 90 ? 'success' : product.score >= 70 ? 'warning' : 'critical'}
                          />
                          <Badge 
                            tone={product.score >= 90 ? 'success' : product.score >= 70 ? 'warning' : 'critical'}
                            size="small"
                          >
                            {product.score}%
                          </Badge>
                        </InlineStack>
                        
                        <Button 
                          size="slim"
                          variant="primary"
                          onClick={() => handleProductClick(product)}
                        >
                          🔧 Optimize
                        </Button>
                      </BlockStack>
                    </InlineStack>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <Card sectioned>
                  <BlockStack spacing="loose" alignment="center">
                    <Text variant="headingMd" as="p">🎉 No products match your filters!</Text>
                    <Text variant="bodyMd" tone="subdued" alignment="center">
                      {showOnlyLowHealth 
                        ? "All your products are healthy! Great job maintaining your catalog."
                        : showOnlyNoDescription 
                        ? "All your products have descriptions! Your catalog is well-documented."
                        : "No products found matching your current filters."
                      }
              </Text>
                    <Button 
                      variant="tertiary"
                      onClick={() => {
                        setShowOnlyLowHealth(false)
                        setShowOnlyNoDescription(false)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </BlockStack>
                </Card>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack>
              <Text variant="headingMd" as="h3">
                Quick Actions
              </Text>
              <BlockStack spacing="tight">
                <Button 
                  fullWidth 
                  onClick={handleHealthCheck}
                  loading={isHealthChecking}
                  variant={averageScore < 90 ? "primary" : "secondary"}
                >
                  {averageScore < 90 ? "Quick Scan Now" : "Run Health Check"}
                </Button>
                <Button fullWidth>Generate Feed</Button>
                <Button fullWidth>View Analytics</Button>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
        
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack>
              <Text variant="headingMd" as="h3">
                Recent Activity
              </Text>
              <BlockStack spacing="tight">
                {recentLogs.length > 0 ? (
                  recentLogs.map((log: LogEntry) => (
                    <BlockStack key={log.id} spacing="tight" alignment="leading">
                      <Text as="span">
                        {log.type === 'sync' && '🔄 '}
                        {log.type === 'push' && '📤 '}
                        {log.type === 'error' && '❌ '}
                        {log.type === 'health_scan' && '🔍 '}
                        {log.type === 'auto_fix' && '🔧 '}
                        {log.type === 'ai_enrichment' && '🤖 '}
                        {log.type === 'settings_update' && '⚙️ '}
                        {log.message}
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        {new Date(log.createdAt).toLocaleString()}
                      </Text>
                    </BlockStack>
                  ))
                ) : (
                  <Text as="p" tone="subdued">No recent activity</Text>
                )}
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
      
      {toastActive && (
        <Toast 
          content={toastMessage}
          onDismiss={() => setToastActive(false)}
        />
      )}

      <HealthCheckModal
        isOpen={healthModalOpen}
        onClose={() => setHealthModalOpen(false)}
        jobId={healthCheckJobId}
        currentScore={averageScore}
        currentGaps={[]} // Will be populated from latest audit
      />

      {/* Enhanced Product Detail Modal */}
      <Modal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        title=""
        size="large"
        primaryAction={{
          content: 'Close',
          onAction: () => setProductModalOpen(false),
        }}
      >
          {selectedProduct && (
          <Modal.Section>
            <BlockStack spacing="loose">
              {/* Modern Product Header */}
              <Card sectioned>
                <BlockStack spacing="loose">
                  <InlineStack distribution="equalSpacing" alignment="start">
                <BlockStack spacing="tight">
                      <Text variant="headingLg" as="h2">
                        📦 {selectedProduct.title}
                      </Text>
                      <Text variant="bodyMd" tone="subdued">
                        Product ID: {selectedProduct.id}
                      </Text>
                      {selectedProduct.description && selectedProduct.description !== "No description" && (
                        <Text variant="bodyMd" as="p">
                          {selectedProduct.description}
                        </Text>
                      )}
                  </BlockStack>

                    <BlockStack spacing="tight" alignment="trailing">
                    <Badge 
                        tone={selectedProduct.score >= 90 ? 'success' : selectedProduct.score >= 70 ? 'warning' : 'critical'}
                      size="large"
                    >
                        {selectedProduct.score}% Health
                    </Badge>
                    {justAppliedChanges && (
                        <Badge tone="success" size="small">
                        ✨ Just Updated!
                        </Badge>
                    )}
                        </BlockStack>
                        </InlineStack>

                  {/* Visual Health Progress */}
                      <Box>
                    <InlineStack distribution="equalSpacing" alignment="center">
                      <Text variant="bodyMd" tone="subdued">Overall Health Progress</Text>
                      <Text variant="bodyMd" tone="subdued">
                        {Math.round((selectedProduct.score / 100) * 500)} / 500 points
                          </Text>
                      </InlineStack>
                    <Box paddingBlockStart="200">
                      <ProgressBar 
                        progress={selectedProduct.score} 
                        size="large"
                        color={selectedProduct.score >= 90 ? 'success' : selectedProduct.score >= 70 ? 'warning' : 'critical'}
                      />
                        </Box>
                      </Box>
                    </BlockStack>
              </Card>

              {/* Smart Category Breakdown */}
              <Card sectioned>
                <BlockStack spacing="loose">
                  <Text variant="headingMd" as="h3">
                    📊 Category Breakdown
                  </Text>
                  
                  <InlineStack spacing="loose">
                    {[
                      { 
                        name: '🚨 Required Fields', 
                        icon: '🚨',
                        fields: ['title', 'description', 'price', 'availability', 'category'],
                        color: 'critical',
                        description: 'Essential for product visibility'
                      },
                      { 
                        name: '⚡ High Priority', 
                        icon: '⚡',
                        fields: ['material', 'dimensions', 'weight', 'brand', 'use_cases', 'features', 'image_urls'],
                        color: 'warning',
                        description: 'Important for customer decisions'
                      },
                      { 
                        name: '📋 Medium Priority', 
                        icon: '📋',
                        fields: ['color', 'size', 'target_audience', 'keywords', 'upc', 'compatibility', 'age_range', 'gender', 'video_urls'],
                        color: 'attention',
                        description: 'Enhances product discovery'
                      },
                      { 
                        name: '✨ Enhancement', 
                        icon: '✨',
                        fields: ['model', 'sku', 'tags', 'vendor', 'warranty', 'return_policy', 'shipping_info', 'documentation_url', 'specifications', 'ai_search_queries', 'semantic_description'],
                        color: 'success',
                        description: 'Optimizes for AI search'
                      }
                      ].map((category, index) => {
                      const missingInCategory = selectedProduct.gaps.filter(gap => category.fields.includes(gap)).length
                      const completedInCategory = category.fields.length - missingInCategory
                      const progress = Math.round((completedInCategory / category.fields.length) * 100)
                      
                        return (
                        <Card key={index} sectioned>
                          <InlineStack distribution="equalSpacing" alignment="start">
                            <InlineStack spacing="tight" alignment="start">
                              <Text variant="headingSm" as="h4">
                                {category.icon} {category.name}
                              </Text>
                              <Text variant="bodySm" tone="subdued">
                                {category.description}
                              </Text>
                              <InlineStack spacing="extraTight" wrap>
                                <Text variant="bodySm">
                                  {completedInCategory}/{category.fields.length} complete
                                </Text>
                                {missingInCategory > 0 && (
                                  <Badge tone={category.color} size="small">
                                    {missingInCategory} missing
                                  </Badge>
                                )}
                            </InlineStack>
                            </InlineStack>
                            
                            <BlockStack spacing="tight" alignment="trailing">
                              <ProgressBar 
                                progress={progress} 
                                size="small"
                                color={progress === 100 ? 'success' : progress >= 70 ? 'warning' : 'critical'}
                              />
                              <Text variant="bodySm" tone="subdued">
                                {progress}% complete
                              </Text>
                            </BlockStack>
                          </InlineStack>
                        </Card>
                      )
                    })}
                  </InlineStack>
                </BlockStack>
              </Card>

              {/* Smart Gaps Analysis */}
              <Card sectioned>
                <BlockStack spacing="loose">
                  <InlineStack distribution="equalSpacing" alignment="center">
                    <Text variant="headingMd" as="h3">
                      🔍 Missing Fields Analysis
                    </Text>
                    {selectedProduct.gaps.length === 0 ? (
                      <Badge tone="success" size="large">
                        🎉 Perfect Score!
                      </Badge>
                    ) : (
                      <Badge tone="critical" size="large">
                        {selectedProduct.gaps.length} fields missing
                      </Badge>
                    )}
                  </InlineStack>

                  {selectedProduct.gaps.length > 0 ? (
                  <BlockStack spacing="tight">
                      <Text variant="bodyMd" tone="subdued">
                        These fields are missing and could improve your product's visibility and AI search performance:
                      </Text>
                      <InlineStack spacing="extraTight" wrap>
                        {selectedProduct.gaps.map((gap, index) => (
                          <Badge key={index} tone="attention" size="small">
                            {gap.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                  </InlineStack>
                    </BlockStack>
                  ) : (
                    <BlockStack spacing="tight" alignment="center">
                      <Text variant="bodyMd" tone="success">
                        🎉 Congratulations! Your product has all the essential fields completed.
                      </Text>
                      <Text variant="bodySm" tone="subdued">
                        This product is optimized for search engines and AI-powered discovery.
                      </Text>
                    </BlockStack>
                  )}
                </BlockStack>
              </Card>

              {/* AI Recommendations Section */}
              {selectedProduct.gaps.length > 0 && (
                <Card sectioned>
                  <BlockStack spacing="loose">
                    <InlineStack distribution="equalSpacing" alignment="center">
                      <Text variant="headingMd" as="h3">
                        🤖 AI Recommendations
                    </Text>
                      {recommendations.length > 0 && (
                      <Button 
                        onClick={() => {
                          setRecommendations([])
                          setApprovalState({})
                          handleGenerateRecommendations()
                        }}
                        variant="secondary"
                        size="slim"
                        loading={isGeneratingRecommendations}
                      >
                          🔄 Regenerate
                      </Button>
                      )}
                    </InlineStack>

                    {recommendations.length === 0 ? (
                      <BlockStack spacing="loose" alignment="center">
                        <BlockStack spacing="tight" alignment="center">
                          <Text variant="bodyMd" tone="subdued">
                            🎯 Ready to improve your product's health score?
                          </Text>
                          <Text variant="bodySm" tone="subdued">
                            Our AI will analyze your missing fields and suggest improvements for:
                          </Text>
                          <InlineStack spacing="extraTight" wrap>
                            {selectedProduct.gaps.slice(0, 5).map((gap, index) => (
                              <Badge key={index} tone="attention" size="small">
                                {gap.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                            {selectedProduct.gaps.length > 5 && (
                              <Badge tone="subdued" size="small">
                                +{selectedProduct.gaps.length - 5} more
                              </Badge>
                            )}
                          </InlineStack>
                        </BlockStack>
                        
                        <Button 
                          onClick={handleGenerateRecommendations}
                          variant="primary"
                          size="large"
                          loading={isGeneratingRecommendations}
                        >
                          {isGeneratingRecommendations ? '🤖 Generating...' : '🚀 Generate AI Recommendations'}
                        </Button>
                      </BlockStack>
                    ) : (
                      <BlockStack spacing="tight">
                    {selectedProduct.recommendations?.generatedAt && (
                          <Text variant="bodySm" tone="subdued">
                        Generated: {new Date(selectedProduct.recommendations.generatedAt).toLocaleString()}
                      </Text>
                    )}
                        
                        <Text variant="bodyMd" tone="subdued">
                          Review and approve the AI-generated suggestions below. Only approved changes will be applied to your product.
                        </Text>
                      </BlockStack>
                    )}
                  </BlockStack>
                </Card>
              )}

              {/* Recommendations Approval Interface */}
              {recommendations.length > 0 && (
                <Card sectioned>
                  <BlockStack spacing="loose">
                    <InlineStack distribution="equalSpacing" alignment="center">
                      <Text variant="headingMd" as="h3">
                        ✏️ Review & Approve Recommendations
                    </Text>
                      <InlineStack spacing="tight">
                        <Badge tone="success" size="small">
                          {Object.values(approvalState).filter(Boolean).length} approved
                        </Badge>
                        <Badge tone="critical" size="small">
                          {Object.values(approvalState).filter(val => val === false).length} rejected
                        </Badge>
                      </InlineStack>
                    </InlineStack>

                    <Text variant="bodyMd" tone="subdued">
                      Review each AI suggestion below. Use ✅ to approve or ❌ to reject. Only approved changes will be applied to your product.
                    </Text>
                    
                    {/* Smart Bulk Actions */}
                    <Card sectioned>
                      <InlineStack distribution="equalSpacing" alignment="center">
                        <Text variant="bodyMd" tone="subdued">Quick Actions:</Text>
                        <InlineStack spacing="tight">
                      <Button 
                        size="slim" 
                        variant="secondary" 
                        tone="success"
                        onClick={() => {
                          const allApproved = recommendations.reduce((acc, rec) => ({
                            ...acc,
                            [rec.field]: true
                          }), {})
                          setApprovalState(allApproved)
                        }}
                      >
                        ✅ Approve All
                      </Button>
                      <Button 
                        size="slim" 
                        variant="secondary" 
                        tone="critical"
                        onClick={() => {
                          const allRejected = recommendations.reduce((acc, rec) => ({
                            ...acc,
                            [rec.field]: false
                          }), {})
                          setApprovalState(allRejected)
                        }}
                      >
                        ❌ Reject All
                      </Button>
                      <Button 
                        size="slim" 
                        variant="secondary"
                        onClick={() => setApprovalState({})}
                      >
                        Clear All
                      </Button>
                        </InlineStack>
                      </InlineStack>
                    </Card>
                    
                    {/* Individual Recommendation Cards */}
                    <BlockStack spacing="tight">
                    {recommendations.map((rec, index) => {
                      const isApproved = approvalState[rec.field] === true
                      const isRejected = approvalState[rec.field] === false
                      const isPending = approvalState[rec.field] === undefined
                      const isApplied = rec.status === 'applied'
                      
                      // Enhanced field progress info
                      const getFieldInfo = (field: string) => {
                        const fieldCategories = {
                            required: { fields: ['title', 'description', 'price', 'availability', 'category'], points: '25', impact: '5-6%', color: 'critical', icon: '🚨' },
                            high: { fields: ['material', 'dimensions', 'weight', 'brand', 'use_cases', 'features', 'image_urls'], points: '20', impact: '4-5%', color: 'warning', icon: '⚡' },
                            medium: { fields: ['color', 'size', 'target_audience', 'keywords', 'upc', 'compatibility', 'age_range', 'gender', 'video_urls'], points: '15', impact: '3-4%', color: 'attention', icon: '📋' },
                            low: { fields: ['model', 'sku', 'tags', 'vendor', 'warranty', 'return_policy', 'shipping_info', 'documentation_url', 'specifications', 'ai_search_queries', 'semantic_description'], points: '10', impact: '2-3%', color: 'info', icon: '✨' }
                        }
                        
                        for (const [category, info] of Object.entries(fieldCategories)) {
                          if (info.fields.includes(field)) {
                            return { category, ...info }
                          }
                        }
                          return { category: 'low', fields: [], points: '10', impact: '2%', color: 'info', icon: '✨' }
                      }
                      
                      const fieldInfo = getFieldInfo(rec.field)
                      
                      return (
                          <Card key={index} sectioned>
                            <BlockStack spacing="loose">
                              {/* Modern Field Header */}
                              <InlineStack distribution="equalSpacing" alignment="start">
                          <BlockStack spacing="tight">
                                  <InlineStack spacing="tight" alignment="center">
                                <Text variant="headingSm" as="h4">
                                      {fieldInfo.icon} {rec.field.charAt(0).toUpperCase() + rec.field.slice(1).replace(/_/g, ' ')}
                                </Text>
                                    <Badge tone={fieldInfo.color as any} size="small">
                                      {fieldInfo.category.charAt(0).toUpperCase() + fieldInfo.category.slice(1)}
                                  </Badge>
                                  </InlineStack>
                                  
                                  <InlineStack spacing="tight" wrap>
                                    <Badge tone="info" size="small">
                                      +{fieldInfo.points} pts
                                    </Badge>
                                    <Badge tone="subdued" size="small">
                                      ~{fieldInfo.impact} impact
                                    </Badge>
                                  {isApplied && (
                                    <Badge tone="success" size="small">🚀 Applied</Badge>
                                  )}
                                  {!isApplied && isApproved && (
                                  <Badge tone="success" size="small">✅ Approved</Badge>
                                )}
                                  {!isApplied && isRejected && (
                                  <Badge tone="critical" size="small">❌ Rejected</Badge>
                                )}
                                  {!isApplied && isPending && (
                                      <Badge tone="attention" size="small">⏳ Pending</Badge>
                                )}
                              </InlineStack>
                                </BlockStack>
                                
                                {/* Action Buttons */}
                              {!isApplied && (
                                  <InlineStack spacing="tight">
                                <Button
                                  size="slim"
                                  onClick={() => handleToggleApproval(rec.field, false)}
                                  variant={isRejected ? 'primary' : 'secondary'}
                                  tone={isRejected ? 'critical' : undefined}
                                >
                                      {isRejected ? '❌ Rejected' : '❌ Reject'}
                                </Button>
                                <Button
                                  size="slim"
                                  onClick={() => handleToggleApproval(rec.field, true)}
                                  variant={isApproved ? 'primary' : 'secondary'}
                                  tone={isApproved ? 'success' : undefined}
                                >
                                      {isApproved ? '✅ Approved' : '✅ Approve'}
                                </Button>
                                  </InlineStack>
                                )}
                              </InlineStack>

                              {/* Content Comparison */}
                              <Card sectioned>
                                <BlockStack spacing="tight">
                                  <InlineStack distribution="equalSpacing">
                                    <BlockStack spacing="extraTight">
                                      <Text variant="bodyMd" tone="subdued">Current Value</Text>
                                      <Box padding="200" background="surface-subdued" borderRadius="100">
                            <Text variant="bodySm">
                                          {rec.originalValue || <Text tone="subdued">(empty)</Text>}
                            </Text>
                                      </Box>
                                    </BlockStack>
                                    
                                    <BlockStack spacing="extraTight">
                                      <Text variant="bodyMd" tone="success">AI Recommendation</Text>
                                      <Box padding="200" background="success-subdued" borderRadius="100">
                            <Text variant="bodySm">
                                          {rec.newValue}
                            </Text>
                                      </Box>
                                    </BlockStack>
                                  </InlineStack>
                                  
                            <Text variant="bodySm" tone="subdued">
                                    💡 <em>{rec.improvement}</em>
                            </Text>
                          </BlockStack>
                              </Card>
                            </BlockStack>
                          </Card>
                        )
                      })}
                    </BlockStack>
                    
                    {/* Apply Changes Section */}
                    <Card sectioned>
                      <InlineStack distribution="equalSpacing" alignment="center">
                        <BlockStack spacing="tight">
                          <Text variant="bodyMd" tone="subdued">
                            Ready to apply your approved changes?
                          </Text>
                          <Text variant="bodySm" tone="subdued">
                            {recommendations.filter(rec => 
                              rec.status !== 'applied' && approvalState[rec.field] === true
                            ).length} changes approved for application
                          </Text>
                        </BlockStack>
                        
                        <InlineStack spacing="tight">
                          <Button 
                            onClick={() => setRecommendations([])}
                            variant="secondary"
                          >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                            size="large"
                        onClick={handleApplyChanges}
                        loading={isApplyingChanges}
                        disabled={
                          recommendations.filter(rec => 
                            rec.status !== 'applied' && approvalState[rec.field] === true
                          ).length === 0
                        }
                      >
                            {isApplyingChanges ? '🚀 Applying...' : `✅ Apply ${recommendations.filter(rec => 
                            rec.status !== 'applied' && approvalState[rec.field] === true
                            ).length} Changes`}
                      </Button>
                        </InlineStack>
                      </InlineStack>
                    </Card>
                  </BlockStack>
                </Card>
              )}

              {/* Customer Input Section for Manual Fields */}
              {selectedProduct.gaps.length > 0 && (
                <Card>
                  <BlockStack spacing="loose">
                    <InlineStack align="space-between">
                      <BlockStack spacing="extraTight">
                        <Text variant="headingMd" as="h3">Manual Product Information</Text>
                        <Text variant="bodySm" color="subdued">
                          Fill in product specs that only you know. These can't be generated by AI.
                        </Text>
                      </BlockStack>
                      <Button 
                        onClick={() => setCustomerInputOpen(!customerInputOpen)}
                        variant="secondary"
                        size="slim"
                      >
                        {customerInputOpen ? 'Hide Fields' : 'Add Product Info'}
                      </Button>
                    </InlineStack>

                    <Collapsible open={customerInputOpen}>
                      <BlockStack spacing="loose">
                        {/* Filter gaps to only show customer-required fields */}
                        {selectedProduct.gaps
                          .filter(gap => getFieldInputType(gap) === 'customer_required')
                          .map((field, index) => {
                            const label = FIELD_LABELS[field] || field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')
                            
                            return (
                              <Box key={index}>
                                {/* Dimensions gets special treatment */}
                                {field === 'dimensions' ? (
                                  <BlockStack spacing="tight">
                                    <Text variant="bodySm" fontWeight="medium">{label}</Text>
                                    <InlineStack gap="300">
                                      <TextField
                                        label="Length"
                                        value={customerInputData[`${field}_length`] || ''}
                                        onChange={(value) => setCustomerInputData(prev => ({
                                          ...prev,
                                          [`${field}_length`]: value
                                        }))}
                                        placeholder="e.g., 12 inches"
                                        autoComplete="off"
                                      />
                                      <TextField
                                        label="Width" 
                                        value={customerInputData[`${field}_width`] || ''}
                                        onChange={(value) => setCustomerInputData(prev => ({
                                          ...prev,
                                          [`${field}_width`]: value
                                        }))}
                                        placeholder="e.g., 8 inches"
                                        autoComplete="off"
                                      />
                                      <TextField
                                        label="Height"
                                        value={customerInputData[`${field}_height`] || ''}
                                        onChange={(value) => setCustomerInputData(prev => ({
                                          ...prev,
                                          [`${field}_height`]: value
                                        }))}
                                        placeholder="e.g., 4 inches"
                                        autoComplete="off"
                                      />
                                    </InlineStack>
                                  </BlockStack>
                                ) : field === 'gender' ? (
                                  <Select
                                    label={label}
                                    options={[
                                      { label: 'Select target gender', value: '' },
                                      { label: 'Male', value: 'male' },
                                      { label: 'Female', value: 'female' },
                                      { label: 'Unisex', value: 'unisex' },
                                      { label: 'Kids', value: 'kids' }
                                    ]}
                                    value={customerInputData[field] || ''}
                                    onChange={(value) => setCustomerInputData(prev => ({
                                      ...prev,
                                      [field]: value
                                    }))}
                                  />
                                ) : (
                                  <TextField
                                    label={label}
                                    value={customerInputData[field] || ''}
                                    onChange={(value) => setCustomerInputData(prev => ({
                                      ...prev,
                                      [field]: value
                                    }))}
                                    placeholder={getFieldPlaceholder(field)}
                                    helpText={getFieldHelpText(field)}
                                    multiline={field === 'specifications' || field === 'warranty' || field === 'return_policy'}
                                    autoComplete="off"
                                  />
                                )}
                                
                                {/* Field Progress Indicator */}
                                <Box paddingBlockStart="200">
                                  <InlineStack gap="200" blockAlign="center">
                                    <Text variant="bodySm" color="subdued">
                                      Impact: +{getFieldPoints(field)} points, ~{getFieldImpact(field)}% health boost
                                    </Text>
                                    {customerInputData[field] && (
                                      <Badge tone="success" size="small">✅ Ready to save</Badge>
                                    )}
                                  </InlineStack>
                                </Box>
                              </Box>
                            )
                          })}

                        {/* Save Button */}
                        {Object.keys(customerInputData).length > 0 && (
                          <InlineStack align="end">
                            <Button onClick={() => setCustomerInputData({})}>
                              Clear All
                            </Button>
                            <Button 
                              variant="primary"
                              onClick={handleSaveCustomerInput}
                              loading={isSavingCustomerInput}
                            >
                              Save {Object.values(customerInputData).filter(v => v.trim()).length} Fields
                            </Button>
                          </InlineStack>
                        )}
                      </BlockStack>
                    </Collapsible>
                  </BlockStack>
                </Card>
              )}

              {selectedProduct.score >= 90 && (
                <Card>
                  <BlockStack spacing="tight">
                    <Text variant="headingMd" as="h3">
                      {selectedProduct.score === 100 ? '🎉 Perfect Product Health!' : '✅ Product Health: Excellent'}
                    </Text>
                    <Text>
                      {selectedProduct.score === 100 
                        ? 'Congratulations! This product has achieved perfect health with all OpenAI spec requirements met.' 
                        : 'This product has a high health score and does not need immediate attention.'}
                    </Text>
                    {selectedProduct.gaps.length === 0 && selectedProduct.score === 100 && (
                      <Text variant="bodySm" tone="success">
                        🚀 Ready for OpenAI ChatGPT discovery!
                      </Text>
                    )}
                  </BlockStack>
                </Card>
              )}
            </BlockStack>
        </Modal.Section>
          )}
      </Modal>
    </Page>
  )
}
