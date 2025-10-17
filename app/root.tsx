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
import { NavMenu } from "@shopify/app-bridge-react"

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

  // Get shop origin from URL parameters
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const shop = urlParams?.get('shop')

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
      {shop && (
        <NavMenu
          navigationLinks={navigationLinks}
          matcher={(link, location) => link.destination === location.pathname}
        />
      )}
      <Outlet />
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
