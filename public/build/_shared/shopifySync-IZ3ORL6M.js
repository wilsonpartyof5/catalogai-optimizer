import {
  GraphQLClient
} from "/build/_shared/chunk-HVVFBXUI.js";
import {
  db
} from "/build/_shared/chunk-772RXSZC.js";
import {
  createHotContext
} from "/build/_shared/chunk-JWO2UMNO.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-PNG5AS42.js";

// app/utils/shopifySync.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/shopifySync.ts"
  );
  import.meta.hot.lastModified = "1759953690868.0525";
}
var PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                availableForSale
              }
            }
          }
          metafields(first: 100) {
            edges {
              node {
                id
                namespace
                key
                value
                type
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
var ShopifySyncService = class {
  client;
  constructor(shopDomain, accessToken) {
    console.log("\u{1F527} ShopifySyncService constructor [v2]:", {
      shopDomain,
      accessTokenLength: accessToken?.length || 0,
      accessTokenPrefix: accessToken?.substring(0, 10) + "...",
      endpoint: `https://${shopDomain}/admin/api/2025-10/graphql`
    });
    this.testAccessToken(shopDomain, accessToken);
    this.client = new GraphQLClient(
      `https://${shopDomain}/admin/api/2025-10/graphql`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json"
        }
      }
    );
  }
  async testAccessToken(shopDomain, accessToken) {
    try {
      console.log("\u{1F9EA} Testing access token with REST API...");
      const response = await fetch(`https://${shopDomain}/admin/api/2025-10/shop.json`, {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json"
        }
      });
      console.log("\u{1F9EA} REST API test response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      if (response.ok) {
        const data = await response.json();
        console.log("\u2705 Access token is valid, shop name:", data.shop?.name);
      } else {
        console.log("\u274C Access token test failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("\u274C Access token test error:", error);
    }
  }
  async syncProducts(userId) {
    const allProducts = [];
    let hasNextPage = true;
    let after;
    let pageCount = 0;
    console.log("\u{1F504} Starting product sync for user:", userId);
    try {
      while (hasNextPage) {
        pageCount++;
        console.log(`\u{1F4C4} Fetching page ${pageCount}${after ? ` (after: ${after.substring(0, 20)}...)` : " (first page)"}`);
        const startTime = Date.now();
        const response = await this.client.request(PRODUCTS_QUERY, {
          first: 250,
          after
        });
        const fetchTime = Date.now() - startTime;
        console.log(`\u23F1\uFE0F  Page ${pageCount} fetched in ${fetchTime}ms`);
        console.log(`\u{1F4E6} Products in this page: ${response.products.edges.length}`);
        const products = response.products.edges.map((edge) => ({
          id: edge.node.id.replace("gid://shopify/Product/", ""),
          title: edge.node.title,
          description: edge.node.description || "",
          handle: edge.node.handle,
          productType: edge.node.productType || "",
          vendor: edge.node.vendor || "",
          tags: edge.node.tags || [],
          variants: edge.node.variants.edges.map((v) => ({
            id: v.node.id.replace("gid://shopify/ProductVariant/", ""),
            title: v.node.title,
            price: v.node.price,
            compareAtPrice: v.node.compareAtPrice,
            sku: v.node.sku,
            inventoryQuantity: v.node.inventoryQuantity,
            availableForSale: v.node.availableForSale
          })),
          metafields: edge.node.metafields.edges.map((m) => ({
            id: m.node.id.replace("gid://shopify/Metafield/", ""),
            namespace: m.node.namespace,
            key: m.node.key,
            value: m.node.value,
            type: m.node.type
          })),
          images: edge.node.images.edges.map((i) => ({
            id: i.node.id.replace("gid://shopify/MediaImage/", ""),
            url: i.node.url,
            altText: i.node.altText
          }))
        }));
        allProducts.push(...products);
        console.log(`\u{1F4CA} Total products so far: ${allProducts.length}`);
        hasNextPage = response.products.pageInfo.hasNextPage;
        after = response.products.pageInfo.endCursor;
        console.log(`\u{1F517} Has next page: ${hasNextPage}`);
        if (hasNextPage) {
          console.log(`\u23F3 Waiting 500ms before next request...`);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      console.log(`\u2705 Sync complete! Total products: ${allProducts.length}`);
      await db.log.create({
        data: {
          userId,
          type: "sync",
          message: `Synchronized ${allProducts.length} products from Shopify`,
          metadata: {
            productsCount: allProducts.length,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      });
      return allProducts;
    } catch (error) {
      console.error("\u274C Sync failed:", error);
      console.error("\u274C Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : String(error),
        pageCount,
        totalProducts: allProducts.length
      });
      await db.log.create({
        data: {
          userId,
          type: "error",
          message: `Failed to sync products: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.stack : String(error),
          metadata: {
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            pageCount,
            totalProducts: allProducts.length
          }
        }
      });
      throw error;
    }
  }
  async getInventoryLevels(shopDomain, accessToken) {
    try {
      const response = await fetch(
        `https://${shopDomain}/admin/api/2025-10/inventory_levels.json`,
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.inventory_levels || [];
    } catch (error) {
      console.error("Error fetching inventory levels:", error);
      throw error;
    }
  }
  async getRecentOrders(shopDomain, accessToken, limit = 50) {
    try {
      const response = await fetch(
        `https://${shopDomain}/admin/api/2025-10/orders.json?limit=${limit}&status=any`,
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
};
export {
  ShopifySyncService
};
//# sourceMappingURL=/build/_shared/shopifySync-IZ3ORL6M.js.map
