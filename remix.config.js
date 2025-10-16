/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    "react",
    "react-dom",
    "@shopify/polaris",
    "@shopify/app-bridge-react",
    "@shopify/app-bridge",
    "scheduler",
    "graphql-request",
    "graphql"
  ],
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  },
}
