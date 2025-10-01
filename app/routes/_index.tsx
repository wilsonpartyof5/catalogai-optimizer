import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import {
  Page,
  Card,
  Text,
  Button,
  DataTable,
  Layout,
  Banner,
  Spinner,
  Toast,
} from "@shopify/polaris"
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
    <Page title="CatalogAI Optimizer Dashboard">
      <Layout>
        <Layout.Section>
          <Banner title={`Welcome, ${shop}!`} tone="info">
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
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <Text variant="headingMd" as="h2">
                  Product Catalog Health
                </Text>
                <div>
                  <Button 
                    variant="primary"
                    onClick={handleSync}
                    loading={isSyncing}
                    disabled={isSyncing}
                  >
                    {isSyncing ? "Syncing..." : "Sync Products"}
                  </Button>
                  <Button 
                    onClick={handleAIEnrich}
                    loading={isEnriching}
                    disabled={isEnriching || !user}
                  >
                    {isEnriching ? "AI Enriching..." : "AI Fix Products"}
                  </Button>
                </div>
              </div>
              
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={["ID", "Title", "Description", "Score", "Gaps"]}
                rows={rows}
                footerContent={`Showing ${products.length} products`}
              />
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <div style={{ padding: "16px" }}>
                <Text variant="headingMd" as="h3">Quick Actions</Text>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Button fullWidth>Run Health Check</Button>
                  <Button fullWidth>Generate Feed</Button>
                  <Button fullWidth>View Analytics</Button>
                </div>
              </div>
            </Card>
          </Layout.Section>
          
          <Layout.Section variant="oneHalf">
            <Card>
              <div style={{ padding: "16px" }}>
                <Text variant="headingMd" as="h3">Recent Activity</Text>
                <div style={{ marginTop: "16px" }}>
                  {recentLogs.length > 0 ? (
                    recentLogs.map((log) => (
                      <Text key={log.id} as="p">
                        {log.type === 'sync' && '🔄 '}
                        {log.type === 'push' && '📤 '}
                        {log.type === 'error' && '❌ '}
                        {log.message} - {new Date(log.createdAt).toLocaleString()}
                      </Text>
                    ))
                  ) : (
                    <Text as="p">No recent activity</Text>
                  )}
                </div>
              </div>
            </Card>
          </Layout.Section>
        </Layout.Section>
      </Layout>
      
      {toastActive && (
        <Toast
          content={toastMessage}
          onDismiss={() => setToastActive(false)}
        />
      )}
    </Page>
  )
}
