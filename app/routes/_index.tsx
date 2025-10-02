import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { useState } from "react"
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Button, 
  Banner, 
  DataTable, 
  Badge, 
  Toast 
} from "@shopify/polaris"
import { LegacyStack as Stack } from "@shopify/polaris"
import { authenticate } from "../shopify.server"
import { db } from "../utils/db"

// TypeScript interfaces for type safety
interface Product {
  id: string
  title: string
  description: string
  score: number
  gaps: string[]
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
  const mockProducts: Product[] = [
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
      lastSync: recentLogs.find((log: any) => log.type === 'sync')?.createdAt || null,
      recentLogs: recentLogs.map((log: any): LogEntry => ({
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
  const { shop, products, totalProducts, averageScore, lastSync, recentLogs, user } = useLoaderData<LoaderData>()
  const [isSyncing, setIsSyncing] = useState(false)
  const [isEnriching, setIsEnriching] = useState(false)
  const [isHealthChecking, setIsHealthChecking] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  
  const syncFetcher = useFetcher()
  const enrichFetcher = useFetcher()
  const healthCheckFetcher = useFetcher()

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

  const handleHealthCheck = () => {
    setIsHealthChecking(true)
    healthCheckFetcher.submit(
      {},
      { method: "get", action: "/api/health-check" }
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

  // Handle health check completion
  if (healthCheckFetcher.data && isHealthChecking) {
    const data = healthCheckFetcher.data as any
    if (data.success) {
      setToastMessage(`Health checks initiated: ${Object.keys(data.jobs || {}).length} jobs started`)
      setToastActive(true)
    } else {
      setToastMessage(`Health check failed: ${data.error}`)
      setToastActive(true)
    }
    setIsHealthChecking(false)
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
              <Text as="p">
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
              </Text>
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
                  <Button 
                    onClick={handleAIEnrich}
                    disabled={isEnriching || !user}
                    variant="primary"
                    tone="success"
                  >
                    {isEnriching ? "AI Enriching..." : "AI Fix Products"}
                  </Button>
                </Stack>
              </Stack>
              
              <DataTable
                columnContentTypes={['text', 'text', 'text', 'text', 'text']}
                headings={['ID', 'Title', 'Description', 'Score', 'Gaps']}
                rows={rows}
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
                >
                  Run Health Check
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
    </Page>
  )
}
