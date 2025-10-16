/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "react",
    "react-dom",
    "@shopify/polaris",
    "@shopify/app-bridge-react",
    "@shopify/app-bridge"
  ],
}
