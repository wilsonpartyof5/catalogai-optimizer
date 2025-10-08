import { type LoaderFunctionArgs } from "@remix-run/node"
import { authenticate } from "../shopify.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request)
  
  // Redirect to the main app after successful authentication
  return Response.redirect(new URL("/", request.url))
}
