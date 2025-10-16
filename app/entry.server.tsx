import { PassThrough } from "node:stream"
import type { EntryContext } from "@remix-run/node"
import { createReadableStreamFromReadable } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import { renderToPipeableStream } from "react-dom/server"
import { scheduleHealthChecks, scheduleDailyHealthScans } from "./utils/queue"

// Ensure JSX runtime is available
import { jsxDEV } from "react/jsx-dev-runtime"

const ABORT_DELAY = 5_000

// Initialize health checks on server start (only if Redis is configured)
if (typeof global !== 'undefined' && !global.healthChecksInitialized) {
  console.log('Checking Redis configuration:', {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    hasRedisPassword: !!process.env.REDIS_PASSWORD,
    allEnvVars: Object.keys(process.env).filter(key => key.startsWith('REDIS'))
  })
  
  if (process.env.REDIS_HOST && process.env.REDIS_PASSWORD) {
    console.log('Redis configuration found - initializing health checks')
    scheduleHealthChecks().catch((error) => {
      console.error('Failed to initialize health checks:', error)
    })
    
    // Schedule daily health scans for all users
    scheduleDailyHealthScans().catch((error) => {
      console.error('Failed to schedule daily health scans:', error)
    })
  } else {
    console.log('Health checks skipped - Redis not configured')
  }
  global.healthChecksInitialized = true
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")
          responseHeaders.set("X-Frame-Options", "ALLOWALL")
          responseHeaders.set("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com")

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")
          responseHeaders.set("X-Frame-Options", "ALLOWALL")
          responseHeaders.set("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com")

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
