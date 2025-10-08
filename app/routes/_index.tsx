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
  Toast,
  InlineStack,
  Box
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
    console.error('❌ ERROR in index loader:', error)
    console.error('❌ ERROR details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
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
  const [healthModalOpen, setHealthModalOpen] = useState(false)
  const [healthCheckJobId, setHealthCheckJobId] = useState<string | undefined>()
  
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
    </Page>
  )
}
