import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { authenticate } from "~/shopify.server"
import { db } from "~/utils/db"
import { healthCheckTester } from "~/utils/healthCheckTest"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    // Get user for testing
    const user = await db.user.findUnique({
      where: { shopId: session.shop }
    })

    if (!user) {
      return json({
        success: false,
        error: "User not found",
      }, { status: 404 })
    }

    // Run health check tests
    const testResults = await healthCheckTester.runAllTests(
      user.id,
      session.shop,
      user.accessToken
    )

    const summary = healthCheckTester.getTestSummary()

    // Log test results
    await db.log.create({
      data: {
        userId: user.id,
        type: 'health_check_test',
        message: `Health check tests completed: ${summary.passed}/${summary.total} passed`,
        metadata: {
          totalTests: summary.total,
          passedTests: summary.passed,
          failedTests: summary.failed,
          duration: summary.duration,
          results: testResults
        }
      }
    })

    return json({
      success: true,
      summary,
      results: testResults,
      message: `Health check tests completed: ${summary.passed}/${summary.total} passed`
    })
  } catch (error) {
    console.error('Health check test error:', error)
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to run health check tests",
    }, { status: 500 })
  }
}
