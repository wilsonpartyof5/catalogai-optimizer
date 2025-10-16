import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { AppProvider, Frame } from "@shopify/polaris"
import { useLocation } from "@remix-run/react"
import { useEffect } from "react"
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react"

export const meta: MetaFunction = () => {
  return [
    { title: "CatalogAI Optimizer" },
    { name: "description", content: "AI-powered Shopify catalog optimization" },
  ]
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://unpkg.com/@shopify/polaris@12.27.0/build/esm/styles.css" },
]


function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    // Initialize App Bridge navigation when the component mounts
    if (typeof window !== 'undefined') {
      // Get shop origin from URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const shop = urlParams.get('shop')
      
      if (shop) {
        import('@shopify/app-bridge').then(({ createApp }) => {
          import('@shopify/app-bridge/actions').then(({ NavigationMenu }) => {
            // Create app instance with proper shop origin
            const app = createApp({
              apiKey: '18d643b75cf05db561e4883f7a2ef108', // Your app's API key
              shopOrigin: shop,
            })

            // Create the navigation menu with proper structure
            const navigationMenu = NavigationMenu.create(app, {
              items: [
                {
                  label: 'Dashboard',
                  destination: '/',
                  active: location.pathname === '/'
                },
                {
                  label: 'Feed Validation',
                  destination: '/validation',
                  active: location.pathname === '/validation'
                },
                {
                  label: 'AI Enrichment',
                  destination: '/enrichment',
                  active: location.pathname === '/enrichment'
                },
                {
                  label: 'Intent Tagging',
                  destination: '/tagging',
                  active: location.pathname === '/tagging'
                },
                {
                  label: 'Settings',
                  destination: '/settings',
                  active: location.pathname === '/settings'
                }
              ]
            })

            console.log('✅ App Bridge NavigationMenu initialized for shop:', shop)
          }).catch((error) => {
            console.error('❌ Error loading App Bridge actions:', error)
          })
        }).catch((error) => {
          console.error('❌ Error loading App Bridge:', error)
        })
      } else {
        console.log('⚠️ No shop parameter found in URL')
      }
    }
  }, [location.pathname])

  return <Outlet />
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={{}}>
          <Frame>
            <AppLayout />
          </Frame>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
