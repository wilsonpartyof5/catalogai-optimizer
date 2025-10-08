import { type LoaderFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    console.log('🔍 OAuth completed successfully for shop:', session.shop)
    
    // Redirect to the main app after successful authentication
    return Response.redirect(new URL("/", request.url))
  } catch (error) {
    console.error('❌ OAuth error:', error)
    
    // If authentication fails, redirect to OAuth flow
    return authenticate.admin(request)
  }
}
