import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { AppProvider, Frame, Navigation } from "@shopify/polaris"
import { useLocation, Link } from "@remix-run/react"

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
  
  const navigationMarkup = (
    <div style={{ 
      width: '240px', 
      backgroundColor: '#f6f6f7', 
      height: '100vh', 
      padding: '16px 0',
      borderRight: '1px solid #e1e3e5'
    }}>
      {/* Apps Header */}
      <div style={{ 
        padding: '8px 16px', 
        color: '#6d7175', 
        fontSize: '12px', 
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Apps &gt;
      </div>
      
      {/* Navigation Items */}
      <div style={{ padding: '8px 0' }}>
        {/* Dashboard - Atlas: AI Store Builder */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: location.pathname === '/' ? '#e1e3e5' : 'transparent',
            borderRadius: '6px',
            margin: '2px 8px',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ✓
            </div>
            <span style={{ 
              color: '#202223', 
              fontSize: '14px',
              fontWeight: location.pathname === '/' ? '500' : '400',
              flex: 1
            }}>
              Atlas: AI Store Builder
            </span>
            <div style={{ 
              width: '16px', 
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              📌
            </div>
          </div>
        </Link>
        
        {/* Feed Validation */}
        <Link to="/validation" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: location.pathname === '/validation' ? '#e1e3e5' : 'transparent',
            borderRadius: '6px',
            margin: '2px 8px',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ✓
            </div>
            <span style={{ 
              color: '#202223', 
              fontSize: '14px',
              fontWeight: location.pathname === '/validation' ? '500' : '400'
            }}>
              Feed Validation
            </span>
          </div>
        </Link>
        
        {/* AI Enrichment */}
        <Link to="/enrichment" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: location.pathname === '/enrichment' ? '#e1e3e5' : 'transparent',
            borderRadius: '6px',
            margin: '2px 8px',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ⭐
            </div>
            <span style={{ 
              color: '#202223', 
              fontSize: '14px',
              fontWeight: location.pathname === '/enrichment' ? '500' : '400'
            }}>
              AI Enrichment
            </span>
          </div>
        </Link>
        
        {/* Intent Tagging */}
        <Link to="/tagging" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: location.pathname === '/tagging' ? '#e1e3e5' : 'transparent',
            borderRadius: '6px',
            margin: '2px 8px',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🏷️
            </div>
            <span style={{ 
              color: '#202223', 
              fontSize: '14px',
              fontWeight: location.pathname === '/tagging' ? '500' : '400'
            }}>
              Intent Tagging
            </span>
          </div>
        </Link>
        
        {/* Settings */}
        <Link to="/settings" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: location.pathname === '/settings' ? '#e1e3e5' : 'transparent',
            borderRadius: '6px',
            margin: '2px 8px',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ⚙️
            </div>
            <span style={{ 
              color: '#202223', 
              fontSize: '14px',
              fontWeight: location.pathname === '/settings' ? '500' : '400'
            }}>
              Settings
            </span>
          </div>
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {navigationMarkup}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
    </div>
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
        <AppProvider i18n={{}}>
          <AppLayout />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
