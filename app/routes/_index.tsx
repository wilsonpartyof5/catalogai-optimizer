import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { useState, useEffect } from "react"
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
  Modal
} from "@shopify/polaris"
import { LegacyStack as Stack } from "@shopify/polaris"
import { authenticate } from "../shopify.server"
import { db } from "../utils/db"
import { HealthCheckModal } from "../components/HealthCheckModal"

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
  
  const syncFetcher = useFetcher()
  const healthCheckFetcher = useFetcher()
  const recommendationFetcher = useFetcher()

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
      let message = `Successfully applied ${data.appliedCount} changes to Shopify!`
      
      // Get the final score from response or calculate improvement
      let finalScore = selectedProduct.score
      if (data.scoreImprovement) {
        finalScore = data.scoreImprovement.final
        const improvement = data.scoreImprovement.improvement
        if (improvement > 0) {
          message += ` Health score improved by ${improvement.toFixed(0)}% (${data.scoreImprovement.initial}% → ${data.scoreImprovement.final}%)`
        } else {
          message += ` Health score: ${data.scoreImprovement.final}%`
        }
      }
      
      // Get the applied field names to remove from gaps
      const appliedFields = recommendations
        .filter(rec => approvalState[rec.field] === true)
        .map(rec => rec.field)
      
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
          <Banner tone="info">
            <Stack vertical>
              <Text variant="headingMd" as="h2">
                Welcome, {shop}!
              </Text>
              <Stack vertical>
                <InlineStack gap="400" align="start">
                  <Box>
                    <Text variant="bodyMd" tone="subdued" as="p">Health Score</Text>
                    <Badge 
                      tone={averageScore >= 90 ? 'success' : averageScore >= 70 ? 'warning' : 'critical'}
                      size="large"
                    >
                      {`${averageScore}%`}
                    </Badge>
                  </Box>
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
                {averageScore < 90 && (
                  <Banner tone="warning" title="Catalog needs attention">
                    Your catalog health is below 90%. Consider running a health check to identify and fix issues.
                  </Banner>
                )}
              </Stack>
            </Stack>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Stack vertical>
              <Stack distribution="equalSpacing" alignment="center">
                <Text variant="headingMd" as="h2">
                  Product Catalog Health
                </Text>
                <Stack spacing="tight">
                  <Button 
                    onClick={handleSync}
                    loading={isSyncing}
                    variant="primary"
                  >
                    {isSyncing ? "Syncing..." : "Sync Products"}
                  </Button>
                </Stack>
              </Stack>
              
              <DataTable
                columnContentTypes={['text', 'text', 'text', 'text', 'text']}
                headings={['ID', 'Title', 'Description', 'Score', 'Gaps']}
                rows={rows.map((row, index) => [
                  row[0],
                  <button 
                    key={index}
                    onClick={() => handleProductClick(products[index])}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0066cc', 
                      cursor: 'pointer', 
                      textDecoration: 'underline',
                      padding: 0,
                      fontSize: 'inherit'
                    }}
                  >
                    {row[1]}
                  </button>,
                  row[2],
                  row[3],
                  row[4]
                ])}
              />
              <Text as="p" variant="bodySm" tone="subdued">
                Showing {products.length} products
              </Text>
            </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <Card>
            <Stack vertical>
              <Text variant="headingMd" as="h3">
                Quick Actions
              </Text>
              <Stack vertical spacing="tight">
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
              </Stack>
            </Stack>
          </Card>
        </Layout.Section>
        
        <Layout.Section variant="oneHalf">
          <Card>
            <Stack vertical>
              <Text variant="headingMd" as="h3">
                Recent Activity
              </Text>
              <Stack vertical spacing="tight">
                {recentLogs.length > 0 ? (
                  recentLogs.map((log: LogEntry) => (
                    <Stack key={log.id} spacing="tight" alignment="leading">
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
                    </Stack>
                  ))
                ) : (
                  <Text as="p" tone="subdued">No recent activity</Text>
                )}
              </Stack>
            </Stack>
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

      {/* Product Detail Modal */}
      <Modal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        title={selectedProduct ? `Product Details: ${selectedProduct.title}` : ''}
        primaryAction={{
          content: 'Close',
          onAction: () => setProductModalOpen(false),
        }}
      >
        <Modal.Section>
          {selectedProduct && (
            <Stack vertical spacing="loose">
              <Card>
                <Stack vertical spacing="tight">
                  <Text variant="headingMd" as="h3">Current Product Data</Text>
                  <Text><strong>Title:</strong> {selectedProduct.title}</Text>
                  <Text><strong>Description:</strong> {selectedProduct.description}</Text>
                  <InlineStack gap="200" blockAlign="center">
                    <Text><strong>Health Score:</strong></Text>
                    <Badge 
                      tone={selectedProduct.score >= 90 ? 'success' : selectedProduct.score >= 70 ? 'attention' : 'critical'}
                      size="large"
                    >
                      {selectedProduct.score}%
                    </Badge>
                    {justAppliedChanges && (
                      <Text variant="bodySm" tone="success">
                        ✨ Just Updated!
                      </Text>
                    )}
                  </InlineStack>
                  <Text><strong>Gaps Found:</strong> {selectedProduct.gaps.length > 0 ? selectedProduct.gaps.join(', ') : '🎉 No gaps - Perfect score!'}</Text>
                </Stack>
              </Card>

              {selectedProduct.gaps.length > 0 && recommendations.length === 0 && (
                <Card>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">AI Recommendations</Text>
                    <Text variant="bodySm" color="subdued">
                      Click "Improve Score" to generate AI suggestions for the gaps: {selectedProduct.gaps.join(', ')}
                    </Text>
                    <Button 
                      onClick={handleGenerateRecommendations}
                      variant="primary"
                      loading={isGeneratingRecommendations}
                    >
                      {isGeneratingRecommendations ? 'Generating...' : 'Improve Score'}
                    </Button>
                  </Stack>
                </Card>
              )}

              {selectedProduct.gaps.length > 0 && recommendations.length > 0 && (
                <Card>
                  <Stack vertical spacing="tight">
                    <InlineStack align="space-between">
                      <Text variant="headingMd" as="h3">AI Recommendations</Text>
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
                        {isGeneratingRecommendations ? 'Generating...' : 'Regenerate'}
                      </Button>
                    </InlineStack>
                    
                    {/* Show generation timestamp if available */}
                    {selectedProduct.recommendations?.generatedAt && (
                      <Text variant="bodySm" color="subdued">
                        Generated: {new Date(selectedProduct.recommendations.generatedAt).toLocaleString()}
                      </Text>
                    )}
                  </Stack>
                </Card>
              )}

              {recommendations.length > 0 && (
                <Card>
                  <Stack vertical spacing="loose">
                    <Text variant="headingMd" as="h3">AI Recommendations - Approve or Reject</Text>
                    <Text variant="bodySm" tone="subdued">
                      Review each recommendation and use ✅ to approve or ❌ to reject. Only approved changes will be applied.
                    </Text>
                    
                    {/* Bulk Actions */}
                    <InlineStack gap="200">
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
                    
                    {recommendations.map((rec, index) => {
                      const isApproved = approvalState[rec.field] === true
                      const isRejected = approvalState[rec.field] === false
                      const isPending = approvalState[rec.field] === undefined
                      const isApplied = rec.status === 'applied'
                      
                      return (
                        <Box 
                          key={index} 
                          padding="400" 
                          background={isApproved ? "success-subdued" : isRejected ? "critical-subdued" : "surface-subdued"} 
                          borderRadius="200"
                          borderColor={isApproved ? "success" : isRejected ? "critical" : "base"}
                          borderWidth="1"
                        >
                          <Stack vertical spacing="tight">
                            <InlineStack align="space-between" blockAlign="center">
                              <InlineStack gap="200" blockAlign="center">
                                <Text variant="headingSm" as="h4">
                                  {rec.field.charAt(0).toUpperCase() + rec.field.slice(1).replace('_', ' ')}
                                </Text>
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
                              {!isApplied && (
                                <InlineStack gap="200">
                                  <Button
                                    size="slim"
                                    onClick={() => handleToggleApproval(rec.field, false)}
                                    variant={isRejected ? 'primary' : 'secondary'}
                                    tone={isRejected ? 'critical' : undefined}
                                  >
                                    {isRejected ? '❌ Rejected' : 'Reject'}
                                  </Button>
                                  <Button
                                    size="slim"
                                    onClick={() => handleToggleApproval(rec.field, true)}
                                    variant={isApproved ? 'primary' : 'secondary'}
                                    tone={isApproved ? 'success' : undefined}
                                  >
                                    {isApproved ? '✅ Approved' : 'Approve'}
                                  </Button>
                                </InlineStack>
                              )}
                            </InlineStack>
                            
                            <Text variant="bodySm">
                              <strong>Current:</strong> {rec.originalValue || '(empty)'}
                            </Text>
                            <Text variant="bodySm">
                              <strong>Recommended:</strong> {rec.newValue}
                            </Text>
                            <Text variant="bodySm" tone="subdued">
                              <em>{rec.improvement}</em>
                            </Text>
                          </Stack>
                        </Box>
                      )
                    })}
                    
                    <InlineStack gap="200" align="end">
                      <Button onClick={() => setRecommendations([])}>
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleApplyChanges}
                        loading={isApplyingChanges}
                        disabled={
                          recommendations.filter(rec => 
                            rec.status !== 'applied' && approvalState[rec.field] === true
                          ).length === 0
                        }
                      >
                        Apply {
                          recommendations.filter(rec => 
                            rec.status !== 'applied' && approvalState[rec.field] === true
                          ).length
                        } Approved Changes
                      </Button>
                    </InlineStack>
                  </Stack>
                </Card>
              )}

              {selectedProduct.score >= 90 && (
                <Card>
                  <Stack vertical spacing="tight">
                    <Text variant="headingMd" as="h3">
                      {selectedProduct.score === 100 ? '🎉 Perfect Product Health!' : '✅ Product Health: Excellent'}
                    </Text>
                    <Text>
                      {selectedProduct.score === 100 
                        ? 'Congratulations! This product has achieved perfect health with all OpenAI spec requirements met.' 
                        : 'This product has a high health score and doesn\'t need immediate attention.'}
                    </Text>
                    {selectedProduct.gaps.length === 0 && selectedProduct.score === 100 && (
                      <Text variant="bodySm" tone="success">
                        🚀 Ready for OpenAI ChatGPT discovery!
                      </Text>
                    )}
                  </Stack>
                </Card>
              )}
            </Stack>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  )
}
