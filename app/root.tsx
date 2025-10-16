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
          import('@shopify/app-bridge/actions').then(({ NavigationMenu, AppLink }) => {
            // Create app instance with proper shop origin
            const app = createApp({
              apiKey: '18d643b75cf05db561e4883f7a2ef108', // Your app's API key
              shopOrigin: shop,
            })

            // Create navigation links for each tab
            const dashboardLink = AppLink.create(app, {
              label: 'Dashboard',
              destination: '/',
            })

            const validationLink = AppLink.create(app, {
              label: 'Feed Validation',
              destination: '/validation',
            })

            const enrichmentLink = AppLink.create(app, {
              label: 'AI Enrichment',
              destination: '/enrichment',
            })

            const taggingLink = AppLink.create(app, {
              label: 'Intent Tagging',
              destination: '/tagging',
            })

            const settingsLink = AppLink.create(app, {
              label: 'Settings',
              destination: '/settings',
            })

            // Create the navigation menu
            const navigationMenu = NavigationMenu.create(app, {
              items: [dashboardLink, validationLink, enrichmentLink, taggingLink, settingsLink],
              active: location.pathname === '/' ? dashboardLink : 
                     location.pathname === '/validation' ? validationLink :
                     location.pathname === '/enrichment' ? enrichmentLink :
                     location.pathname === '/tagging' ? taggingLink :
                     location.pathname === '/settings' ? settingsLink : dashboardLink,
            })

            // Listen for navigation changes
            app.subscribe(NavigationMenu.Action.UPDATE, (payload) => {
              // Handle navigation changes if needed
              console.log('Navigation updated:', payload)
            })
          })
        })
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
