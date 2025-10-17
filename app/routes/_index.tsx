import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Button, 
  Banner, 
  DataTable, 
  Badge, 
  InlineStack,
  Box,
  ProgressBar,
  BlockStack
} from "@shopify/polaris"
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

interface DashboardMetrics {
  aiReadinessScore: number
  totalProducts: number
  validProducts: number
  warningProducts: number
  invalidProducts: number
  lastSyncTime: string
}

interface LoaderData {
  shop: string
  products: Product[]
  totalProducts: number
  averageScore: number
  dashboardMetrics: DashboardMetrics
  lastSync: string | null
  recentLogs: LogEntry[]
  user: User | null
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request)
  
  // Get user from database
  const user = await db.user.findFirst({
    where: { shopId: session.shop }
  })

  // Get recent logs
  const recentLogs = await db.log.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  // Calculate dashboard metrics
  const totalProducts = 100 // Mock data for now
  const validProducts = 75
  const warningProducts = 20
  const invalidProducts = 5
  const aiReadinessScore = Math.round((validProducts / totalProducts) * 100)

  const dashboardMetrics: DashboardMetrics = {
    aiReadinessScore,
    totalProducts,
    validProducts,
    warningProducts,
    invalidProducts,
    lastSyncTime: new Date().toISOString()
  }

  // Mock products data
  const products: Product[] = [
    {
      id: "1",
      title: "Sample Product 1",
      description: "A great product",
      score: 85,
      gaps: ["Missing material info", "No size specified"]
    },
    {
      id: "2", 
      title: "Sample Product 2",
      description: "Another great product",
      score: 92,
      gaps: []
    }
  ]

  return json({
    shop: session.shop,
    products,
    totalProducts,
    averageScore: 88,
    dashboardMetrics,
    lastSync: recentLogs.find(log => log.type === 'sync')?.createdAt || null,
    recentLogs: recentLogs.map(log => ({
      id: log.id,
      type: log.type,
      message: log.message,
      createdAt: log.createdAt.toISOString()
    })),
    user
  })
}

export default function Index() {
  const { shop, totalProducts, averageScore, dashboardMetrics, lastSync, recentLogs, user, products } = useLoaderData<LoaderData>()

  return (
    <Page title="CatalogAI Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Welcome to CatalogAI Optimizer
              </Text>
              <Text as="p" variant="bodyMd">
                Shop: {shop}
              </Text>
              <Text as="p" variant="bodyMd">
                Total Products: {totalProducts}
              </Text>
              <Text as="p" variant="bodyMd">
                Average Score: {averageScore}%
              </Text>
              <Text as="p" variant="bodyMd">
                AI Readiness Score: {dashboardMetrics.aiReadinessScore}%
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Product Health Overview
              </Text>
              <Text as="p" variant="bodyMd">
                Valid Products: {dashboardMetrics.validProducts}
              </Text>
              <Text as="p" variant="bodyMd">
                Warning Products: {dashboardMetrics.warningProducts}
              </Text>
              <Text as="p" variant="bodyMd">
                Invalid Products: {dashboardMetrics.invalidProducts}
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Recent Activity
              </Text>
              {recentLogs.length > 0 ? (
                <BlockStack gap="200">
                  {recentLogs.slice(0, 5).map((log) => (
                    <Box key={log.id} padding="200" background="bg-surface-secondary">
                      <Text as="p" variant="bodySm">
                        <strong>{log.type}:</strong> {log.message}
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        {new Date(log.createdAt).toLocaleString()}
                      </Text>
                    </Box>
                  ))}
                </BlockStack>
              ) : (
                <Text as="p" variant="bodyMd" tone="subdued">
                  No recent activity
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Sample Products
              </Text>
              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text']}
                headings={['Title', 'Description', 'Score', 'Gaps']}
                rows={products.map(product => [
                  product.title,
                  product.description,
                  product.score.toString(),
                  product.gaps.join(', ') || 'None'
                ])}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
