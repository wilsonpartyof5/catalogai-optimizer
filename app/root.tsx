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
import { useLocation } from "@remix-run/react"

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
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: 'home',
            url: '/',
            selected: location.pathname === '/',
          },
          {
            label: 'Feed Validation',
            icon: 'checkCircle',
            url: '/validation',
            selected: location.pathname === '/validation',
          },
          {
            label: 'AI Enrichment',
            icon: 'star',
            url: '/enrichment',
            selected: location.pathname === '/enrichment',
          },
          {
            label: 'Intent Tagging',
            icon: 'tag',
            url: '/tagging',
            selected: location.pathname === '/tagging',
          },
          {
            label: 'Settings',
            icon: 'settings',
            url: '/settings',
            selected: location.pathname === '/settings',
          },
        ]}
      />
    </Navigation>
  )

  return (
    <Frame navigation={navigationMarkup}>
      <Outlet />
    </Frame>
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
