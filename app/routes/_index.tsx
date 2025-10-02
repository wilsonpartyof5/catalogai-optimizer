import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { useState } from "react"
import { authenticate } from "../shopify.server"
import { db } from "../utils/db"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)

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

        // Get recent logs
        recentLogs = await db.log.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          take: 3,
        })
      }
    } catch (dbError) {
      console.error('Database error in loader:', dbError)
      // Continue with mock data if database fails
    }

  // Mock data for now - will be replaced with real Shopify data after sync
  const mockProducts = [
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

    return json({
      shop: session.shop,
      user,
      products: mockProducts,
      totalProducts: latestAudit?.totalProducts || 0,
      averageScore: latestAudit?.score || 0,
      lastSync: recentLogs.find(log => log.type === 'sync')?.createdAt || null,
      recentLogs: recentLogs.map(log => ({
        id: log.id,
        type: log.type,
        message: log.message,
        createdAt: log.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error in index loader:', error)
    
    // Return minimal data if authentication fails
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
  const { session } = await authenticate.admin(request)
  
  const formData = await request.formData()
  const action = formData.get("action")

  if (action === "sync") {
    // Redirect to sync API
    return json({ redirect: "/api/sync" })
  }

  return json({ success: true })
}

export default function Index() {
  const { shop, products, totalProducts, averageScore, lastSync, recentLogs, user } = useLoaderData<typeof loader>()
  const [isSyncing, setIsSyncing] = useState(false)
  const [isEnriching, setIsEnriching] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  
  const syncFetcher = useFetcher()
  const enrichFetcher = useFetcher()

  const handleSync = () => {
    setIsSyncing(true)
    syncFetcher.submit(
      { action: "sync" },
      { method: "post", action: "/api/sync" }
    )
  }

  const handleAIEnrich = () => {
    setIsEnriching(true)
    enrichFetcher.submit(
      { 
        action: "enrich",
        maxProducts: "3", // Demo limit
        applyToShopify: "false" // Preview mode first
      },
      { method: "post", action: "/api/enrich" }
    )
  }

  // Handle sync completion
  if (syncFetcher.data && !isSyncing) {
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

  // Handle enrichment completion
  if (enrichFetcher.data && !isEnriching) {
    const data = enrichFetcher.data as any
    if (data.success) {
      setToastMessage(`AI enrichment completed for ${data.data?.productsProcessed || 0} products (${data.data?.totalUsage || 0} tokens used)`)
      setToastActive(true)
    } else {
      setToastMessage(`Enrichment failed: ${data.error}`)
      setToastActive(true)
    }
    setIsEnriching(false)
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CatalogAI Optimizer Dashboard</h1>
      
      <div style={{ padding: '16px', backgroundColor: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '4px', marginBottom: '20px' }}>
        <h2>Welcome, {shop}!</h2>
        <p>
          Your catalog health score: <strong>{averageScore}%</strong> 
          <br />
          Total products: <strong>{totalProducts}</strong>
          {lastSync && (
            <>
              <br />
              Last sync: <strong>{new Date(lastSync).toLocaleString()}</strong>
            </>
          )}
          {user && (
            <>
              <br />
              Tier: <strong>{user.tier}</strong> | AI Usage: <strong>{user.aiUsage} tokens</strong>
            </>
          )}
        </p>
      </div>

      <div style={{ marginBottom: '20px', padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2>Product Catalog Health</h2>
          <div>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: isSyncing ? '#ccc' : '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                marginRight: '8px'
              }}
            >
              {isSyncing ? "Syncing..." : "Sync Products"}
            </button>
            <button 
              onClick={handleAIEnrich}
              disabled={isEnriching || !user}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: (isEnriching || !user) ? '#ccc' : '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px'
              }}
            >
              {isEnriching ? "AI Enriching..." : "AI Fix Products"}
            </button>
          </div>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Title</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Score</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Gaps</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{product.id}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{product.title}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                  {product.description.length > 50 
                    ? `${product.description.substring(0, 50)}...` 
                    : product.description}
                </td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{product.score}%</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                  {product.gaps.length > 0 ? product.gaps.join(", ") : "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Showing {products.length} products
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h3>Quick Actions</h3>
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <button style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px' }}>Run Health Check</button>
            <button style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px' }}>Generate Feed</button>
            <button style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px' }}>View Analytics</button>
          </div>
        </div>
        
        <div style={{ flex: 1, padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h3>Recent Activity</h3>
          <div style={{ marginTop: "16px" }}>
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => (
                <p key={log.id} style={{ margin: '8px 0' }}>
                  {log.type === 'sync' && '🔄 '}
                  {log.type === 'push' && '📤 '}
                  {log.type === 'error' && '❌ '}
                  {log.message} - {new Date(log.createdAt).toLocaleString()}
                </p>
              ))
            ) : (
              <p>No recent activity</p>
            )}
          </div>
        </div>
      </div>
      
      {toastActive && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          padding: '16px', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb', 
          borderRadius: '4px',
          zIndex: 1000
        }}>
          {toastMessage}
          <button 
            onClick={() => setToastActive(false)}
            style={{ marginLeft: '10px', background: 'none', border: 'none', fontSize: '18px' }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
