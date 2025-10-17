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
import { useEffect, useState } from "react"

// Simple client-side only wrapper
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

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
  const [shop, setShop] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Handle client-side only logic
  useEffect(() => {
    setIsClient(true)
    
    // Get shop from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const shopParam = urlParams.get('shop')
    setShop(shopParam)
  }, [])

  const navigationLinks = [
    {
      label: 'Dashboard',
      destination: '/',
    },
    {
      label: 'Feed Validation',
      destination: '/validation',
    },
    {
      label: 'AI Enrichment',
      destination: '/enrichment',
    },
    {
      label: 'Intent Tagging',
      destination: '/tagging',
    },
    {
      label: 'Settings',
      destination: '/settings',
    }
  ]

  return (
    <>
      {/* Only render navigation on client-side */}
      {isClient && shop && (
        <div style={{ 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          width: '250px', 
          height: '100vh', 
          backgroundColor: '#f6f6f7', 
          borderRight: '1px solid #e1e3e5',
          padding: '20px',
          zIndex: 1000
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#202223' }}>
              Atlas: AI Store Builder
            </h3>
          </div>
          
          <nav>
            {navigationLinks.map((link) => (
              <div key={link.destination} style={{ marginBottom: '8px' }}>
                <a
                  href={link.destination}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    textDecoration: 'none',
                    color: location.pathname === link.destination ? '#008060' : '#202223',
                    backgroundColor: location.pathname === link.destination ? '#f0f9f7' : 'transparent',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: location.pathname === link.destination ? '600' : '400',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      )}
      
      {/* Main content with left margin when nav is present */}
      <div style={{ 
        marginLeft: isClient && shop ? '250px' : '0',
        transition: 'margin-left 0.2s ease'
      }}>
        <Outlet />
      </div>
    </>
  )
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
        <ClientOnly>
          <AppProvider 
            i18n={{}} 
            theme={{
              colorScheme: 'light',
              hasCustomProperties: false
            }}
          >
            <Frame>
              <AppLayout />
            </Frame>
          </AppProvider>
        </ClientOnly>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
