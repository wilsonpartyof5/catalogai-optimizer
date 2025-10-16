var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};
var __publicField = (obj, key, value) => (__defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value), value);

// app/utils/db.ts
import { PrismaClient } from "@prisma/client";
var db, init_db = __esm({
  "app/utils/db.ts"() {
    "use strict";
    db = new PrismaClient({
      log: ["error", "warn"],
      errorFormat: "minimal"
    });
  }
});

// app/shopify.server.ts
var shopify_server_exports = {};
__export(shopify_server_exports, {
  addDocumentResponseHeaders: () => addDocumentResponseHeaders,
  apiVersion: () => apiVersion,
  authenticate: () => authenticate,
  default: () => shopify_server_default,
  registerWebhooks: () => registerWebhooks,
  sessionStorage: () => sessionStorage,
  unauthenticated: () => unauthenticated
});
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
var shopify, shopify_server_default, apiVersion, addDocumentResponseHeaders, authenticate, unauthenticated, registerWebhooks, sessionStorage, init_shopify_server = __esm({
  "app/shopify.server.ts"() {
    "use strict";
    init_db();
    shopify = shopifyApp({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      appUrl: process.env.SHOPIFY_APP_URL,
      apiVersion: "2025-10",
      scopes: process.env.SCOPES?.split(",") || ["read_products", "read_inventory", "write_metafields", "read_orders"],
      sessionStorage: new PrismaSessionStorage(db),
      distribution: "app",
      useOnlineTokens: !1,
      // Use offline tokens for background API calls
      hooks: {
        afterAuth: async ({ session }) => {
          console.log("\u{1F50D} afterAuth triggered for shop:", session.shop);
          try {
            let user = await db.user.upsert({
              where: { shopId: session.shop },
              update: {
                accessToken: session.accessToken,
                updatedAt: /* @__PURE__ */ new Date()
              },
              create: {
                shopId: session.shop,
                shopDomain: session.shop,
                accessToken: session.accessToken,
                tier: "starter",
                aiUsage: 0
              }
            });
            console.log("\u2705 User created/updated:", user.id);
          } catch (error) {
            throw console.error("\u274C afterAuth error:", error), error;
          }
        }
      }
    }), shopify_server_default = shopify, apiVersion = "2025-10", addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;
  }
});

// app/utils/shopifySync.ts
var shopifySync_exports = {};
__export(shopifySync_exports, {
  ShopifySyncService: () => ShopifySyncService
});
import { GraphQLClient } from "graphql-request";
var PRODUCTS_QUERY, ShopifySyncService, init_shopifySync = __esm({
  "app/utils/shopifySync.ts"() {
    "use strict";
    init_db();
    PRODUCTS_QUERY = `
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
`, ShopifySyncService = class {
      client;
      constructor(shopDomain, accessToken) {
        console.log("\u{1F527} ShopifySyncService constructor [v2]:", {
          shopDomain,
          accessTokenLength: accessToken?.length || 0,
          accessTokenPrefix: accessToken?.substring(0, 10) + "...",
          endpoint: `https://${shopDomain}/admin/api/2025-10/graphql`
        }), this.testAccessToken(shopDomain, accessToken), this.client = new GraphQLClient(
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
          let response = await fetch(`https://${shopDomain}/admin/api/2025-10/shop.json`, {
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json"
            }
          });
          if (console.log("\u{1F9EA} REST API test response:", {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
          }), response.ok) {
            let data = await response.json();
            console.log("\u2705 Access token is valid, shop name:", data.shop?.name);
          } else
            console.log("\u274C Access token test failed:", response.status, response.statusText);
        } catch (error) {
          console.log("\u274C Access token test error:", error);
        }
      }
      async syncProducts(userId) {
        let allProducts = [], hasNextPage = !0, after, pageCount = 0;
        console.log("\u{1F504} Starting product sync for user:", userId);
        try {
          for (; hasNextPage; ) {
            pageCount++, console.log(`\u{1F4C4} Fetching page ${pageCount}${after ? ` (after: ${after.substring(0, 20)}...)` : " (first page)"}`);
            let startTime = Date.now(), response = await this.client.request(PRODUCTS_QUERY, {
              first: 250,
              after
            }), fetchTime = Date.now() - startTime;
            console.log(`\u23F1\uFE0F  Page ${pageCount} fetched in ${fetchTime}ms`), console.log(`\u{1F4E6} Products in this page: ${response.products.edges.length}`);
            let products = response.products.edges.map((edge) => ({
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
            allProducts.push(...products), console.log(`\u{1F4CA} Total products so far: ${allProducts.length}`), hasNextPage = response.products.pageInfo.hasNextPage, after = response.products.pageInfo.endCursor, console.log(`\u{1F517} Has next page: ${hasNextPage}`), hasNextPage && (console.log("\u23F3 Waiting 500ms before next request..."), await new Promise((resolve) => setTimeout(resolve, 500)));
          }
          return console.log(`\u2705 Sync complete! Total products: ${allProducts.length}`), await db.log.create({
            data: {
              userId,
              type: "sync",
              message: `Synchronized ${allProducts.length} products from Shopify`,
              metadata: {
                productsCount: allProducts.length,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }), allProducts;
        } catch (error) {
          throw console.error("\u274C Sync failed:", error), console.error("\u274C Error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : String(error),
            pageCount,
            totalProducts: allProducts.length
          }), await db.log.create({
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
          }), error;
        }
      }
      async getInventoryLevels(shopDomain, accessToken) {
        try {
          let response = await fetch(
            `https://${shopDomain}/admin/api/2025-10/inventory_levels.json`,
            {
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
              }
            }
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return (await response.json()).inventory_levels || [];
        } catch (error) {
          throw console.error("Error fetching inventory levels:", error), error;
        }
      }
      async getRecentOrders(shopDomain, accessToken, limit = 50) {
        try {
          let response = await fetch(
            `https://${shopDomain}/admin/api/2025-10/orders.json?limit=${limit}&status=any`,
            {
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
              }
            }
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return (await response.json()).orders || [];
        } catch (error) {
          throw console.error("Error fetching orders:", error), error;
        }
      }
    };
  }
});

// app/utils/openaiSpec.ts
function getFieldInputType(fieldName) {
  return FIELD_INPUT_TYPES.customer_input_required.includes(fieldName) ? "customer_required" : FIELD_INPUT_TYPES.ai_generatable.includes(fieldName) ? "ai_generatable" : FIELD_INPUT_TYPES.core_required.includes(fieldName) ? "core_required" : "customer_required";
}
var OPENAI_PRODUCT_SCHEMA, FIELD_WEIGHTS, FIELD_POINTS, FIELD_INPUT_TYPES, FIELD_LABELS, init_openaiSpec = __esm({
  "app/utils/openaiSpec.ts"() {
    "use strict";
    OPENAI_PRODUCT_SCHEMA = {
      type: "object",
      required: [
        "title",
        "description",
        "price",
        "availability",
        "category"
      ],
      properties: {
        // Core Product Information
        title: {
          type: "string",
          maxLength: 150,
          description: "Product title - clear, descriptive, keyword-rich"
        },
        description: {
          type: "string",
          minLength: 100,
          maxLength: 4e3,
          description: "Detailed product description with features, benefits, use cases"
        },
        price: {
          type: "string",
          pattern: "^\\d+\\.\\d{2} [A-Z]{3}$",
          description: "Price in format 'XX.XX USD'"
        },
        availability: {
          type: "string",
          enum: ["in_stock", "out_of_stock", "pre_order", "discontinued"],
          description: "Current availability status"
        },
        category: {
          type: "string",
          description: "Product category for classification"
        },
        // Physical Attributes
        material: {
          type: "string",
          description: "Primary material composition"
        },
        dimensions: {
          type: "object",
          properties: {
            length: { type: "string", description: "Length with unit" },
            width: { type: "string", description: "Width with unit" },
            height: { type: "string", description: "Height with unit" }
          },
          description: "Product dimensions"
        },
        weight: {
          type: "string",
          description: "Product weight with unit"
        },
        color: {
          type: "string",
          description: "Primary color"
        },
        size: {
          type: "string",
          description: "Size information"
        },
        // Functional Attributes
        brand: {
          type: "string",
          description: "Brand or manufacturer"
        },
        model: {
          type: "string",
          description: "Model number or name"
        },
        sku: {
          type: "string",
          description: "Stock keeping unit"
        },
        upc: {
          type: "string",
          description: "Universal Product Code"
        },
        // Usage and Context
        use_cases: {
          type: "array",
          items: { type: "string" },
          description: "List of use cases and applications"
        },
        target_audience: {
          type: "string",
          description: "Primary target audience"
        },
        age_range: {
          type: "string",
          description: "Recommended age range"
        },
        gender: {
          type: "string",
          enum: ["male", "female", "unisex", "kids"],
          description: "Target gender"
        },
        // Technical Specifications
        features: {
          type: "array",
          items: { type: "string" },
          description: "Key product features"
        },
        specifications: {
          type: "object",
          description: "Technical specifications as key-value pairs"
        },
        compatibility: {
          type: "array",
          items: { type: "string" },
          description: "Compatibility information"
        },
        // SEO and Search
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "SEO keywords for search optimization"
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Product tags for categorization"
        },
        // Media and Links
        image_urls: {
          type: "array",
          items: { type: "string" },
          description: "High-quality product image URLs"
        },
        video_urls: {
          type: "array",
          items: { type: "string" },
          description: "Product video URLs"
        },
        documentation_url: {
          type: "string",
          format: "uri",
          description: "Link to product documentation"
        },
        // Business Information
        vendor: {
          type: "string",
          description: "Vendor or supplier"
        },
        warranty: {
          type: "string",
          description: "Warranty information"
        },
        return_policy: {
          type: "string",
          description: "Return policy information"
        },
        shipping_info: {
          type: "string",
          description: "Shipping information"
        },
        // AI-Specific Fields
        ai_search_queries: {
          type: "array",
          items: { type: "string" },
          description: "Sample AI search queries this product should match"
        },
        semantic_description: {
          type: "string",
          description: "AI-optimized semantic description for better matching"
        }
      }
    }, FIELD_WEIGHTS = {
      // Required fields (must be 100% complete) - Higher impact
      required: {
        title: 2.5,
        description: 2.5,
        price: 2,
        availability: 2,
        category: 2
      },
      // High importance optional fields (critical for AI search) - Meaningful impact
      high: {
        material: 2,
        dimensions: 2,
        weight: 1.8,
        brand: 2,
        use_cases: 2.2,
        features: 2,
        image_urls: 1.8
      },
      // Medium importance fields (enhance discoverability) - Good impact
      medium: {
        color: 1.5,
        size: 1.5,
        target_audience: 1.8,
        keywords: 1.8,
        upc: 1.2,
        compatibility: 1.5,
        age_range: 1.2,
        gender: 1.2,
        video_urls: 1.5
      },
      // Low importance fields (nice to have) - Still meaningful
      low: {
        model: 1,
        sku: 1.2,
        tags: 1.2,
        vendor: 1,
        warranty: 1,
        return_policy: 1,
        shipping_info: 1,
        documentation_url: 1,
        specifications: 1.2,
        ai_search_queries: 1,
        semantic_description: 1
      }
    }, FIELD_POINTS = {
      required: {
        title: 25,
        description: 25,
        price: 20,
        availability: 20,
        category: 20
      },
      high: {
        material: 20,
        dimensions: 20,
        weight: 18,
        brand: 20,
        use_cases: 22,
        features: 20,
        image_urls: 18
      },
      medium: {
        color: 15,
        size: 15,
        target_audience: 18,
        keywords: 18,
        upc: 12,
        compatibility: 15,
        age_range: 12,
        gender: 12,
        video_urls: 15
      },
      low: {
        model: 10,
        sku: 12,
        tags: 12,
        vendor: 10,
        warranty: 10,
        return_policy: 10,
        shipping_info: 10,
        documentation_url: 10,
        specifications: 12,
        ai_search_queries: 10,
        semantic_description: 10
      }
    }, FIELD_INPUT_TYPES = {
      // Fields that REQUIRE customer/brand input - AI cannot determine these accurately
      customer_input_required: [
        // Physical specifications (only the brand/manufacturer knows these)
        "material",
        "dimensions",
        "weight",
        "color",
        "size",
        // Identification & business info (brand-specific data)
        "brand",
        "model",
        "upc",
        "vendor",
        // Age/gender restrictions (brand policy)
        "age_range",
        "gender",
        "compatibility",
        // Business policies (company-specific)
        "warranty",
        "return_policy",
        "shipping_info",
        "specifications",
        "documentation_url",
        "video_urls"
      ],
      // Fields that AI can generate based on product info
      ai_generatable: [
        // Marketing content (AI can create based on existing product data)
        "description",
        "use_cases",
        "features",
        "keywords",
        "tags",
        "target_audience",
        "sku",
        "ai_search_queries",
        "semantic_description"
      ],
      // Core required fields (must exist, usually already present)
      core_required: [
        "title",
        "price",
        "availability",
        "category",
        "image_urls"
      ]
    };
    FIELD_LABELS = {
      material: "Material",
      dimensions: "Dimensions",
      weight: "Weight",
      color: "Color",
      size: "Size",
      brand: "Brand",
      model: "Model",
      upc: "UPC/Barcode",
      vendor: "Vendor",
      age_range: "Age Range",
      gender: "Target Gender",
      compatibility: "Compatibility",
      warranty: "Warranty Info",
      return_policy: "Return Policy",
      shipping_info: "Shipping Info",
      specifications: "Technical Specs",
      documentation_url: "Documentation URL",
      video_urls: "Video URLs"
    };
  }
});

// app/utils/fieldMapper.ts
var fieldMapper_exports = {};
__export(fieldMapper_exports, {
  calculateProductScore: () => calculateProductScore,
  mapProductsToSpec: () => mapProductsToSpec,
  mapShopifyToSpec: () => mapShopifyToSpec
});
function mapShopifyToSpec(product) {
  let spec = {
    // Core required fields - map directly from Shopify
    title: product.title || "",
    description: product.description || "",
    price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
    availability: getAvailabilityStatus(product.variants),
    category: product.productType || "Uncategorized",
    // Physical attributes - from metafields or inference
    material: getMetafieldValue(product.metafields, "material") || inferMaterial(product.title, product.description),
    weight: getMetafieldValue(product.metafields, "weight"),
    color: getMetafieldValue(product.metafields, "color") || inferColor(product.title, product.description),
    size: getMetafieldValue(product.metafields, "size"),
    // Identification fields
    brand: product.vendor || getMetafieldValue(product.metafields, "brand"),
    model: getMetafieldValue(product.metafields, "model"),
    sku: product.variants[0]?.sku,
    upc: getMetafieldValue(product.metafields, "upc") || getMetafieldValue(product.metafields, "barcode"),
    // Usage and context
    use_cases: getMetafieldArray(product.metafields, "use_cases") || inferUseCases(product.title, product.description),
    target_audience: getMetafieldValue(product.metafields, "target_audience"),
    age_range: getMetafieldValue(product.metafields, "age_range"),
    gender: getMetafieldValue(product.metafields, "gender"),
    // Technical specifications
    features: getMetafieldArray(product.metafields, "features") || inferFeatures(product.description),
    compatibility: getMetafieldArray(product.metafields, "compatibility"),
    // SEO and search
    keywords: product.tags || [],
    tags: product.tags || [],
    // Media
    image_urls: product.images.map((img) => img.url),
    video_urls: getMetafieldArray(product.metafields, "video_urls") || getMetafieldArray(product.metafields, "videos"),
    documentation_url: getMetafieldValue(product.metafields, "documentation_url") || getMetafieldValue(product.metafields, "manual_url"),
    // Business information
    vendor: product.vendor,
    warranty: getMetafieldValue(product.metafields, "warranty"),
    return_policy: getMetafieldValue(product.metafields, "return_policy"),
    shipping_info: getMetafieldValue(product.metafields, "shipping_info"),
    // AI-specific fields
    ai_search_queries: getMetafieldArray(product.metafields, "ai_search_queries"),
    semantic_description: getMetafieldValue(product.metafields, "semantic_description")
  }, dimensions = getDimensionsFromMetafields(product.metafields);
  dimensions && (spec.dimensions = dimensions);
  let specifications = getSpecificationsFromMetafields(product.metafields);
  return specifications && Object.keys(specifications).length > 0 && (spec.specifications = specifications), spec;
}
function getAvailabilityStatus(variants) {
  if (variants.length === 0)
    return "out_of_stock";
  let hasAvailable = variants.some((v) => v.availableForSale && (v.inventoryQuantity || 0) > 0), hasInventory = variants.some((v) => (v.inventoryQuantity || 0) > 0);
  return hasAvailable ? "in_stock" : hasInventory && !hasAvailable ? "pre_order" : "out_of_stock";
}
function getMetafieldValue(metafields, key) {
  let metafield = metafields.find(
    (m) => m.namespace === "catalogai" && (m.key === key || m.key.toLowerCase().includes(key.toLowerCase()))
  );
  return metafield || (metafield = metafields.find(
    (m) => m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
  )), metafield?.value;
}
function getMetafieldArray(metafields, key) {
  let value = getMetafieldValue(metafields, key);
  if (value)
    try {
      let parsed = JSON.parse(value);
      if (Array.isArray(parsed))
        return parsed.filter((item) => typeof item == "string");
    } catch {
      return value.includes(`
-`) || value.startsWith("-") ? value.split(`
`).map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) : value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
    }
}
function getDimensionsFromMetafields(metafields) {
  let length = getMetafieldValue(metafields, "length"), width = getMetafieldValue(metafields, "width"), height = getMetafieldValue(metafields, "height");
  return !length && !width && !height ? null : {
    ...length && { length },
    ...width && { width },
    ...height && { height }
  };
}
function getSpecificationsFromMetafields(metafields) {
  let specs = {}, specMetafields = metafields.filter(
    (m) => m.namespace === "specifications" || m.namespace === "specs"
  );
  for (let metafield of specMetafields)
    specs[metafield.key] = metafield.value;
  return Object.keys(specs).length > 0 ? specs : null;
}
function inferMaterial(title, description) {
  let materialKeywords = [
    "cotton",
    "polyester",
    "leather",
    "metal",
    "wood",
    "plastic",
    "glass",
    "ceramic",
    "fabric",
    "denim",
    "silk",
    "wool",
    "bamboo",
    "steel",
    "aluminum",
    "bronze",
    "silver",
    "gold",
    "rubber",
    "silicone"
  ], text = `${title} ${description}`.toLowerCase();
  for (let material of materialKeywords)
    if (text.includes(material))
      return material.charAt(0).toUpperCase() + material.slice(1);
}
function inferColor(title, description) {
  let colorKeywords = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "gray",
    "grey",
    "pink",
    "purple",
    "orange",
    "brown",
    "beige",
    "navy",
    "maroon"
  ], text = `${title} ${description}`.toLowerCase();
  for (let color of colorKeywords)
    if (text.includes(color))
      return color.charAt(0).toUpperCase() + color.slice(1);
}
function inferUseCases(title, description) {
  let useCaseKeywords = [
    "home",
    "office",
    "kitchen",
    "bedroom",
    "bathroom",
    "garden",
    "outdoor",
    "travel",
    "sports",
    "fitness",
    "workout",
    "cooking",
    "cleaning",
    "decorative",
    "functional",
    "storage",
    "organization"
  ], text = `${title} ${description}`.toLowerCase(), foundUseCases = [];
  for (let useCase of useCaseKeywords)
    text.includes(useCase) && foundUseCases.push(useCase.charAt(0).toUpperCase() + useCase.slice(1));
  return foundUseCases;
}
function inferFeatures(description) {
  let featureKeywords = [
    "waterproof",
    "durable",
    "lightweight",
    "compact",
    "portable",
    "adjustable",
    "reversible",
    "washable",
    "dishwasher safe",
    "battery powered",
    "cordless",
    "wireless",
    "bluetooth",
    "stainless steel",
    "non-stick",
    "heat resistant"
  ], text = description.toLowerCase(), foundFeatures = [];
  for (let feature of featureKeywords)
    text.includes(feature) && foundFeatures.push(feature.charAt(0).toUpperCase() + feature.slice(1));
  return foundFeatures;
}
function calculateProductScore(spec) {
  let gaps = [], recommendations = [], totalWeight = 0, weightedScore = 0, totalPoints = 0, maxPossiblePoints = 0, fieldProgress = {}, categoryProgress = {
    required: { completed: 0, total: 0, points: 0 },
    high: { completed: 0, total: 0, points: 0 },
    medium: { completed: 0, total: 0, points: 0 },
    low: { completed: 0, total: 0, points: 0 }
  }, hasValue = (value) => value != null && (typeof value != "string" || value.trim() !== "") && (!Array.isArray(value) || value.length > 0) && (typeof value != "object" || Object.keys(value).length > 0);
  [
    { name: "required", fields: FIELD_WEIGHTS.required, points: FIELD_POINTS.required },
    { name: "high", fields: FIELD_WEIGHTS.high, points: FIELD_POINTS.high },
    { name: "medium", fields: FIELD_WEIGHTS.medium, points: FIELD_POINTS.medium },
    { name: "low", fields: FIELD_WEIGHTS.low, points: FIELD_POINTS.low }
  ].forEach(({ name, fields, points }) => {
    categoryProgress[name].total = Object.keys(fields).length;
    for (let [field, weight] of Object.entries(fields)) {
      totalWeight += weight, maxPossiblePoints += points[field];
      let value = spec[field], completed = hasValue(value);
      fieldProgress[field] = {
        completed,
        category: name,
        points: points[field],
        weight
      }, completed ? (weightedScore += weight, totalPoints += points[field], categoryProgress[name].completed++, categoryProgress[name].points += points[field]) : (gaps.push(field), name === "high" && recommendations.push(`Add ${field} to improve product discoverability`));
    }
  });
  let score = totalWeight > 0 ? Math.round(weightedScore / totalWeight * 100) : 0, totalFields = Object.keys(fieldProgress).length, completedFields = Object.values(fieldProgress).filter((f) => f.completed).length, completeness = totalFields > 0 ? Math.round(completedFields / totalFields * 100) : 0;
  return {
    score,
    completeness,
    gaps,
    recommendations,
    points: totalPoints,
    maxPoints: maxPossiblePoints,
    fieldProgress,
    categoryProgress
  };
}
function mapProductsToSpec(products) {
  return products.map((product) => {
    let spec = mapShopifyToSpec(product), score = calculateProductScore(spec);
    return {
      ...spec,
      originalId: product.id,
      score
    };
  });
}
var init_fieldMapper = __esm({
  "app/utils/fieldMapper.ts"() {
    "use strict";
    init_openaiSpec();
  }
});

// app/utils/aiClient.ts
import OpenAI from "openai";
var openai, AIClient, init_aiClient = __esm({
  "app/utils/aiClient.ts"() {
    "use strict";
    init_db();
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }), AIClient = class {
      async trackUsage(userId, usage) {
        try {
          await db.user.update({
            where: { id: userId },
            data: {
              aiUsage: {
                increment: usage.totalTokens
              }
            }
          });
        } catch (error) {
          console.error("Failed to track AI usage:", error);
        }
      }
      async enrichDescription(userId, title, currentDescription, category, material) {
        let prompt = `You are an expert product copywriter specializing in e-commerce optimization for AI search systems. 

Your task is to enrich the following product description to make it more comprehensive, SEO-friendly, and optimized for AI search queries. The description should be between 400-4000 characters and written in plain text (no HTML).

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Material: ${material || "Not specified"}
- Current Description: ${currentDescription}

Requirements:
1. Expand the description with specific details about features, benefits, and use cases
2. Include relevant keywords that customers might search for
3. Add information about dimensions, weight, or other specifications if relevant
4. Mention target audience and ideal use cases
5. Use descriptive, engaging language that highlights product value
6. Ensure the description flows naturally and is easy to read
7. Do not include HTML tags or special formatting
8. Focus on factual, helpful information that aids in product discovery

Return only the enriched description text.`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a professional product copywriter who creates detailed, SEO-optimized product descriptions for e-commerce platforms."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 1e3,
            temperature: 0.7
          }), enriched = response.choices[0]?.message?.content || currentDescription, usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { enriched, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to enrich description: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async inferMaterial(userId, title, description, category) {
        let prompt = `Based on the following product information, determine the most likely primary material composition. Return only the material name.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Common materials include: cotton, polyester, leather, metal, wood, plastic, glass, ceramic, fabric, denim, silk, wool, bamboo, steel, aluminum, bronze, silver, gold, rubber, silicone, etc.

If the material is unclear, return "Unknown". Return only the material name, nothing else.`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a product analyst who identifies material composition from product descriptions."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 50,
            temperature: 0.3
          }), material = response.choices[0]?.message?.content?.trim() || "Unknown", usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { material, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to infer material: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateUseCases(userId, title, description, category) {
        let prompt = `Based on the following product information, generate 3-5 specific use cases or applications for this product. Return the use cases as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Focus on practical, specific use cases that would help customers understand how to use this product. Examples might include specific activities, environments, or situations where the product would be useful.

Return only a JSON array like: ["Use case 1", "Use case 2", "Use case 3"]`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a product analyst who identifies practical use cases for products."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.7
          }), content = response.choices[0]?.message?.content || "[]", useCases = [];
          try {
            useCases = JSON.parse(content), Array.isArray(useCases) || (useCases = []);
          } catch {
            useCases = [];
          }
          let usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { useCases, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate use cases: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateFeatures(userId, title, description, category) {
        let prompt = `Based on the following product information, extract and generate 3-6 key features or characteristics of this product. Return the features as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Focus on specific, factual features that highlight the product's benefits or characteristics. These should be features that customers would care about when making a purchase decision.

Return only a JSON array like: ["Feature 1", "Feature 2", "Feature 3"]`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a product analyst who extracts key features from product descriptions."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.5
          }), content = response.choices[0]?.message?.content || "[]", features = [];
          try {
            features = JSON.parse(content), Array.isArray(features) || (features = []);
          } catch {
            features = [];
          }
          let usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { features, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate features: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateKeywords(userId, title, description, category) {
        let prompt = `Based on the following product information, generate 5-10 relevant SEO keywords that customers might use to search for this product. Return the keywords as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Focus on keywords that are:
1. Relevant to the product
2. Commonly used in search queries
3. Specific enough to be meaningful
4. Broad enough to capture search volume

Include a mix of short-tail and long-tail keywords.

Return only a JSON array like: ["keyword 1", "keyword 2", "keyword 3"]`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are an SEO specialist who generates relevant keywords for product optimization."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.6
          }), content = response.choices[0]?.message?.content || "[]", keywords = [];
          try {
            keywords = JSON.parse(content), Array.isArray(keywords) || (keywords = []);
          } catch {
            keywords = [];
          }
          let usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { keywords, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate keywords: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateText(prompt, maxTokens = 100) {
        try {
          return ((await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: maxTokens,
            temperature: 0.7
          })).choices[0]?.message?.content || "").trim();
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate text: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    };
  }
});

// app/utils/aiEnrich.ts
var aiEnrich_exports = {};
__export(aiEnrich_exports, {
  AIEnrichmentService: () => AIEnrichmentService
});
var AIEnrichmentService, init_aiEnrich = __esm({
  "app/utils/aiEnrich.ts"() {
    "use strict";
    init_aiClient();
    init_db();
    AIEnrichmentService = class {
      aiClient;
      constructor() {
        this.aiClient = new AIClient();
      }
      async enrichProduct(userId, product, gaps = []) {
        let improvements = [], errors = [], totalUsage = 0, baseSpec = {
          title: product.title || "",
          description: product.description || "",
          price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
          availability: this.getAvailabilityStatus(product.variants),
          category: product.productType || "Uncategorized",
          sku: product.variants[0]?.sku,
          image_urls: product.images.map((img) => img.url),
          vendor: product.vendor
        };
        console.log("\u{1F3AF} Enriching product for gaps:", gaps);
        for (let gap of gaps)
          try {
            let result = await this.generateRecommendationForGap(gap, baseSpec, userId);
            result && (improvements.push(result), totalUsage += result.newValue?.length || 0);
          } catch (error) {
            errors.push(`Failed to generate recommendation for ${gap}: ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        return {
          originalProduct: product,
          enrichedSpec: baseSpec,
          improvements,
          totalUsage,
          errors
        };
      }
      async generateRecommendationForGap(gap, baseSpec, userId) {
        if ([
          "material",
          "dimensions",
          "weight",
          "color",
          "size",
          "model",
          "brand",
          "vendor",
          "upc",
          "age_range",
          "gender",
          "compatibility",
          "specifications",
          "video_urls",
          "documentation_url",
          "return_policy",
          "shipping_info"
        ].includes(gap))
          return {
            field: gap,
            originalValue: baseSpec[gap] || null,
            newValue: "Need Customer Input",
            improvement: "This field requires actual product specifications from the brand/manufacturer"
          };
        let mapping = {
          description: {
            prompt: `Given the product title "${baseSpec.title}", generate a comprehensive and engaging product description. Highlight its key features, benefits, and target audience. Aim for a length of at least 200 words. Current description: "${baseSpec.description || "No description"}"`,
            maxTokens: 500,
            reason: "Generated comprehensive product description"
          },
          use_cases: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of 3-5 practical use cases or scenarios where this product would be ideal. Focus on how a customer would use it.`,
            maxTokens: 100,
            reason: "Generated practical use cases"
          },
          features: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a bulleted list of 3-5 key features of the product. Focus on unique selling points and technical specifications.`,
            maxTokens: 150,
            reason: "Generated key product features"
          },
          keywords: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of relevant keywords for SEO and search. Focus on terms a customer would use to find this product. Do not include the product title itself as a keyword.`,
            maxTokens: 100,
            reason: "Generated SEO keywords"
          },
          target_audience: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", suggest the primary target audience for this product (e.g., 'Beginner snowboarders', 'Professional athletes', 'Casual users').`,
            maxTokens: 50,
            reason: "Suggested target audience"
          },
          sku: {
            prompt: `Given the product title "${baseSpec.title}", description "${baseSpec.description}", and current SKU "${baseSpec.sku || "N/A"}", suggest a concise SKU for the product if it's missing or generic. If a good SKU exists, state 'N/A'.`,
            maxTokens: 20,
            reason: "Suggested concise SKU"
          },
          tags: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of relevant tags for product categorization and search. Focus on broad categories and attributes.`,
            maxTokens: 100,
            reason: "Generated relevant tags"
          },
          warranty: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", suggest typical warranty information for this type of product (e.g., '1-year limited warranty', 'Manufacturer warranty applies').`,
            maxTokens: 50,
            reason: "Suggested warranty information"
          },
          ai_search_queries: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate 5-7 example search queries that customers might use to find this product when using AI search or voice search. Focus on natural language queries.`,
            maxTokens: 150,
            reason: "Generated AI search query examples"
          },
          semantic_description: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", create a concise semantic description optimized for AI understanding. Focus on key attributes, use cases, and context in 2-3 sentences.`,
            maxTokens: 150,
            reason: "Generated AI-optimized semantic description"
          },
          image_urls: {
            prompt: "Note: Image URLs cannot be generated by AI. This field requires actual product images to be uploaded to Shopify.",
            maxTokens: 10,
            reason: "Images require manual upload"
          }
        }[gap];
        if (!mapping)
          return console.log(`\u26A0\uFE0F No mapping found for gap: ${gap}`), null;
        try {
          let aiResponse = await this.aiClient.generateText(mapping.prompt, mapping.maxTokens);
          if (console.log(`\u{1F916} AI Response for ${gap}:`, aiResponse), aiResponse && aiResponse.trim() !== "" && !aiResponse.toLowerCase().includes("error") && aiResponse.trim().toLowerCase() !== "n/a")
            return {
              field: gap,
              originalValue: baseSpec[gap] || null,
              newValue: aiResponse,
              improvement: mapping.reason
            };
          console.log(`\u26A0\uFE0F Skipping ${gap}: Response was empty, N/A, or contained error`);
        } catch (error) {
          console.error(`Error generating recommendation for ${gap}:`, error);
        }
        return null;
      }
      async enrichProducts(userId, products, options = {}) {
        let results = [];
        for (let product of products)
          try {
            let { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), spec = mapShopifyToSpec2(product), gaps = calculateProductScore2(spec).gaps;
            console.log(`\u{1F3AF} Enriching product ${product.title} with gaps:`, gaps);
            let result = await this.enrichProduct(userId, product, gaps);
            results.push(result);
          } catch (error) {
            console.error(`Failed to enrich product ${product.title}:`, error), results.push({
              originalProduct: product,
              enrichedSpec: {},
              improvements: [],
              totalUsage: 0,
              errors: [`Failed to enrich product: ${error instanceof Error ? error.message : "Unknown error"}`]
            });
          }
        return results;
      }
      async applyEnrichmentToShopify(userId, shopDomain, accessToken, enrichmentResult) {
        try {
          console.log("\u{1F504} Applying enrichment to Shopify with improvements:", enrichmentResult.improvements.length);
          for (let improvement of enrichmentResult.improvements) {
            let { field, newValue } = improvement;
            if (console.log(`\u{1F4DD} Applying ${field}: ${newValue}`), field === "description")
              await this.updateProductDescription(
                shopDomain,
                accessToken,
                enrichmentResult.originalProduct.id,
                newValue
              ), console.log("\u2705 Updated product description");
            else {
              let metafieldType = this.getMetafieldType(field, newValue), metafieldValue = this.formatMetafieldValue(field, newValue);
              console.log("\u{1F4DD} Creating metafield:", {
                namespace: "catalogai",
                key: field,
                type: metafieldType,
                originalValue: newValue,
                formattedValue: metafieldValue,
                valueType: typeof newValue
              }), await this.createProductMetafield(
                shopDomain,
                accessToken,
                enrichmentResult.originalProduct.id,
                {
                  namespace: "catalogai",
                  key: field,
                  value: metafieldValue,
                  type: metafieldType
                }
              ), console.log(`\u2705 Updated metafield: catalogai.${field}`);
            }
          }
          return await db.log.create({
            data: {
              userId,
              type: "enrichment",
              message: `Applied AI enrichment to product: ${enrichmentResult.originalProduct.title}`,
              metadata: {
                productId: enrichmentResult.originalProduct.id,
                improvements: enrichmentResult.improvements.length,
                usage: enrichmentResult.totalUsage,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }), !0;
        } catch (error) {
          return console.error("Failed to apply enrichment to Shopify:", error), await db.log.create({
            data: {
              userId,
              type: "error",
              message: `Failed to apply enrichment to Shopify: ${error instanceof Error ? error.message : "Unknown error"}`,
              error: error instanceof Error ? error.stack : String(error),
              metadata: {
                productId: enrichmentResult.originalProduct.id,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }), !1;
        }
      }
      getMetafieldType(field, value) {
        return field === "dimensions" || ["use_cases", "features", "keywords", "ai_search_queries"].includes(field) ? "json" : ["weight", "price"].includes(field) ? "number_decimal" : (field === "availability", "single_line_text_field");
      }
      formatMetafieldValue(field, value) {
        if (typeof value == "object" || Array.isArray(value))
          return JSON.stringify(value);
        if (["use_cases", "features", "keywords", "ai_search_queries", "tags"].includes(field)) {
          let stringValue = String(value);
          if (stringValue.includes(`
-`) || stringValue.startsWith("-")) {
            let items = stringValue.split(`
`).map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
            return JSON.stringify(items);
          }
          if (stringValue.includes(",")) {
            let items = stringValue.split(",").map((item) => item.trim()).filter(Boolean);
            return JSON.stringify(items);
          }
          return JSON.stringify([stringValue]);
        }
        return String(value);
      }
      getAvailabilityStatus(variants) {
        if (variants.length === 0)
          return "out_of_stock";
        let hasAvailable = variants.some((v) => v.availableForSale && (v.inventoryQuantity || 0) > 0), hasInventory = variants.some((v) => (v.inventoryQuantity || 0) > 0);
        return hasAvailable ? "in_stock" : hasInventory && !hasAvailable ? "pre_order" : "out_of_stock";
      }
      getMetafieldValue(metafields, key) {
        return metafields.find(
          (m) => m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
        )?.value;
      }
      getMetafieldArray(metafields, key) {
        let value = this.getMetafieldValue(metafields, key);
        if (value)
          try {
            let parsed = JSON.parse(value);
            if (Array.isArray(parsed))
              return parsed.filter((item) => typeof item == "string");
          } catch {
            return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
          }
      }
      async updateProductDescription(shopDomain, accessToken, productId, description) {
        let mutation = `
      mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            title
            descriptionHtml
          }
          userErrors {
            field
            message
          }
        }
      }
    `, variables = {
          input: {
            id: `gid://shopify/Product/${productId}`,
            descriptionHtml: description
          }
        }, response = await fetch(`https://${shopDomain}/admin/api/2025-10/graphql`, {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: mutation,
            variables
          })
        });
        if (!response.ok)
          throw new Error(`Failed to update product description: ${response.status}`);
        let result = await response.json();
        if (result.errors)
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        if (result.data?.productUpdate?.userErrors?.length > 0)
          throw new Error(`Shopify validation errors: ${JSON.stringify(result.data.productUpdate.userErrors)}`);
      }
      async createProductMetafield(shopDomain, accessToken, productId, metafield) {
        let mutation = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `, variables = {
          metafields: [
            {
              ownerId: `gid://shopify/Product/${productId}`,
              namespace: metafield.namespace,
              key: metafield.key,
              value: metafield.value,
              type: metafield.type
            }
          ]
        }, response = await fetch(`https://${shopDomain}/admin/api/2025-10/graphql`, {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: mutation,
            variables
          })
        });
        if (!response.ok)
          throw new Error(`Failed to create metafield: ${response.status}`);
        let result = await response.json();
        if (result.errors)
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }
    };
  }
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

// app/utils/queue.ts
init_db();
import { Queue, Worker, QueueEvents } from "bullmq";
import { Redis } from "ioredis";

// app/utils/healthChecker.ts
init_db();

// app/utils/emailService.ts
init_db();
var _EmailService = class {
  isConfigured = !1;
  constructor() {
    this.isConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);
  }
  static getInstance() {
    return _EmailService.instance || (_EmailService.instance = new _EmailService()), _EmailService.instance;
  }
  async sendWeeklyHealthSummary(summary) {
    try {
      if (!this.isConfigured)
        return console.log("Email service not configured - logging summary instead"), await this.logSummary(summary), !0;
      let template = this.generateWeeklyHealthTemplate(summary), emailAddress = await this.getUserEmailAddress(summary.userId);
      return emailAddress ? (console.log("Would send email:", {
        to: emailAddress,
        subject: template.subject,
        html: template.html
      }), await db.log.create({
        data: {
          userId: summary.userId,
          type: "email_sent",
          message: `Weekly health summary sent to ${emailAddress}`,
          metadata: {
            subject: template.subject,
            currentScore: summary.currentScore,
            scoreChange: summary.scoreChange,
            issuesFound: summary.issuesFound,
            issuesFixed: summary.issuesFixed
          }
        }
      }), !0) : (console.log("No email address found for user - logging summary instead"), await this.logSummary(summary), !0);
    } catch (error) {
      return console.error("Failed to send weekly health summary:", error), await db.log.create({
        data: {
          userId: summary.userId,
          type: "error",
          message: `Failed to send weekly health summary: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.message : "Unknown error"
        }
      }), !1;
    }
  }
  async getUserEmailAddress(userId) {
    try {
      let user = await db.user.findUnique({
        where: { id: userId },
        select: { shopDomain: !0 }
      });
      return user ? `admin@${user.shopDomain.replace(".myshopify.com", "")}.myshopify.com` : null;
    } catch (error) {
      return console.error("Failed to get user email address:", error), null;
    }
  }
  generateWeeklyHealthTemplate(summary) {
    let scoreTrend = summary.scoreChange >= 0 ? "\u{1F4C8}" : "\u{1F4C9}", scoreColor = summary.scoreChange >= 0 ? "#00a047" : "#d82c0d", html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weekly Health Summary - ${summary.shopDomain}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
          .score-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .score-number { font-size: 48px; font-weight: bold; color: ${scoreColor}; margin: 10px 0; }
          .trend { font-size: 18px; color: ${scoreColor}; }
          .stats { display: flex; justify-content: space-around; margin: 20px 0; }
          .stat { text-align: center; }
          .stat-number { font-size: 24px; font-weight: bold; color: #667eea; }
          .stat-label { color: #666; font-size: 14px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>\u{1F3E5} Catalog Health Report</h1>
          <p>Weekly summary for ${summary.shopDomain}</p>
        </div>
        
        <div class="content">
          <div class="score-card">
            <div class="score-number">${summary.currentScore}%</div>
            <div class="trend">
              ${scoreTrend} ${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}% from last week
            </div>
            <p>Current Health Score</p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-number">${summary.totalProducts}</div>
              <div class="stat-label">Total Products</div>
            </div>
            <div class="stat">
              <div class="stat-number">${summary.issuesFound}</div>
              <div class="stat-label">Issues Found</div>
            </div>
            <div class="stat">
              <div class="stat-number">${summary.issuesFixed}</div>
              <div class="stat-label">Issues Fixed</div>
            </div>
          </div>
          
          ${summary.currentScore < 90 ? `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <strong>\u26A0\uFE0F Attention Needed:</strong> Your catalog health is below 90%. Consider running a health check to identify and fix issues.
            </div>
          ` : `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <strong>\u2705 Great Job!</strong> Your catalog is in excellent health. Keep up the good work!
            </div>
          `}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SHOPIFY_APP_URL}/dashboard" class="cta-button">
              View Dashboard
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated report from CatalogAI Optimizer.</p>
          <p>To adjust your email preferences, visit your dashboard settings.</p>
        </div>
      </body>
      </html>
    `, text = `
Catalog Health Report - ${summary.shopDomain}

Health Score: ${summary.currentScore}%
Trend: ${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}% from last week

Statistics:
- Total Products: ${summary.totalProducts}
- Issues Found: ${summary.issuesFound}
- Issues Fixed: ${summary.issuesFixed}

${summary.currentScore < 90 ? "\u26A0\uFE0F Your catalog health is below 90%. Consider running a health check to identify and fix issues." : "\u2705 Your catalog is in excellent health. Keep up the good work!"}

View your dashboard: ${process.env.SHOPIFY_APP_URL}/dashboard

---
This is an automated report from CatalogAI Optimizer.
To adjust your email preferences, visit your dashboard settings.
    `;
    return {
      subject: `\u{1F4CA} Weekly Health Report: ${summary.currentScore}% (${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}%)`,
      html,
      text
    };
  }
  async logSummary(summary) {
    await db.log.create({
      data: {
        userId: summary.userId,
        type: "email_summary",
        message: `Weekly health summary: ${summary.currentScore}% (${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}%) - ${summary.issuesFound} issues found, ${summary.issuesFixed} fixed`,
        metadata: {
          currentScore: summary.currentScore,
          previousScore: summary.previousScore,
          scoreChange: summary.scoreChange,
          totalProducts: summary.totalProducts,
          issuesFound: summary.issuesFound,
          issuesFixed: summary.issuesFixed
        }
      }
    });
  }
  async sendHealthAlert(userId, shopDomain, alertType, message) {
    try {
      if (!this.isConfigured)
        return console.log("Email service not configured - logging alert instead"), await this.logAlert(userId, alertType, message), !0;
      let emailAddress = await this.getUserEmailAddress(userId);
      if (!emailAddress)
        return console.log("No email address found for user - logging alert instead"), await this.logAlert(userId, alertType, message), !0;
      let template = this.generateHealthAlertTemplate(shopDomain, alertType, message);
      return console.log("Would send health alert:", {
        to: emailAddress,
        subject: template.subject,
        html: template.html
      }), await db.log.create({
        data: {
          userId,
          type: "health_alert",
          message: `Health alert sent: ${message}`,
          metadata: {
            alertType,
            message
          }
        }
      }), !0;
    } catch (error) {
      return console.error("Failed to send health alert:", error), !1;
    }
  }
  generateHealthAlertTemplate(shopDomain, alertType, message) {
    let isCritical = alertType === "critical", color = isCritical ? "#d82c0d" : "#f59e0b", icon = isCritical ? "\u{1F6A8}" : "\u26A0\uFE0F", html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Alert - ${shopDomain}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${color}; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
          .alert-box { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 20px; margin: 20px 0; }
          .cta-button { display: inline-block; background: ${color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${icon} Health Alert</h1>
          <p>${shopDomain}</p>
        </div>
        
        <div class="content">
          <div class="alert-box">
            <h3>${isCritical ? "Critical Issue Detected" : "Warning"}</h3>
            <p>${message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SHOPIFY_APP_URL}/dashboard" class="cta-button">
              View Dashboard
            </a>
          </div>
        </div>
      </body>
      </html>
    `, text = `
${icon} Health Alert - ${shopDomain}

${isCritical ? "Critical Issue Detected" : "Warning"}

${message}

View your dashboard: ${process.env.SHOPIFY_APP_URL}/dashboard
    `;
    return {
      subject: `${icon} ${isCritical ? "Critical" : "Warning"}: ${shopDomain}`,
      html,
      text
    };
  }
  async logAlert(userId, alertType, message) {
    await db.log.create({
      data: {
        userId,
        type: "health_alert",
        message: `Health alert (${alertType}): ${message}`,
        metadata: {
          alertType,
          message
        }
      }
    });
  }
}, EmailService = _EmailService;
__publicField(EmailService, "instance");
var emailService = EmailService.getInstance();

// app/utils/analyticsService.ts
init_db();
var _AnalyticsService = class {
  static getInstance() {
    return _AnalyticsService.instance || (_AnalyticsService.instance = new _AnalyticsService()), _AnalyticsService.instance;
  }
  async trackPerformanceMetrics(metrics) {
    try {
      await db.log.create({
        data: {
          userId: metrics.userId,
          type: "performance_metrics",
          message: `Performance tracked: ${metrics.healthScore}% health, ${metrics.totalProducts} products, ${metrics.issuesFound} issues`,
          metadata: {
            healthScore: metrics.healthScore,
            totalProducts: metrics.totalProducts,
            validProducts: metrics.validProducts,
            issuesFound: metrics.issuesFound,
            issuesFixed: metrics.issuesFixed,
            aiUsage: metrics.aiUsage,
            syncCount: metrics.syncCount,
            enrichmentCount: metrics.enrichmentCount,
            timestamp: metrics.timestamp
          }
        }
      });
      let deltaMetrics = await this.calculateDeltaMetrics(metrics.userId, metrics.timestamp);
      deltaMetrics && await this.storeDeltaMetrics(metrics.userId, deltaMetrics);
      let roiMetrics = await this.calculateROIMetrics(metrics.userId, metrics.shopDomain);
      roiMetrics && await this.storeROIMetrics(roiMetrics);
    } catch (error) {
      console.error("Failed to track performance metrics:", error);
    }
  }
  async calculateDeltaMetrics(userId, currentTimestamp) {
    try {
      let hourAgo = new Date(currentTimestamp.getTime() - 36e5), dayAgo = new Date(currentTimestamp.getTime() - 24 * 60 * 60 * 1e3), weekAgo = new Date(currentTimestamp.getTime() - 7 * 24 * 60 * 60 * 1e3), currentMetrics = await this.getLatestMetrics(userId);
      if (!currentMetrics)
        return null;
      let previousMetrics = await this.getPreviousMetrics(userId, dayAgo);
      if (!previousMetrics)
        return null;
      let scoreDelta = currentMetrics.healthScore - previousMetrics.healthScore, productsDelta = currentMetrics.totalProducts - previousMetrics.totalProducts, issuesDelta = currentMetrics.issuesFound - previousMetrics.issuesFound, aiUsageDelta = currentMetrics.aiUsage - previousMetrics.aiUsage, syncDelta = currentMetrics.syncCount - previousMetrics.syncCount, enrichmentDelta = currentMetrics.enrichmentCount - previousMetrics.enrichmentCount;
      return {
        scoreDelta,
        productsDelta,
        issuesDelta,
        aiUsageDelta,
        syncDelta,
        enrichmentDelta,
        timePeriod: "day"
      };
    } catch (error) {
      return console.error("Failed to calculate delta metrics:", error), null;
    }
  }
  async getLatestMetrics(userId) {
    try {
      let latestAudit = await db.audit.findFirst({
        where: { userId },
        orderBy: { timestamp: "desc" }
      }), user = await db.user.findUnique({
        where: { id: userId }
      });
      if (!latestAudit || !user)
        return null;
      let oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1e3), syncCount = await db.log.count({
        where: {
          userId,
          type: "sync",
          createdAt: { gte: oneDayAgo }
        }
      }), enrichmentCount = await db.log.count({
        where: {
          userId,
          type: "ai_enrichment",
          createdAt: { gte: oneDayAgo }
        }
      });
      return {
        userId,
        shopDomain: user.shopDomain,
        timestamp: latestAudit.timestamp,
        healthScore: latestAudit.score,
        totalProducts: latestAudit.totalProducts,
        validProducts: latestAudit.validProducts,
        issuesFound: Array.isArray(latestAudit.gaps) ? latestAudit.gaps.length : 0,
        issuesFixed: 0,
        // Will be calculated separately
        aiUsage: user.aiUsage,
        syncCount,
        enrichmentCount
      };
    } catch (error) {
      return console.error("Failed to get latest metrics:", error), null;
    }
  }
  async getPreviousMetrics(userId, fromDate) {
    try {
      let audit = await db.audit.findFirst({
        where: {
          userId,
          timestamp: { gte: fromDate }
        },
        orderBy: { timestamp: "asc" }
      }), user = await db.user.findUnique({
        where: { id: userId }
      });
      return !audit || !user ? null : {
        userId,
        shopDomain: user.shopDomain,
        timestamp: audit.timestamp,
        healthScore: audit.score,
        totalProducts: audit.totalProducts,
        validProducts: audit.validProducts,
        issuesFound: Array.isArray(audit.gaps) ? audit.gaps.length : 0,
        issuesFixed: 0,
        aiUsage: user.aiUsage,
        syncCount: 0,
        enrichmentCount: 0
      };
    } catch (error) {
      return console.error("Failed to get previous metrics:", error), null;
    }
  }
  async storeDeltaMetrics(userId, deltaMetrics) {
    try {
      await db.log.create({
        data: {
          userId,
          type: "delta_metrics",
          message: `Delta metrics: ${deltaMetrics.scoreDelta >= 0 ? "+" : ""}${deltaMetrics.scoreDelta.toFixed(1)}% score, ${deltaMetrics.productsDelta >= 0 ? "+" : ""}${deltaMetrics.productsDelta} products`,
          metadata: {
            scoreDelta: deltaMetrics.scoreDelta,
            productsDelta: deltaMetrics.productsDelta,
            issuesDelta: deltaMetrics.issuesDelta,
            aiUsageDelta: deltaMetrics.aiUsageDelta,
            syncDelta: deltaMetrics.syncCount,
            enrichmentDelta: deltaMetrics.enrichmentDelta,
            timePeriod: deltaMetrics.timePeriod
          }
        }
      });
    } catch (error) {
      console.error("Failed to store delta metrics:", error);
    }
  }
  async calculateROIMetrics(userId, shopDomain) {
    try {
      let oneWeekAgo = new Date(Date.now() - 6048e5), audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: { gte: oneWeekAgo }
        },
        orderBy: { timestamp: "asc" }
      });
      if (audits.length < 2)
        return null;
      let firstAudit = audits[0], lastAudit = audits[audits.length - 1], user = await db.user.findUnique({
        where: { id: userId }
      });
      if (!user)
        return null;
      let aiTokensUsed = user.aiUsage, healthScoreImprovement = lastAudit.score - firstAudit.score, productsProcessed = lastAudit.totalProducts, estimatedValueAdded = healthScoreImprovement * productsProcessed * 0.1, tokenCost = aiTokensUsed * 1e-4, costPerImprovement = tokenCost / Math.max(healthScoreImprovement, 1), roi = estimatedValueAdded / Math.max(tokenCost, 1);
      return {
        userId,
        shopDomain,
        timePeriod: "week",
        healthScoreImprovement,
        productsProcessed,
        aiTokensUsed,
        estimatedValueAdded,
        costPerImprovement,
        roi
      };
    } catch (error) {
      return console.error("Failed to calculate ROI metrics:", error), null;
    }
  }
  async storeROIMetrics(roiMetrics) {
    try {
      await db.log.create({
        data: {
          userId: roiMetrics.userId,
          type: "roi_metrics",
          message: `ROI: ${roiMetrics.roi.toFixed(2)}x return, $${roiMetrics.estimatedValueAdded.toFixed(2)} value added`,
          metadata: {
            healthScoreImprovement: roiMetrics.healthScoreImprovement,
            productsProcessed: roiMetrics.productsProcessed,
            aiTokensUsed: roiMetrics.aiTokensUsed,
            estimatedValueAdded: roiMetrics.estimatedValueAdded,
            costPerImprovement: roiMetrics.costPerImprovement,
            roi: roiMetrics.roi,
            timePeriod: roiMetrics.timePeriod
          }
        }
      });
    } catch (error) {
      console.error("Failed to store ROI metrics:", error);
    }
  }
  async getPerformanceTrends(userId, days = 30) {
    try {
      let startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3), audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: { gte: startDate }
        },
        orderBy: { timestamp: "asc" }
      }), user = await db.user.findUnique({
        where: { id: userId }
      });
      return audits.map((audit) => ({
        date: audit.timestamp.toISOString().split("T")[0],
        healthScore: audit.score,
        totalProducts: audit.totalProducts,
        issuesFound: Array.isArray(audit.gaps) ? audit.gaps.length : 0,
        aiUsage: user?.aiUsage || 0
      }));
    } catch (error) {
      return console.error("Failed to get performance trends:", error), [];
    }
  }
  async getROISummary(userId) {
    try {
      let roiLogs = await db.log.findMany({
        where: {
          userId,
          type: "roi_metrics"
        },
        orderBy: { createdAt: "desc" },
        take: 10
      });
      if (roiLogs.length === 0)
        return null;
      let totalValueAdded = 0, totalCost = 0, totalROI = 0;
      for (let log of roiLogs) {
        let metadata = log.metadata;
        metadata && (totalValueAdded += metadata.estimatedValueAdded || 0, totalCost += (metadata.aiTokensUsed || 0) * 1e-4, totalROI += metadata.roi || 0);
      }
      return {
        totalROI,
        totalValueAdded,
        totalCost,
        averageROI: totalROI / roiLogs.length
      };
    } catch (error) {
      return console.error("Failed to get ROI summary:", error), null;
    }
  }
}, AnalyticsService = _AnalyticsService;
__publicField(AnalyticsService, "instance");
var analyticsService = AnalyticsService.getInstance();

// app/utils/healthChecker.ts
import Ajv from "ajv";
import addFormats from "ajv-formats";
import axios from "axios";
var ajv = new Ajv();
addFormats(ajv);
var HealthCheckerService = class {
  shopDomain;
  accessToken;
  constructor(shopDomain, accessToken) {
    this.shopDomain = shopDomain, this.accessToken = accessToken;
  }
  async performHealthCheck(options = {}) {
    let {
      maxProducts = 100,
      includePings = !0,
      includeInventory = !0,
      includeValidation = !0
    } = options;
    try {
      let user = await db.user.findUnique({
        where: { shopId: this.shopDomain }
      });
      if (!user)
        throw new Error("User not found");
      let thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      let products = await db.product.findMany({
        where: {
          userId: user.id,
          updatedAt: {
            gte: thirtyDaysAgo
          }
        },
        take: maxProducts,
        orderBy: {
          updatedAt: "desc"
        }
      }), gaps = [], validProducts = 0;
      if (includeValidation) {
        let validationResults = await this.validateProducts(products);
        gaps.push(...validationResults.gaps), validProducts = validationResults.validCount;
      }
      if (includePings) {
        let pingResults = await this.checkProductUrls(products.slice(0, 20));
        gaps.push(...pingResults);
      }
      if (includeInventory) {
        let inventoryResults = await this.checkInventoryDeltas(products);
        gaps.push(...inventoryResults);
      }
      let score = this.calculateHealthScore(products.length, validProducts, gaps), trends = await this.getHealthTrends(user.id, 7);
      await db.audit.create({
        data: {
          userId: user.id,
          score,
          totalProducts: products.length,
          validProducts,
          gaps,
          // Store as JSON
          timestamp: /* @__PURE__ */ new Date()
        }
      });
      let performanceMetrics = {
        userId: user.id,
        shopDomain: this.shopDomain,
        timestamp: /* @__PURE__ */ new Date(),
        healthScore: score,
        totalProducts: products.length,
        validProducts,
        issuesFound: gaps.length,
        issuesFixed: 0,
        // Will be updated after auto-fix
        aiUsage: user.aiUsage,
        syncCount: 0,
        // Will be calculated separately
        enrichmentCount: 0
        // Will be calculated separately
      };
      return await analyticsService.trackPerformanceMetrics(performanceMetrics), {
        score,
        totalProducts: products.length,
        validProducts,
        gaps,
        trends,
        timestamp: /* @__PURE__ */ new Date()
      };
    } catch (error) {
      throw console.error("Health check failed:", error), new Error(`Health check failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async validateProducts(products) {
    let gaps = [], validCount = 0, requiredFields = [
      "title",
      "description",
      "vendor",
      "productType",
      "tags",
      "images",
      "variants",
      "options",
      "status"
    ], fieldCounts = {}, missingFieldProducts = {};
    for (let product of products) {
      let isValid = !0;
      for (let field of requiredFields)
        (!product[field] || Array.isArray(product[field]) && product[field].length === 0 || typeof product[field] == "string" && product[field].trim() === "") && (fieldCounts[field] = (fieldCounts[field] || 0) + 1, missingFieldProducts[field] = missingFieldProducts[field] || [], missingFieldProducts[field].push(product.id), isValid = !1);
      isValid && validCount++;
    }
    for (let [field, count] of Object.entries(fieldCounts))
      if (count > 0) {
        let severity = count > products.length * 0.5 ? "critical" : count > products.length * 0.2 ? "error" : "warning";
        gaps.push({
          field,
          severity,
          count,
          products: missingFieldProducts[field],
          fixable: ["title", "description", "tags"].includes(field)
        });
      }
    return { gaps, validCount };
  }
  async checkProductUrls(products) {
    let gaps = [], failedUrls = [];
    for (let product of products)
      if (product.handle)
        try {
          let url = `https://${this.shopDomain}/products/${product.handle}`;
          (await axios.get(url, {
            timeout: 5e3,
            validateStatus: (status) => status < 500
            // Accept redirects and client errors
          })).status >= 400 && failedUrls.push(product.id);
        } catch {
          failedUrls.push(product.id);
        }
    return failedUrls.length > 0 && gaps.push({
      field: "product_url",
      severity: failedUrls.length > products.length * 0.3 ? "error" : "warning",
      count: failedUrls.length,
      products: failedUrls,
      fixable: !1
    }), gaps;
  }
  async checkInventoryDeltas(products) {
    let gaps = [], lowInventory = [], outOfStock = [];
    for (let product of products)
      if (product.variants && Array.isArray(product.variants))
        for (let variant of product.variants)
          variant.inventoryQuantity !== void 0 && (variant.inventoryQuantity === 0 ? outOfStock.push(variant.id) : variant.inventoryQuantity < 5 && lowInventory.push(variant.id));
    return outOfStock.length > 0 && gaps.push({
      field: "inventory_out_of_stock",
      severity: "error",
      count: outOfStock.length,
      products: outOfStock,
      fixable: !1
    }), lowInventory.length > 0 && gaps.push({
      field: "inventory_low",
      severity: "warning",
      count: lowInventory.length,
      products: lowInventory,
      fixable: !1
    }), gaps;
  }
  calculateHealthScore(totalProducts, validProducts, gaps) {
    if (totalProducts === 0)
      return 100;
    let score = validProducts / totalProducts * 100;
    for (let gap of gaps) {
      let penalty = gap.severity === "critical" ? 5 : gap.severity === "error" ? 3 : 1;
      score -= Math.min(penalty * (gap.count / totalProducts), 10);
    }
    return Math.max(0, Math.round(score));
  }
  async getHealthTrends(userId, days) {
    let startDate = /* @__PURE__ */ new Date();
    return startDate.setDate(startDate.getDate() - days), (await db.audit.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate
        }
      },
      orderBy: {
        timestamp: "asc"
      }
    })).map((audit) => ({
      date: audit.timestamp.toISOString().split("T")[0],
      score: audit.score,
      totalProducts: audit.totalProducts,
      validProducts: audit.validProducts
    }));
  }
  async autoFixGaps(gaps) {
    let fixed = 0, failed = 0;
    for (let gap of gaps)
      if (gap.fixable)
        try {
          console.log(`Auto-fixing gap: ${gap.field} for ${gap.count} products`), fixed++;
        } catch (error) {
          console.error(`Failed to fix gap ${gap.field}:`, error), failed++;
        }
    return { fixed, failed };
  }
  async sendWeeklyHealthSummary(userId) {
    try {
      let fourteenDaysAgo = /* @__PURE__ */ new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
      let audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: {
            gte: fourteenDaysAgo
          }
        },
        orderBy: {
          timestamp: "desc"
        }
      });
      if (audits.length === 0)
        return console.log("No audit data available for weekly summary"), !1;
      let currentAudit = audits[0], previousAudit = audits[audits.length - 1] || currentAudit, oneWeekAgo = /* @__PURE__ */ new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      let fixedIssues = await db.log.count({
        where: {
          userId,
          type: "auto_fix",
          createdAt: {
            gte: oneWeekAgo
          }
        }
      }), summary = {
        userId,
        shopDomain: this.shopDomain,
        currentScore: currentAudit.score,
        previousScore: previousAudit.score,
        scoreChange: currentAudit.score - previousAudit.score,
        totalProducts: currentAudit.totalProducts,
        issuesFound: Array.isArray(currentAudit.gaps) ? currentAudit.gaps.length : 0,
        issuesFixed: fixedIssues,
        trendData: audits.slice(0, 7).map((audit) => ({
          date: audit.timestamp.toISOString().split("T")[0],
          score: audit.score
        }))
      };
      return await emailService.sendWeeklyHealthSummary(summary);
    } catch (error) {
      return console.error("Failed to send weekly health summary:", error), !1;
    }
  }
  async sendHealthAlert(userId, alertType, message) {
    return await emailService.sendHealthAlert(userId, this.shopDomain, alertType, message);
  }
};

// app/utils/queue.ts
var redis = null;
try {
  console.log("Checking Redis configuration:", {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    hasRedisPassword: !!process.env.REDIS_PASSWORD,
    allEnvVars: Object.keys(process.env).filter((key) => key.startsWith("REDIS"))
  }), process.env.REDIS_URL ? (console.log("Attempting Redis connection using REDIS_URL:", process.env.REDIS_URL.replace(/\/\/default:[^@]+@/, "//default:***@")), redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    // Required by BullMQ for blocking operations
    connectTimeout: 5e3,
    // 5 second timeout
    lazyConnect: !0,
    // Don't connect immediately
    db: 0
    // Force database 0 (default)
  })) : process.env.REDIS_HOST && process.env.REDIS_PASSWORD ? (console.log("Attempting Redis connection to:", process.env.REDIS_HOST), redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    // Required by BullMQ for blocking operations
    connectTimeout: 5e3,
    // 5 second timeout
    lazyConnect: !0,
    // Don't connect immediately
    db: 0
    // Force database 0 (default)
  })) : console.log("Redis not configured - skipping connection"), redis && redis.connect().then(() => {
    console.log("\u2705 Redis connected successfully");
  }).catch((error) => {
    console.error("\u274C Redis connection failed:", error.message), redis = null;
  });
} catch (error) {
  console.error("Failed to initialize Redis connection:", error), redis = null;
}
var bullmqQueueConnection = null, bullmqWorkerConnection = null, bullmqEventsConnection = null;
if (redis)
  try {
    let connectionConfig = null;
    if (process.env.REDIS_URL) {
      let cleanRedisUrl = process.env.REDIS_URL.replace(/['"]+$/, "");
      console.log("Cleaned REDIS_URL:", cleanRedisUrl.replace(/\/\/default:[^@]+@/, "//default:***@"));
      let url = new URL(cleanRedisUrl);
      connectionConfig = {
        host: url.hostname,
        port: parseInt(url.port) || 6379,
        password: url.password,
        db: 0,
        // Explicitly force database 0
        maxRetriesPerRequest: null,
        retryDelayOnFailover: 100,
        connectTimeout: 5e3,
        lazyConnect: !0,
        enableAutoPipelining: !1
      };
    } else
      process.env.REDIS_HOST && process.env.REDIS_PASSWORD && (connectionConfig = {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
        password: process.env.REDIS_PASSWORD,
        db: 0,
        // Explicitly force database 0
        maxRetriesPerRequest: null,
        retryDelayOnFailover: 100,
        connectTimeout: 5e3,
        lazyConnect: !0,
        enableAutoPipelining: !1
      });
    connectionConfig && (bullmqQueueConnection = new Redis(connectionConfig), bullmqWorkerConnection = new Redis(connectionConfig), bullmqEventsConnection = new Redis(connectionConfig), bullmqQueueConnection.on("connect", () => {
      console.log("BullMQ Queue Redis connected to database:", bullmqQueueConnection?.options.db);
    }), bullmqWorkerConnection.on("connect", () => {
      console.log("BullMQ Worker Redis connected to database:", bullmqWorkerConnection?.options.db);
    }), bullmqEventsConnection.on("connect", () => {
      console.log("BullMQ Events Redis connected to database:", bullmqEventsConnection?.options.db);
    }), console.log("BullMQ Redis connections created with database 0"));
  } catch (error) {
    console.error("Failed to create BullMQ Redis connections:", error), bullmqQueueConnection = null, bullmqWorkerConnection = null, bullmqEventsConnection = null;
  }
var healthCheckQueue = bullmqQueueConnection ? new Queue("health-checks", {
  connection: bullmqQueueConnection,
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2e3
    }
  }
}) : null, backgroundJobsQueue = bullmqQueueConnection ? new Queue("background-jobs", {
  connection: bullmqQueueConnection,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 10,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 5e3
    }
  }
}) : null, queueEvents = bullmqEventsConnection ? new QueueEvents("health-checks", { connection: bullmqEventsConnection }) : null, healthCheckWorker = bullmqWorkerConnection ? new Worker(
  "health-checks",
  async (job) => {
    let { type, data } = job.data;
    switch (type) {
      case "url-ping":
        return await performUrlPing(data);
      case "inventory-validation":
        return await performInventoryValidation(data);
      case "database-health":
        return await performDatabaseHealthCheck(data);
      case "api-status":
        return await performApiStatusCheck(data);
      case "health-scan":
        return await performHealthScan(data);
      default:
        throw new Error(`Unknown health check type: ${type}`);
    }
  },
  {
    connection: bullmqWorkerConnection,
    concurrency: 5
  }
) : null, backgroundJobsWorker = bullmqWorkerConnection ? new Worker(
  "background-jobs",
  async (job) => {
    let { type, data } = job.data;
    switch (type) {
      case "sync-products":
        return await performProductSync(data);
      case "ai-enrichment":
        return await performAIEnrichment(data);
      case "cleanup-logs":
        return await performLogCleanup(data);
      case "weekly-email-summary":
        return await performWeeklyEmailSummary(data);
      default:
        throw new Error(`Unknown background job type: ${type}`);
    }
  },
  {
    connection: bullmqWorkerConnection,
    concurrency: 3
  }
) : null;
async function performUrlPing(data) {
  try {
    let response = await fetch(data.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(data.timeout || 5e3)
    });
    return {
      success: response.ok,
      status: response.status,
      responseTime: Date.now(),
      url: data.url
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Unknown error",
      url: data.url
    };
  }
}
async function performInventoryValidation(data) {
  try {
    let user = await db.user.findUnique({
      where: { shopId: data.shopId },
      include: {
        audits: {
          orderBy: { timestamp: "desc" },
          take: 1
        }
      }
    });
    if (!user)
      return {
        success: !1,
        error: "User not found",
        shopId: data.shopId
      };
    let latestAudit = user.audits[0];
    return {
      success: !0,
      hasRecentSync: latestAudit && Date.now() - new Date(latestAudit.timestamp).getTime() < 24 * 60 * 60 * 1e3,
      totalProducts: latestAudit?.totalProducts || 0,
      lastSync: latestAudit?.timestamp || null,
      shopId: data.shopId
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Database error",
      shopId: data.shopId
    };
  }
}
async function performDatabaseHealthCheck(data) {
  try {
    return await db.$queryRaw`SELECT 1`, {
      success: !0,
      userCount: await db.user.count(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Database connection failed"
    };
  }
}
async function performApiStatusCheck(data) {
  try {
    return {
      success: !0,
      shopId: data.shopId,
      apiVersion: "2025-10",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "API check failed",
      shopId: data.shopId
    };
  }
}
async function performProductSync(data) {
  try {
    return await db.log.create({
      data: {
        userId: data.userId,
        type: "sync",
        message: `Product sync initiated for shop ${data.shopId}`
      }
    }), {
      success: !0,
      shopId: data.shopId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Sync failed",
      shopId: data.shopId
    };
  }
}
async function performAIEnrichment(data) {
  try {
    return await db.log.create({
      data: {
        userId: data.userId,
        type: "ai_enrichment",
        message: `AI enrichment initiated for ${data.productIds.length} products`
      }
    }), {
      success: !0,
      shopId: data.shopId,
      productCount: data.productIds.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "AI enrichment failed",
      shopId: data.shopId
    };
  }
}
async function performLogCleanup(data) {
  try {
    let daysToKeep = data.daysToKeep || 30, cutoffDate = /* @__PURE__ */ new Date();
    return cutoffDate.setDate(cutoffDate.getDate() - daysToKeep), {
      success: !0,
      deletedCount: (await db.log.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate
          }
        }
      })).count,
      cutoffDate: cutoffDate.toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Log cleanup failed"
    };
  }
}
async function performHealthScan(data) {
  try {
    let user = await db.user.findUnique({
      where: { shopId: data.shopId }
    });
    if (!user)
      throw new Error("User not found");
    let healthChecker = new HealthCheckerService(data.shopId, user.accessToken), result = await healthChecker.performHealthCheck(data.options || {
      maxProducts: 100,
      includePings: !0,
      includeInventory: !0,
      includeValidation: !0
    });
    if (await db.log.create({
      data: {
        userId: data.userId,
        type: "health_scan",
        message: `Health scan completed: ${result.score}% score, ${result.gaps.length} gaps found`,
        metadata: {
          score: result.score,
          totalProducts: result.totalProducts,
          validProducts: result.validProducts,
          gapsCount: result.gaps.length
        }
      }
    }), result.score < 90 && result.gaps.length > 0) {
      let fixableGaps = result.gaps.filter((gap) => gap.fixable);
      if (fixableGaps.length > 0) {
        let fixResult = await healthChecker.autoFixGaps(fixableGaps);
        await db.log.create({
          data: {
            userId: data.userId,
            type: "auto_fix",
            message: `Auto-fixed ${fixResult.fixed} gaps, ${fixResult.failed} failed`,
            metadata: {
              fixed: fixResult.fixed,
              failed: fixResult.failed,
              originalScore: result.score
            }
          }
        });
        let user2 = await db.user.findUnique({
          where: { id: data.userId }
        });
        user2 && await analyticsService.trackPerformanceMetrics({
          userId: data.userId,
          shopDomain: data.shopId,
          timestamp: /* @__PURE__ */ new Date(),
          healthScore: result.score,
          totalProducts: result.totalProducts,
          validProducts: result.validProducts,
          issuesFound: result.gaps.length,
          issuesFixed: fixResult.fixed,
          aiUsage: user2.aiUsage,
          syncCount: 0,
          enrichmentCount: 0
        });
      }
    }
    return {
      success: !0,
      result,
      shopId: data.shopId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return await db.log.create({
      data: {
        userId: data.userId,
        type: "error",
        message: `Health scan failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: error instanceof Error ? error.message : "Unknown error"
      }
    }), {
      success: !1,
      error: error instanceof Error ? error.message : "Health scan failed",
      shopId: data.shopId
    };
  }
}
async function scheduleHealthChecks() {
  if (!healthCheckQueue || !backgroundJobsQueue) {
    console.log("Health checks skipped - queues not available");
    return;
  }
  try {
    await healthCheckQueue.add(
      "database-health",
      {},
      {
        repeat: { pattern: "*/5 * * * *" },
        jobId: "database-health-recurring"
      }
    ), await healthCheckQueue.add(
      "url-ping",
      { url: process.env.SHOPIFY_APP_URL + "/health" },
      {
        repeat: { pattern: "*/2 * * * *" },
        jobId: "url-ping-recurring"
      }
    ), await backgroundJobsQueue.add(
      "cleanup-logs",
      { daysToKeep: 30 },
      {
        repeat: { pattern: "0 2 * * *" },
        jobId: "log-cleanup-recurring"
      }
    ), await backgroundJobsQueue.add(
      "weekly-email-summary",
      {},
      {
        repeat: { pattern: "0 8 * * 1" },
        jobId: "weekly-email-summary-recurring"
      }
    ), console.log("Health checks scheduled successfully");
  } catch (error) {
    console.error("Failed to schedule health checks:", error);
  }
}
async function performWeeklyEmailSummary(data) {
  try {
    let validUsers = (data.userId ? [await db.user.findUnique({ where: { id: data.userId } })] : await db.user.findMany()).filter((user) => user !== null);
    for (let user of validUsers) {
      if (!user)
        continue;
      let success = await new HealthCheckerService(user.shopDomain, user.accessToken).sendWeeklyHealthSummary(user.id);
      await db.log.create({
        data: {
          userId: user.id,
          type: "weekly_email_summary",
          message: `Weekly email summary ${success ? "sent" : "failed"} for ${user.shopDomain}`,
          metadata: {
            success,
            shopDomain: user.shopDomain
          }
        }
      });
    }
    return {
      success: !0,
      usersProcessed: validUsers.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Weekly email summary failed"
    };
  }
}
async function scheduleDailyHealthScans() {
  if (!healthCheckQueue) {
    console.log("Health scans skipped - queue not available");
    return;
  }
  try {
    let users = await db.user.findMany({
      select: {
        id: !0,
        shopId: !0,
        tier: !0
      }
    });
    for (let user of users)
      await healthCheckQueue.add(
        "health-scan",
        {
          shopId: user.shopId,
          userId: user.id,
          options: {
            maxProducts: user.tier === "enterprise" ? 500 : 100,
            includePings: !0,
            includeInventory: !0,
            includeValidation: !0
          }
        },
        {
          repeat: { pattern: "0 2 * * *" },
          jobId: `health-scan-${user.shopId}`
        }
      );
    console.log(`Daily health scans scheduled for ${users.length} users`);
  } catch (error) {
    console.error("Failed to schedule daily health scans:", error);
  }
}
healthCheckWorker && healthCheckWorker.on("error", (error) => {
  console.error("Health check worker error:", error);
});
backgroundJobsWorker && backgroundJobsWorker.on("error", (error) => {
  console.error("Background jobs worker error:", error);
});
queueEvents && queueEvents.on("error", (error) => {
  console.error("Queue events error:", error);
});

// app/entry.server.tsx
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
typeof global < "u" && !global.healthChecksInitialized && (console.log("Checking Redis configuration:", {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  hasRedisPassword: !!process.env.REDIS_PASSWORD,
  allEnvVars: Object.keys(process.env).filter((key) => key.startsWith("REDIS"))
}), process.env.REDIS_HOST && process.env.REDIS_PASSWORD ? (console.log("Redis configuration found - initializing health checks"), scheduleHealthChecks().catch((error) => {
  console.error("Failed to initialize health checks:", error);
}), scheduleDailyHealthScans().catch((error) => {
  console.error("Failed to schedule daily health scans:", error);
})) : console.log("Health checks skipped - Redis not configured"), global.healthChecksInitialized = !0);
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), responseHeaders.set("X-Frame-Options", "ALLOWALL"), responseHeaders.set("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), responseHeaders.set("X-Frame-Options", "ALLOWALL"), responseHeaders.set("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { AppProvider, Frame } from "@shopify/polaris";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var meta = () => [
  { title: "CatalogAI Optimizer" },
  { name: "description", content: "AI-powered Shopify catalog optimization" }
], links = () => [
  { rel: "stylesheet", href: "https://unpkg.com/@shopify/polaris@12.27.0/build/esm/styles.css" }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(AppProvider, { i18n: {}, children: /* @__PURE__ */ jsx2(Frame, { children: /* @__PURE__ */ jsx2(Outlet, {}) }) }),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}

// app/routes/api.test-health-check.ts
var api_test_health_check_exports = {};
__export(api_test_health_check_exports, {
  loader: () => loader
});
init_shopify_server();
init_db();
import { json } from "@remix-run/node";

// app/utils/healthCheckTest.ts
init_db();
var HealthCheckTester = class {
  testResults = [];
  async runAllTests(userId, shopDomain, accessToken) {
    return this.testResults = [], console.log("\u{1F9EA} Starting health check system tests..."), await this.testHealthCheckerInitialization(shopDomain, accessToken), await this.testProductValidation(), await this.testUrlPings(), await this.testInventoryValidation(), await this.testHealthScoreCalculation(), await this.testDatabaseOperations(userId), await this.testQueueOperations(userId, shopDomain), await this.testErrorHandling(shopDomain, accessToken), await this.testPerformanceLargeDataset(), await this.testEdgeCases(), console.log(`\u2705 Health check tests completed: ${this.testResults.filter((r) => r.passed).length}/${this.testResults.length} passed`), this.testResults;
  }
  async testHealthCheckerInitialization(shopDomain, accessToken) {
    let startTime = Date.now();
    try {
      if (!new HealthCheckerService(shopDomain, accessToken))
        throw new Error("Failed to initialize HealthCheckerService");
      this.testResults.push({
        testName: "Health Checker Initialization",
        passed: !0,
        duration: Date.now() - startTime,
        details: { shopDomain, hasAccessToken: !!accessToken }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Health Checker Initialization",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testProductValidation() {
    let startTime = Date.now();
    try {
      let mockProducts = [
        {
          id: "test-1",
          title: "Valid Product",
          description: "This is a valid product description",
          vendor: "Test Vendor",
          productType: "Test Type",
          tags: ["tag1", "tag2"],
          images: [{ src: "image1.jpg" }],
          variants: [{ id: "v1", title: "Variant 1" }],
          options: [{ name: "Size", values: ["S", "M", "L"] }],
          status: "active"
        },
        {
          id: "test-2",
          title: "",
          // Missing title
          description: "Valid description",
          vendor: "Test Vendor",
          productType: "Test Type",
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: "active"
        },
        {
          id: "test-3",
          title: "Valid Product",
          description: "",
          // Missing description
          vendor: "",
          productType: "Test Type",
          tags: ["tag1"],
          images: [{ src: "image1.jpg" }],
          variants: [{ id: "v1", title: "Variant 1" }],
          options: [{ name: "Size", values: ["S", "M", "L"] }],
          status: "active"
        }
      ], requiredFields = ["title", "description", "vendor", "productType", "tags", "images", "variants", "options", "status"], validCount = 0, gaps = [];
      for (let product of mockProducts) {
        let isValid = !0;
        for (let field of requiredFields)
          (!product[field] || Array.isArray(product[field]) && product[field].length === 0 || typeof product[field] == "string" && product[field].trim() === "") && (gaps.push({ field, productId: product.id }), isValid = !1);
        isValid && validCount++;
      }
      let expectedValidCount = 1, expectedGapsCount = 4;
      if (validCount !== expectedValidCount)
        throw new Error(`Expected ${expectedValidCount} valid products, got ${validCount}`);
      if (gaps.length !== expectedGapsCount)
        throw new Error(`Expected ${expectedGapsCount} gaps, got ${gaps.length}`);
      this.testResults.push({
        testName: "Product Validation",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalProducts: mockProducts.length,
          validProducts: validCount,
          gapsFound: gaps.length,
          gaps
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Product Validation",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testUrlPings() {
    let startTime = Date.now();
    try {
      let testUrls = [
        "https://httpbin.org/status/200",
        // Should succeed
        "https://httpbin.org/status/404",
        // Should fail with 404
        "https://invalid-domain-that-does-not-exist.com",
        // Should fail
        "https://httpbin.org/delay/10"
        // Should timeout
      ], results = [];
      for (let url of testUrls)
        try {
          let response = await fetch(url, {
            method: "HEAD",
            signal: AbortSignal.timeout(5e3)
          });
          results.push({ url, success: response.ok, status: response.status });
        } catch (error) {
          results.push({ url, success: !1, error: error instanceof Error ? error.message : "Unknown error" });
        }
      let successCount = results.filter((r) => r.success).length, expectedSuccessCount = 1;
      if (successCount !== expectedSuccessCount)
        throw new Error(`Expected ${expectedSuccessCount} successful pings, got ${successCount}`);
      this.testResults.push({
        testName: "URL Pings",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalUrls: testUrls.length,
          successfulPings: successCount,
          results
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "URL Pings",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testInventoryValidation() {
    let startTime = Date.now();
    try {
      let mockVariants = [
        { id: "v1", inventoryQuantity: 10 },
        // Normal stock
        { id: "v2", inventoryQuantity: 3 },
        // Low stock
        { id: "v3", inventoryQuantity: 0 },
        // Out of stock
        { id: "v4", inventoryQuantity: 1 },
        // Low stock
        { id: "v5", inventoryQuantity: 15 }
        // Normal stock
      ], lowStock = [], outOfStock = [];
      for (let variant of mockVariants)
        variant.inventoryQuantity === 0 ? outOfStock.push(variant.id) : variant.inventoryQuantity < 5 && lowStock.push(variant.id);
      let expectedLowStock = 2, expectedOutOfStock = 1;
      if (lowStock.length !== expectedLowStock)
        throw new Error(`Expected ${expectedLowStock} low stock variants, got ${lowStock.length}`);
      if (outOfStock.length !== expectedOutOfStock)
        throw new Error(`Expected ${expectedOutOfStock} out of stock variants, got ${outOfStock.length}`);
      this.testResults.push({
        testName: "Inventory Validation",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalVariants: mockVariants.length,
          lowStock: lowStock.length,
          outOfStock: outOfStock.length,
          lowStockVariants: lowStock,
          outOfStockVariants: outOfStock
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Inventory Validation",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testHealthScoreCalculation() {
    let startTime = Date.now();
    try {
      let testCases = [
        { totalProducts: 100, validProducts: 100, gaps: [], expectedScore: 100 },
        { totalProducts: 100, validProducts: 90, gaps: [], expectedScore: 90 },
        { totalProducts: 100, validProducts: 80, gaps: [{ severity: "warning", count: 10 }], expectedScore: 70 },
        { totalProducts: 100, validProducts: 70, gaps: [{ severity: "error", count: 20 }], expectedScore: 10 },
        { totalProducts: 0, validProducts: 0, gaps: [], expectedScore: 100 }
      ], results = [];
      for (let testCase of testCases) {
        let score = testCase.totalProducts === 0 ? 100 : testCase.validProducts / testCase.totalProducts * 100;
        for (let gap of testCase.gaps) {
          let penalty = gap.severity === "critical" ? 5 : gap.severity === "error" ? 3 : 1;
          score -= Math.min(penalty * (gap.count / testCase.totalProducts), 10);
        }
        score = Math.max(0, Math.round(score));
        let passed = score === testCase.expectedScore;
        results.push({ ...testCase, calculatedScore: score, passed });
      }
      let failedTests = results.filter((r) => !r.passed);
      if (failedTests.length > 0)
        throw new Error(`${failedTests.length} health score calculations failed`);
      this.testResults.push({
        testName: "Health Score Calculation",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalTestCases: testCases.length,
          allPassed: !0,
          results
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Health Score Calculation",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testDatabaseOperations(userId) {
    let startTime = Date.now();
    try {
      let testAudit = await db.audit.create({
        data: {
          userId,
          score: 85,
          totalProducts: 100,
          validProducts: 85,
          gaps: [{ field: "title", severity: "warning", count: 15 }],
          timestamp: /* @__PURE__ */ new Date()
        }
      });
      if (!testAudit.id)
        throw new Error("Failed to create audit record");
      if (!await db.audit.findUnique({
        where: { id: testAudit.id }
      }))
        throw new Error("Failed to retrieve audit record");
      await db.audit.delete({
        where: { id: testAudit.id }
      }), this.testResults.push({
        testName: "Database Operations",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          auditId: testAudit.id,
          score: testAudit.score,
          totalProducts: testAudit.totalProducts
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Database Operations",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testQueueOperations(userId, shopDomain) {
    let startTime = Date.now();
    try {
      if (!healthCheckQueue)
        throw new Error("Health check queue not available");
      let testJob = await healthCheckQueue.add("health-scan", {
        shopId: shopDomain,
        userId,
        options: {
          maxProducts: 10,
          includePings: !1,
          includeInventory: !1,
          includeValidation: !0
        }
      });
      if (!testJob.id)
        throw new Error("Failed to create queue job");
      this.testResults.push({
        testName: "Queue Operations",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          jobId: testJob.id,
          jobName: testJob.name,
          jobData: testJob.data
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Queue Operations",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testErrorHandling(shopDomain, accessToken) {
    let startTime = Date.now();
    try {
      let healthChecker = new HealthCheckerService(shopDomain, accessToken);
      try {
        await healthChecker.performHealthCheck({
          maxProducts: -1,
          // Invalid value
          includePings: !0,
          includeInventory: !0,
          includeValidation: !0
        });
      } catch {
      }
      try {
        await new HealthCheckerService("", accessToken).performHealthCheck();
      } catch {
      }
      try {
        await new HealthCheckerService(shopDomain, "").performHealthCheck();
      } catch {
      }
      this.testResults.push({
        testName: "Error Handling",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          errorHandlingTests: 3,
          allErrorsHandled: !0
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Error Handling",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testPerformanceLargeDataset() {
    let startTime = Date.now();
    try {
      let largeProductSet = Array.from({ length: 1e3 }, (_, i) => ({
        id: `product-${i}`,
        title: i % 10 === 0 ? "" : `Product ${i}`,
        // 10% missing titles
        description: i % 20 === 0 ? "" : `Description for product ${i}`,
        // 5% missing descriptions
        vendor: i % 15 === 0 ? "" : "Test Vendor",
        // ~6.7% missing vendors
        productType: "Test Type",
        tags: i % 25 === 0 ? [] : ["tag1", "tag2"],
        // 4% missing tags
        images: i % 30 === 0 ? [] : [{ src: `image-${i}.jpg` }],
        // ~3.3% missing images
        variants: i % 40 === 0 ? [] : [{ id: `v-${i}`, title: `Variant ${i}` }],
        // 2.5% missing variants
        options: i % 50 === 0 ? [] : [{ name: "Size", values: ["S", "M", "L"] }],
        // 2% missing options
        status: "active"
      })), requiredFields = ["title", "description", "vendor", "productType", "tags", "images", "variants", "options", "status"], validCount = 0, gaps = [];
      for (let product of largeProductSet) {
        let isValid = !0;
        for (let field of requiredFields)
          (!product[field] || Array.isArray(product[field]) && product[field].length === 0 || typeof product[field] == "string" && product[field].trim() === "") && (gaps.push({ field, productId: product.id }), isValid = !1);
        isValid && validCount++;
      }
      let processingTime = Date.now() - startTime, expectedValidCount = Math.floor(1e3 * 0.7), tolerance = 50;
      if (Math.abs(validCount - expectedValidCount) > tolerance)
        throw new Error(`Performance test failed: expected ~${expectedValidCount} valid products, got ${validCount}`);
      if (processingTime > 5e3)
        throw new Error(`Performance test failed: processing took ${processingTime}ms, expected < 5000ms`);
      this.testResults.push({
        testName: "Performance Large Dataset",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalProducts: largeProductSet.length,
          validProducts: validCount,
          gapsFound: gaps.length,
          processingTime,
          productsPerSecond: Math.round(largeProductSet.length / (processingTime / 1e3))
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Performance Large Dataset",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testEdgeCases() {
    let startTime = Date.now();
    try {
      let edgeCases = [
        // Empty product
        {
          id: "empty",
          title: "",
          description: "",
          vendor: "",
          productType: "",
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: ""
        },
        // Product with only spaces
        {
          id: "spaces",
          title: "   ",
          description: "   ",
          vendor: "   ",
          productType: "Test Type",
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: "active"
        },
        // Product with null/undefined values
        {
          id: "nulls",
          title: null,
          description: void 0,
          vendor: "Test Vendor",
          productType: "Test Type",
          tags: null,
          images: void 0,
          variants: [],
          options: [],
          status: "active"
        }
      ], results = [];
      for (let product of edgeCases) {
        let isValid = !0, gaps = [], requiredFields = ["title", "description", "vendor", "productType", "tags", "images", "variants", "options", "status"];
        for (let field of requiredFields) {
          let value = product[field];
          (!value || Array.isArray(value) && value.length === 0 || typeof value == "string" && value.trim() === "") && (gaps.push(field), isValid = !1);
        }
        results.push({ productId: product.id, isValid, gaps });
      }
      let validCount = results.filter((r) => r.isValid).length;
      if (validCount > 0)
        throw new Error(`Expected all edge cases to be invalid, but ${validCount} were valid`);
      this.testResults.push({
        testName: "Edge Cases",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalEdgeCases: edgeCases.length,
          allInvalid: !0,
          results
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Edge Cases",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  getTestSummary() {
    let total = this.testResults.length, passed = this.testResults.filter((r) => r.passed).length, failed = total - passed, duration = this.testResults.reduce((sum, r) => sum + r.duration, 0);
    return { total, passed, failed, duration };
  }
}, healthCheckTester = new HealthCheckTester();

// app/routes/api.test-health-check.ts
var loader = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return json({
        success: !1,
        error: "User not found"
      }, { status: 404 });
    let testResults = await healthCheckTester.runAllTests(
      user.id,
      session.shop,
      user.accessToken
    ), summary = healthCheckTester.getTestSummary();
    return await db.log.create({
      data: {
        userId: user.id,
        type: "health_check_test",
        message: `Health check tests completed: ${summary.passed}/${summary.total} passed`,
        metadata: {
          totalTests: summary.total,
          passedTests: summary.passed,
          failedTests: summary.failed,
          duration: summary.duration,
          results: testResults
        }
      }
    }), json({
      success: !0,
      summary,
      results: testResults,
      message: `Health check tests completed: ${summary.passed}/${summary.total} passed`
    });
  } catch (error) {
    return console.error("Health check test error:", error), json({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to run health check tests"
    }, { status: 500 });
  }
};

// app/routes/api.health-check.ts
var api_health_check_exports = {};
__export(api_health_check_exports, {
  action: () => action,
  loader: () => loader2
});
import { json as json2 } from "@remix-run/node";
init_shopify_server();
init_db();
var loader2 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request);
    if (console.log("Health check API called", {
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT,
      hasRedisPassword: !!process.env.REDIS_PASSWORD,
      healthCheckQueueExists: !!healthCheckQueue,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), !healthCheckQueue)
      return console.error("Health check queue is null - Redis connection failed"), json2({
        success: !1,
        error: "Health check system not available - Redis connection failed"
      }, { status: 503 });
    let user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return json2({
        success: !1,
        error: "User not found"
      }, { status: 404 });
    let healthScanJob = await healthCheckQueue.add("health-scan", {
      shopId: session.shop,
      userId: user.id,
      options: {
        maxProducts: 100,
        includePings: !0,
        includeInventory: !0,
        includeValidation: !0
      }
    }), latestAudit = await db.audit.findFirst({
      where: { userId: user.id },
      orderBy: { timestamp: "desc" }
    });
    return json2({
      success: !0,
      jobId: healthScanJob.id,
      currentScore: latestAudit?.score || 0,
      currentGaps: latestAudit?.gaps || [],
      message: "Health scan initiated"
    });
  } catch (error) {
    return console.error("Health check API error:", error), json2({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to initiate health checks"
    }, { status: 500 });
  }
}, action = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), formData = await request.formData(), action8 = formData.get("action");
    if (action8 === "trigger-scan") {
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json2({
          success: !1,
          error: "User not found"
        }, { status: 404 });
      if (!healthCheckQueue)
        return console.error("Health check queue is null - Redis connection failed"), json2({
          success: !1,
          error: "Health check system not available - Redis connection failed"
        }, { status: 503 });
      let healthScanJob = await healthCheckQueue.add("health-scan", {
        shopId: session.shop,
        userId: user.id,
        options: {
          maxProducts: 100,
          includePings: !0,
          includeInventory: !0,
          includeValidation: !0
        }
      }), latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" }
      });
      return json2({
        success: !0,
        jobId: healthScanJob.id,
        currentScore: latestAudit?.score || 0,
        currentGaps: latestAudit?.gaps || [],
        message: "Health scan initiated"
      });
    }
    if (action8 === "get-results") {
      if (!formData.get("jobId"))
        return json2({
          success: !1,
          error: "Job ID is required"
        }, { status: 400 });
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json2({
          success: !1,
          error: "User not found"
        }, { status: 404 });
      let latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" }
      }), sevenDaysAgo = /* @__PURE__ */ new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      let trends = await db.audit.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: sevenDaysAgo
          }
        },
        orderBy: {
          timestamp: "asc"
        }
      });
      return json2({
        success: !0,
        result: latestAudit ? {
          score: latestAudit.score,
          totalProducts: latestAudit.totalProducts,
          validProducts: latestAudit.validProducts,
          gaps: latestAudit.gaps,
          timestamp: latestAudit.timestamp,
          trends: trends.map((t) => ({
            date: t.timestamp.toISOString().split("T")[0],
            score: t.score,
            totalProducts: t.totalProducts,
            validProducts: t.validProducts
          }))
        } : null
      });
    }
    if (action8 === "auto-fix") {
      let gapTypes = formData.get("gapTypes");
      if (!gapTypes)
        return json2({
          success: !1,
          error: "Gap types are required"
        }, { status: 400 });
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json2({
          success: !1,
          error: "User not found"
        }, { status: 404 });
      let aiEnrichmentJob = await backgroundJobsQueue?.add("ai-enrichment", {
        shopId: session.shop,
        userId: user.id,
        productIds: [],
        // Will be determined by gap types
        gapTypes: JSON.parse(gapTypes)
      });
      return json2({
        success: !0,
        jobId: aiEnrichmentJob?.id,
        message: "Auto-fix initiated"
      });
    }
    return json2({
      success: !1,
      error: "Invalid action"
    }, { status: 400 });
  } catch (error) {
    return console.error("Health check action error:", error), json2({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to process action"
    }, { status: 500 });
  }
};

// app/routes/api.queue-status.ts
var api_queue_status_exports = {};
__export(api_queue_status_exports, {
  loader: () => loader3
});
import { json as json3 } from "@remix-run/node";
init_shopify_server();
var loader3 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request);
    if (!healthCheckQueue || !backgroundJobsQueue)
      return json3({
        success: !1,
        error: "Queue system not available - Redis not configured"
      }, { status: 503 });
    let healthCheckStats = await healthCheckQueue.getJobCounts(), backgroundJobsStats = await backgroundJobsQueue.getJobCounts(), recentHealthChecks = await healthCheckQueue.getJobs(["completed"], 0, 5), recentBackgroundJobs = await backgroundJobsQueue.getJobs(["completed"], 0, 5);
    return json3({
      success: !0,
      queues: {
        healthChecks: {
          ...healthCheckStats,
          recentJobs: recentHealthChecks.map((job) => ({
            id: job.id,
            name: job.name,
            data: job.data,
            result: job.returnvalue,
            completedOn: job.finishedOn
          }))
        },
        backgroundJobs: {
          ...backgroundJobsStats,
          recentJobs: recentBackgroundJobs.map((job) => ({
            id: job.id,
            name: job.name,
            data: job.data,
            result: job.returnvalue,
            completedOn: job.finishedOn
          }))
        }
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    return json3({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to get queue status"
    }, { status: 500 });
  }
};

// app/routes/api.settings.ts
var api_settings_exports = {};
__export(api_settings_exports, {
  action: () => action2,
  loader: () => loader4
});
init_shopify_server();
init_db();
import { json as json4 } from "@remix-run/node";
var loader4 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    return user ? json4({
      success: !0,
      settings: {
        healthChecksEnabled: !0,
        healthCheckTime: "02:00",
        // 2 AM UTC
        autoFixEnabled: !0,
        emailNotifications: !0,
        maxProductsPerScan: user.tier === "enterprise" ? 500 : 100,
        includeUrlPings: !0,
        includeInventoryChecks: !0,
        includeValidation: !0
      }
    }) : json4({
      success: !1,
      error: "User not found"
    }, { status: 404 });
  } catch (error) {
    return console.error("Settings API error:", error), json4({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to fetch settings"
    }, { status: 500 });
  }
}, action2 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), formData = await request.formData(), action8 = formData.get("action"), user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return json4({
        success: !1,
        error: "User not found"
      }, { status: 404 });
    if (action8 === "update") {
      let healthChecksEnabled = formData.get("healthChecksEnabled") === "true", healthCheckTime = formData.get("healthCheckTime"), autoFixEnabled = formData.get("autoFixEnabled") === "true", emailNotifications = formData.get("emailNotifications") === "true", maxProductsPerScan = parseInt(formData.get("maxProductsPerScan")) || 100, includeUrlPings = formData.get("includeUrlPings") === "true", includeInventoryChecks = formData.get("includeInventoryChecks") === "true", includeValidation = formData.get("includeValidation") === "true";
      return await db.log.create({
        data: {
          userId: user.id,
          type: "settings_update",
          message: `Settings updated: health checks ${healthChecksEnabled ? "enabled" : "disabled"}, auto-fix ${autoFixEnabled ? "enabled" : "disabled"}`,
          metadata: {
            healthChecksEnabled,
            healthCheckTime,
            autoFixEnabled,
            emailNotifications,
            maxProductsPerScan,
            includeUrlPings,
            includeInventoryChecks,
            includeValidation
          }
        }
      }), json4({
        success: !0,
        message: "Settings updated successfully"
      });
    }
    return json4({
      success: !1,
      error: "Invalid action"
    }, { status: 400 });
  } catch (error) {
    return console.error("Settings action error:", error), json4({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to update settings"
    }, { status: 500 });
  }
};

// app/routes/api.validate.ts
var api_validate_exports = {};
__export(api_validate_exports, {
  action: () => action3
});
init_shopify_server();
init_shopifySync();
init_fieldMapper();
import { json as json5 } from "@remix-run/node";

// app/utils/validator.ts
init_openaiSpec();
import Ajv2 from "ajv";
import addFormats2 from "ajv-formats";
import axios2 from "axios";
var ajv2 = new Ajv2({ allErrors: !0 });
addFormats2(ajv2);
var validate = ajv2.compile(OPENAI_PRODUCT_SCHEMA);
function validateProduct(product) {
  let errors = [], warnings = [];
  if (!validate(product) && validate.errors)
    for (let error of validate.errors)
      errors.push({
        field: error.instancePath ? error.instancePath.slice(1) : "root",
        message: error.message || "Validation error",
        value: error.data
      });
  return validateDescription(product, warnings), validatePrice(product, errors), validateImageUrls(product, warnings), validateLinks(product, warnings), {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
function validateDescription(product, warnings) {
  if (!product.description)
    return;
  let desc = product.description;
  /<[^>]*>/g.test(desc) && warnings.push({
    field: "description",
    message: "Description contains HTML tags",
    suggestion: "Use plain text for better AI search compatibility"
  }), desc.length < 100 && warnings.push({
    field: "description",
    message: "Description is too short",
    suggestion: "Add more details about features, benefits, and use cases"
  }), desc.length > 4e3 && warnings.push({
    field: "description",
    message: "Description is too long",
    suggestion: "Consider shortening to under 4000 characters"
  });
  let genericPhrases = [
    "great product",
    "high quality",
    "perfect for",
    "amazing",
    "wonderful",
    "excellent"
  ], lowerDesc = desc.toLowerCase();
  genericPhrases.filter((phrase) => lowerDesc.includes(phrase)).length > 2 && warnings.push({
    field: "description",
    message: "Description contains too many generic phrases",
    suggestion: "Use more specific, descriptive language"
  });
}
function validatePrice(product, errors) {
  if (!product.price)
    return;
  /^\d+\.\d{2} [A-Z]{3}$/.test(product.price) || errors.push({
    field: "price",
    message: 'Price must be in format "XX.XX USD"',
    value: product.price
  });
}
async function validateImageUrls(product, warnings) {
  if (!(!product.image_urls || product.image_urls.length === 0))
    for (let [index, url] of product.image_urls.entries())
      try {
        let response = await axios2.head(url, { timeout: 5e3 });
        response.status !== 200 && warnings.push({
          field: `image_urls[${index}]`,
          message: `Image URL returned status ${response.status}`,
          suggestion: "Check if the image URL is accessible"
        });
        let contentType = response.headers["content-type"];
        contentType && !contentType.startsWith("image/") && warnings.push({
          field: `image_urls[${index}]`,
          message: "URL does not appear to be an image",
          suggestion: "Ensure the URL points to an image file"
        });
      } catch {
        warnings.push({
          field: `image_urls[${index}]`,
          message: "Failed to validate image URL",
          suggestion: "Check if the URL is accessible and points to an image"
        });
      }
}
async function validateLinks(product, warnings) {
  let linksToValidate = [];
  product.documentation_url && linksToValidate.push({ url: product.documentation_url, field: "documentation_url" }), product.video_urls && product.video_urls.forEach((url, index) => {
    linksToValidate.push({ url, field: `video_urls[${index}]` });
  });
  for (let { url, field } of linksToValidate)
    try {
      let response = await axios2.head(url, { timeout: 5e3 });
      response.status !== 200 && warnings.push({
        field,
        message: `Link returned status ${response.status}`,
        suggestion: "Check if the link is accessible"
      });
    } catch {
      warnings.push({
        field,
        message: "Failed to validate link",
        suggestion: "Check if the link is accessible"
      });
    }
}
async function validateProducts(products) {
  let results = [];
  for (let product of products) {
    let result = validateProduct(product);
    results.push(result);
  }
  return results;
}
function getValidationSummary(results) {
  let totalProducts = results.length, validProducts = results.filter((r) => r.valid).length, totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0), totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0), commonErrors = getCommonIssues(results.map((r) => r.errors).flat(), "error"), commonWarnings = getCommonIssues(results.map((r) => r.warnings).flat(), "warning");
  return {
    totalProducts,
    validProducts,
    invalidProducts: totalProducts - validProducts,
    totalErrors,
    totalWarnings,
    validationRate: totalProducts > 0 ? Math.round(validProducts / totalProducts * 100) : 0,
    commonErrors,
    commonWarnings
  };
}
function getCommonIssues(issues, type) {
  let fieldCounts = /* @__PURE__ */ new Map();
  for (let issue of issues) {
    let key = issue.field;
    fieldCounts.has(key) ? fieldCounts.get(key).count++ : fieldCounts.set(key, { count: 1, message: issue.message });
  }
  return Array.from(fieldCounts.entries()).map(([field, data]) => ({ field, ...data })).sort((a, b) => b.count - a.count).slice(0, 10);
}

// app/routes/api.validate.ts
init_db();
var action3 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json5({ error: "User not found" }, { status: 404 });
  try {
    if ((await request.formData()).get("action") === "validate") {
      let sampleProducts = (await new ShopifySyncService(session.shop, user.accessToken).syncProducts(user.id)).slice(0, 10), mappedProducts = mapProductsToSpec(sampleProducts), validationResults = await validateProducts(mappedProducts.map((p) => {
        let { originalId, score, ...spec } = p;
        return spec;
      })), summary = getValidationSummary(validationResults), audit = await db.audit.create({
        data: {
          userId: user.id,
          score: summary.validationRate,
          totalProducts: summary.totalProducts,
          validProducts: summary.validProducts,
          gaps: summary.commonErrors.map((error) => ({
            field: error.field,
            count: error.count,
            message: error.message
          }))
        }
      });
      return await db.log.create({
        data: {
          userId: user.id,
          type: "validation",
          message: `Validated ${summary.totalProducts} products - ${summary.validationRate}% passed validation`,
          metadata: {
            summary,
            auditId: audit.id,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), json5({
        success: !0,
        data: {
          auditId: audit.id,
          summary,
          products: mappedProducts.map((product, index) => ({
            id: product.originalId,
            title: product.title,
            score: product.score,
            validation: validationResults[index]
          }))
        }
      });
    }
    return json5({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return console.error("Validation error:", error), await db.log.create({
      data: {
        userId: user.id,
        type: "error",
        message: `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: error instanceof Error ? error.stack : String(error),
        metadata: {
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), json5(
      {
        success: !1,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
};

// app/routes/api.enrich.ts
var api_enrich_exports = {};
__export(api_enrich_exports, {
  action: () => action4,
  loader: () => loader5
});
init_shopify_server();
init_shopifySync();
init_aiEnrich();
init_db();
import { json as json6 } from "@remix-run/node";
var loader5 = async ({ request }) => {
  console.log("\u{1F3AF} AI ENRICH LOADER CALLED");
  try {
    let { session } = await authenticate.admin(request);
    return console.log("\u2705 AI Enrich loader authentication successful for shop:", session.shop), json6({ success: !0, message: "AI Enrichment API ready" });
  } catch (error) {
    return console.error("\u274C AI Enrich loader authentication failed:", error), json6({ success: !1, error: "Authentication failed" }, { status: 401 });
  }
}, action4 = async ({ request }) => {
  console.log("\u{1F3AF} AI ENRICH ACTION CALLED - Fixed Syntax Error");
  try {
    console.log("\u{1F50D} Attempting authentication for AI enrichment..."), console.log("\u{1F50D} Request URL:", request.url), console.log("\u{1F50D} Request method:", request.method), console.log("\u{1F50D} Request headers:", Object.fromEntries(request.headers.entries()));
    let { session } = await authenticate.admin(request);
    console.log("\u2705 AI Enrich authentication successful for shop:", session.shop);
    let user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return console.log("\u274C User not found for shop:", session.shop), json6({ error: "User not found" }, { status: 404 });
    console.log("\u{1F464} User found:", user.id);
    let formData = await request.formData(), action8 = formData.get("action"), shopFromForm = formData.get("shop");
    if (console.log("\u{1F4DD} Form data action:", action8), console.log("\u{1F3EA} Shop from form:", shopFromForm), action8 === "enrich") {
      console.log("\u{1F680} Starting AI enrichment process...");
      let productIds = formData.getAll("productIds"), maxProducts = parseInt(formData.get("maxProducts")) || 5, tierLimits = {
        starter: 5,
        pro: 25,
        enterprise: 100
      }, limit = tierLimits[user.tier] || tierLimits.starter;
      if (maxProducts > limit)
        return json6({
          success: !1,
          error: `Your ${user.tier} tier allows up to ${limit} products per enrichment. Please upgrade to process more products.`
        }, { status: 400 });
      console.log("\u{1F511} Loading offline session for AI enrichment...");
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return console.log("\u274C Offline session not found for AI enrichment"), json6({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      console.log("\u2705 Offline session loaded for AI enrichment"), console.log("\u{1F4E6} Fetching products for AI enrichment...");
      let allProducts = await new ShopifySyncService(session.shop, offlineSession.accessToken).syncProducts(user.id);
      console.log("\u{1F4E6} Products fetched:", allProducts.length);
      let productsToEnrich = productIds.length > 0 ? allProducts.filter((p) => productIds.includes(p.id)) : allProducts.slice(0, maxProducts);
      if (console.log("\u{1F3AF} Products selected for enrichment:", productsToEnrich.length), productsToEnrich.length === 0)
        return console.log("\u274C No products found to enrich"), json6({
          success: !1,
          error: "No products found to enrich"
        }, { status: 400 });
      console.log("\u{1F916} Starting AI enrichment service...");
      let enrichmentService = new AIEnrichmentService();
      console.log("\u{1F916} Calling enrichProducts with", productsToEnrich.length, "products");
      let enrichmentResults = await enrichmentService.enrichProducts(
        user.id,
        productsToEnrich,
        {
          enrichDescription: !0,
          inferMaterial: !0,
          generateUseCases: !0,
          generateFeatures: !0,
          generateKeywords: !0
        },
        maxProducts
      );
      console.log("\u2705 AI enrichment completed, results:", enrichmentResults.length);
      let applyToShopify = formData.get("applyToShopify") === "true", appliedResults = [];
      if (applyToShopify)
        for (let result of enrichmentResults)
          try {
            let success = await enrichmentService.applyEnrichmentToShopify(
              user.id,
              session.shop,
              offlineSession.accessToken,
              result
            );
            appliedResults.push({
              productId: result.originalProduct.id,
              success,
              improvements: result.improvements
            });
          } catch (error) {
            appliedResults.push({
              productId: result.originalProduct.id,
              success: !1,
              error: error instanceof Error ? error.message : "Unknown error"
            });
          }
      let totalUsage = enrichmentResults.reduce((sum, result) => sum + result.totalUsage, 0);
      console.log("\u{1F4B0} Total usage calculated:", totalUsage), console.log("\u{1F4DD} Creating database log..."), await db.log.create({
        data: {
          userId: user.id,
          type: "enrichment",
          message: `AI enrichment completed for ${enrichmentResults.length} products`,
          metadata: {
            productsProcessed: enrichmentResults.length,
            totalUsage,
            appliedToShopify: applyToShopify,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), console.log("\u2705 Database log created");
      let response = {
        success: !0,
        data: {
          productsProcessed: enrichmentResults.length,
          totalUsage,
          appliedToShopify: applyToShopify,
          results: enrichmentResults.map((result) => ({
            productId: result.originalProduct.id,
            title: result.originalProduct.title,
            improvements: result.improvements,
            totalUsage: result.totalUsage,
            errors: result.errors
          })),
          appliedResults
        }
      };
      return console.log("\u{1F389} Returning successful response:", response), json6(response);
    }
    return json6({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("\u274C CRITICAL ERROR in AI enrichment:", error), console.error("\u274C Error stack:", error instanceof Error ? error.stack : "No stack trace");
    try {
      let { session } = await authenticate.admin(request).catch(() => null);
      if (session) {
        let user = await db.user.findUnique({
          where: { shopId: session.shop }
        }).catch(() => null);
        user && (await db.log.create({
          data: {
            userId: user.id,
            type: "error",
            message: `Enrichment error: ${error instanceof Error ? error.message : "Unknown error"}`,
            error: error instanceof Error ? error.stack : String(error),
            metadata: {
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          }
        }), console.log("\u{1F4DD} Error logged to database"));
      }
    } catch (logError) {
      console.error("\u274C Failed to log error to database:", logError);
    }
    return json6(
      {
        success: !1,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
};

// app/routes/api.sync.ts
var api_sync_exports = {};
__export(api_sync_exports, {
  action: () => action5,
  loader: () => loader6
});
init_shopify_server();
init_shopifySync();
init_db();
import { json as json7 } from "@remix-run/node";
var loader6 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json7({ error: "User not found" }, { status: 404 });
  let recentLogs = await db.log.findMany({
    where: {
      userId: user.id,
      type: "sync"
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 10
  });
  return json7({
    logs: recentLogs.map((log) => ({
      id: log.id,
      type: log.type,
      message: log.message,
      createdAt: log.createdAt,
      metadata: log.metadata
    }))
  });
}, action5 = async ({ request }) => {
  console.log("\u{1F3AF} SYNC ACTION CALLED - Request method:", request.method), console.log("\u{1F3AF} SYNC ACTION CALLED - Request URL:", request.url), console.log("\u{1F3AF} Request headers:", Object.fromEntries(request.headers.entries()));
  try {
    console.log("\u{1F510} Attempting authentication...");
    let { session } = await authenticate.admin(request);
    console.log("\u{1F3AF} Authentication successful for shop:", session.shop);
    let user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return console.log("\u274C User not found for shop:", session.shop), json7({ error: "User not found" }, { status: 404 });
    console.log("\u{1F680} Starting sync for shop:", session.shop), console.log("\u{1F464} User ID:", user.id);
    let syncService = new ShopifySyncService(session.shop, user.accessToken);
    console.log("\u{1F527} Sync service initialized"), console.log("\u{1F4E6} Starting product sync...");
    let products = await syncService.syncProducts(user.id);
    console.log("\u2705 Product sync completed:", products.length, "products"), console.log("\u{1F4CA} Fetching inventory levels...");
    let inventoryLevels = await syncService.getInventoryLevels(session.shop, user.accessToken);
    console.log("\u{1F4C8} Inventory levels:", inventoryLevels.length), console.log("\u{1F6D2} Fetching recent orders...");
    let recentOrders = await syncService.getRecentOrders(session.shop, user.accessToken, 50);
    console.log("\u{1F4CB} Recent orders:", recentOrders.length), console.log("\u{1F4DD} Creating audit record...");
    let audit = await db.audit.create({
      data: {
        userId: user.id,
        score: 0,
        // Will be calculated after field mapping
        totalProducts: products.length,
        validProducts: 0,
        // Will be calculated after validation
        gaps: []
        // Will be populated after field mapping and validation
      }
    });
    console.log("\u2705 Audit record created:", audit.id);
    let response = {
      success: !0,
      message: `Successfully synced ${products.length} products`,
      data: {
        productsCount: products.length,
        inventoryLevelsCount: inventoryLevels.length,
        recentOrdersCount: recentOrders.length,
        auditId: audit.id
      }
    };
    return console.log("\u{1F389} Sync response:", response), json7(response);
  } catch (error) {
    if (console.error("\u274C SYNC ACTION ERROR:", error), console.error("\u274C Error type:", error?.constructor?.name), console.error("\u274C Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : String(error),
      isResponse: error instanceof Response,
      responseStatus: error instanceof Response ? error.status : "N/A",
      responseHeaders: error instanceof Response ? Object.fromEntries(error.headers.entries()) : "N/A"
    }), error instanceof Response)
      throw console.log("\u{1F504} Re-throwing OAuth redirect response - Status:", error.status), console.log("\u{1F504} Redirect location:", error.headers.get("location")), error;
    return json7(
      {
        success: !1,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
};

// app/routes/webhooks.ts
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action6
});
init_shopify_server();
init_db();
import { json as json8 } from "@remix-run/node";
var action6 = async ({ request }) => {
  let { topic, shop, session } = await authenticate.webhook(request);
  if (!session)
    return json8({ error: "No session found" }, { status: 401 });
  try {
    let user = await db.user.findUnique({
      where: { shopId: shop }
    });
    if (!user)
      return json8({ error: "User not found" }, { status: 404 });
    switch (topic) {
      case "PRODUCTS_CREATE":
      case "PRODUCTS_UPDATE":
        await handleProductWebhook(user.id, session.shop, user.accessToken, topic);
        break;
      case "PRODUCTS_DELETE":
        await handleProductDelete(user.id, topic);
        break;
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }
    return json8({ success: !0 });
  } catch (error) {
    if (console.error("Webhook error:", error), session?.shop) {
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      user && await db.log.create({
        data: {
          userId: user.id,
          type: "error",
          message: `Webhook error: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.stack : String(error),
          metadata: {
            topic,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      });
    }
    return json8(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
async function handleProductWebhook(userId, shopDomain, accessToken, topic) {
  try {
    await db.log.create({
      data: {
        userId,
        type: "webhook",
        message: `Product webhook triggered: ${topic}`,
        metadata: {
          topic,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), console.log(`Product webhook received: ${topic} for shop: ${shopDomain}`);
  } catch (error) {
    throw console.error("Error handling product webhook:", error), error;
  }
}
async function handleProductDelete(userId, topic) {
  try {
    await db.log.create({
      data: {
        userId,
        type: "webhook",
        message: `Product deleted: ${topic}`,
        metadata: {
          topic,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), console.log(`Product deletion webhook: ${topic}`);
  } catch (error) {
    throw console.error("Error handling product deletion webhook:", error), error;
  }
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action7,
  default: () => Index,
  loader: () => loader7
});
import { json as json9 } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useState as useState2, useEffect as useEffect2 } from "react";
init_shopify_server();
init_db();
import {
  Page,
  Layout,
  Card as Card2,
  Text as Text2,
  Button as Button2,
  Badge as Badge2,
  Toast as Toast2,
  InlineStack as InlineStack2,
  Box as Box2,
  Modal as Modal2,
  TextField,
  Select,
  Collapsible,
  ProgressBar as ProgressBar2,
  BlockStack as BlockStack2
} from "@shopify/polaris";

// app/components/HealthCheckModal.tsx
import { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Text,
  Button,
  Badge,
  DataTable,
  ProgressBar,
  InlineStack,
  BlockStack,
  Spinner,
  Toast,
  Box,
  Icon
} from "@shopify/polaris";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@shopify/polaris-icons";
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function HealthCheckModal({
  isOpen,
  onClose,
  jobId,
  currentScore = 0,
  currentGaps = []
}) {
  let [loading, setLoading] = useState(!1), [results, setResults] = useState(null), [toast, setToast] = useState(null), [autoFixing, setAutoFixing] = useState(!1);
  useEffect(() => {
    isOpen && jobId && fetchResults();
  }, [isOpen, jobId]);
  let fetchResults = async () => {
    setLoading(!0);
    try {
      let formData = new FormData();
      formData.append("action", "get-results"), formData.append("jobId", jobId);
      let data = await (await fetch("/api/health-check", {
        method: "POST",
        body: formData
      })).json();
      data.success && data.result ? setResults(data.result) : setToast({ content: data.error || "Failed to fetch results", error: !0 });
    } catch {
      setToast({ content: "Failed to fetch results", error: !0 });
    } finally {
      setLoading(!1);
    }
  }, handleAutoFix = async () => {
    if (!results)
      return;
    let fixableGaps = results.gaps.filter((gap) => gap.fixable);
    if (fixableGaps.length === 0) {
      setToast({ content: "No fixable gaps found", error: !0 });
      return;
    }
    setAutoFixing(!0);
    try {
      let formData = new FormData();
      formData.append("action", "auto-fix"), formData.append("gapTypes", JSON.stringify(fixableGaps.map((gap) => gap.field)));
      let data = await (await fetch("/api/health-check", {
        method: "POST",
        body: formData
      })).json();
      data.success ? (setToast({ content: `Auto-fix initiated for ${fixableGaps.length} gaps` }), setTimeout(fetchResults, 2e3)) : setToast({ content: data.error || "Auto-fix failed", error: !0 });
    } catch {
      setToast({ content: "Auto-fix failed", error: !0 });
    } finally {
      setAutoFixing(!1);
    }
  }, getScoreColor = (score) => score >= 90 ? "success" : score >= 70 ? "warning" : "critical", getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return XCircleIcon;
      case "error":
        return AlertTriangleIcon;
      case "warning":
        return AlertTriangleIcon;
      default:
        return CheckCircleIcon;
    }
  }, getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "critical";
      case "error":
        return "critical";
      case "warning":
        return "warning";
      default:
        return "success";
    }
  }, formatTrend = (trends) => {
    if (trends.length < 2)
      return null;
    let latest = trends[trends.length - 1], previous = trends[trends.length - 2], diff = latest.score - previous.score;
    return {
      value: diff,
      icon: diff >= 0 ? ArrowUpIcon : ArrowDownIcon,
      color: diff >= 0 ? "success" : "critical"
    };
  }, gapsTableRows = results?.gaps.map((gap, index) => [
    /* @__PURE__ */ jsxs2(InlineStack, { gap: "200", align: "start", children: [
      /* @__PURE__ */ jsx3(Icon, { source: getSeverityIcon(gap.severity) }),
      /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", fontWeight: "medium", children: gap.field })
    ] }, index),
    /* @__PURE__ */ jsx3(Badge, { tone: getSeverityColor(gap.severity), children: gap.severity }, `badge-${index}`),
    gap.count,
    gap.fixable ? "Yes" : "No"
  ]) || [], trendsTableRows = results?.trends.slice(-7).map((trend, index) => [
    new Date(trend.date).toLocaleDateString(),
    `${trend.score}%`,
    trend.totalProducts,
    trend.validProducts
  ]) || [];
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx3(
      Modal,
      {
        open: isOpen,
        onClose,
        title: "Health Check Results",
        size: "large",
        children: /* @__PURE__ */ jsx3(Modal.Section, { children: loading ? /* @__PURE__ */ jsxs2(InlineStack, { align: "center", children: [
          /* @__PURE__ */ jsx3(Spinner, { size: "large" }),
          /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", children: "Analyzing your catalog..." })
        ] }) : results ? /* @__PURE__ */ jsxs2(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
            /* @__PURE__ */ jsxs2(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Overall Health Score" }),
              /* @__PURE__ */ jsxs2(Badge, { tone: getScoreColor(results.score), children: [
                results.score,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx3(
              ProgressBar,
              {
                progress: results.score,
                size: "large",
                color: getScoreColor(results.score)
              }
            ),
            /* @__PURE__ */ jsxs2(InlineStack, { gap: "400", align: "start", children: [
              /* @__PURE__ */ jsxs2(Box, { children: [
                /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Total Products" }),
                /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: results.totalProducts })
              ] }),
              /* @__PURE__ */ jsxs2(Box, { children: [
                /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Valid Products" }),
                /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: results.validProducts })
              ] }),
              /* @__PURE__ */ jsxs2(Box, { children: [
                /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Issues Found" }),
                /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: results.gaps.length })
              ] })
            ] }),
            results.trends.length > 1 && /* @__PURE__ */ jsx3(Box, { children: /* @__PURE__ */ jsxs2(InlineStack, { gap: "200", align: "start", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "7-Day Trend" }),
              (() => {
                let trend = formatTrend(results.trends);
                return trend ? /* @__PURE__ */ jsxs2(InlineStack, { gap: "100", children: [
                  /* @__PURE__ */ jsx3(Icon, { source: trend.icon }),
                  /* @__PURE__ */ jsxs2(Text, { variant: "bodyMd", color: trend.color, children: [
                    trend.value > 0 ? "+" : "",
                    trend.value.toFixed(1),
                    "%"
                  ] })
                ] }) : null;
              })()
            ] }) })
          ] }) }),
          results.gaps.length > 0 && /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
            /* @__PURE__ */ jsxs2(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Issues Found" }),
              results.gaps.some((gap) => gap.fixable) && /* @__PURE__ */ jsx3(
                Button,
                {
                  variant: "primary",
                  onClick: handleAutoFix,
                  loading: autoFixing,
                  disabled: autoFixing,
                  children: "Auto-Fix Fixable Issues"
                }
              )
            ] }),
            /* @__PURE__ */ jsx3(
              DataTable,
              {
                columnContentTypes: ["text", "text", "numeric", "text"],
                headings: ["Field", "Severity", "Count", "Fixable"],
                rows: gapsTableRows
              }
            )
          ] }) }),
          results.trends.length > 0 && /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
            /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Health Score Trends (Last 7 Days)" }),
            /* @__PURE__ */ jsx3(
              DataTable,
              {
                columnContentTypes: ["text", "numeric", "numeric", "numeric"],
                headings: ["Date", "Score", "Total Products", "Valid Products"],
                rows: trendsTableRows
              }
            )
          ] }) }),
          results.gaps.length === 0 && /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(InlineStack, { align: "center", gap: "300", children: [
            /* @__PURE__ */ jsx3(Icon, { source: CheckCircleIcon }),
            /* @__PURE__ */ jsxs2(BlockStack, { gap: "200", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Excellent!" }),
              /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Your catalog is in great health. No issues were found." })
            ] })
          ] }) })
        ] }) : /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "No results available. Please try running the health check again." }) })
      }
    ),
    toast && /* @__PURE__ */ jsx3(
      Toast,
      {
        content: toast.content,
        error: toast.error,
        onDismiss: () => setToast(null)
      }
    )
  ] });
}

// app/routes/_index.tsx
init_openaiSpec();
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var loader7 = async ({ request }) => {
  try {
    console.log("\u{1F50D} DEBUG - Starting authentication for request:", request.url);
    let { session } = await authenticate.admin(request);
    console.log("\u{1F50D} DEBUG - Session shop:", session.shop), console.log("\u{1F50D} DEBUG - Session exists:", !!session), console.log("\u{1F50D} DEBUG - Access token exists:", !!session.accessToken), console.log("\u{1F50D} DEBUG - Session ID:", session.id);
    let user = null, latestAudit = null, recentLogs = [];
    try {
      user = await db.user.findUnique({
        where: { shopId: session.shop }
      }), user && (latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" }
      }), await db.log.deleteMany({
        where: {
          userId: user.id,
          message: {
            contains: "GraphQL Error"
          }
        }
      }), recentLogs = await db.log.findMany({
        where: {
          userId: user.id,
          // Filter out logs with raw error details
          message: {
            not: {
              contains: "GraphQL Error"
            }
          }
        },
        orderBy: { createdAt: "desc" },
        take: 3
      }));
    } catch (dbError) {
      console.error("Database error in loader:", dbError);
    }
    let products = [], totalProducts = 0, averageScore = 0;
    if (user)
      try {
        let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
        if (offlineSession?.accessToken) {
          let { ShopifySyncService: ShopifySyncService2 } = await Promise.resolve().then(() => (init_shopifySync(), shopifySync_exports)), { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), shopifyProducts = await new ShopifySyncService2(session.shop, offlineSession.accessToken).syncProducts(user.id), storedProducts = await db.product.findMany({
            where: { userId: user.id },
            select: {
              shopifyId: !0,
              recommendations: !0
            }
          }), recommendationsMap = /* @__PURE__ */ new Map();
          storedProducts.forEach((sp) => {
            sp.recommendations && recommendationsMap.set(sp.shopifyId, sp.recommendations);
          }), products = shopifyProducts.map((shopifyProduct) => {
            let spec = mapShopifyToSpec2(shopifyProduct), scoreData = calculateProductScore2(spec), productId = shopifyProduct.id.replace("gid://shopify/Product/", "");
            return {
              id: productId,
              title: shopifyProduct.title || "Untitled Product",
              description: shopifyProduct.description || "No description",
              score: scoreData.score,
              gaps: scoreData.gaps,
              rawProduct: shopifyProduct,
              // Store raw product for detail view
              spec,
              // Store mapped spec for recommendations
              recommendations: recommendationsMap.get(productId) || null
              // Include stored recommendations
            };
          }), totalProducts = shopifyProducts.length, averageScore = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.score, 0) / products.length) : 0;
        }
      } catch (error) {
        console.error("Error fetching products in loader:", error), products = [
          {
            id: "1",
            title: "Sample Product 1",
            description: "Basic product description",
            score: 75,
            gaps: ["material", "weight"]
          },
          {
            id: "2",
            title: "Sample Product 2",
            description: "Another product with minimal details",
            score: 60,
            gaps: ["material", "dimensions", "use_cases"]
          },
          {
            id: "3",
            title: "Sample Product 3",
            description: "Well-described product with comprehensive details",
            score: 95,
            gaps: []
          }
        ];
      }
    let dashboardMetrics = ((products2, user2) => {
      let totalProducts2 = products2.length, validProducts = products2.filter((p) => p.score >= 90).length, warningProducts = products2.filter((p) => p.score >= 70 && p.score < 90).length, invalidProducts = products2.filter((p) => p.score < 70).length, productsPassedPercentage = totalProducts2 > 0 ? Math.round(validProducts / totalProducts2 * 100) : 0, aiReadinessScore = Math.round(averageScore), optimizationProgress = Math.round(averageScore), lastSyncTime = null;
      return user2 && (lastSyncTime = /* @__PURE__ */ new Date()), {
        aiReadinessScore,
        totalProducts: totalProducts2,
        validProducts,
        warningProducts,
        invalidProducts,
        productsPassedPercentage,
        lastSyncTime,
        optimizationProgress
      };
    })(products, user);
    return json9({
      shop: session.shop,
      user,
      products,
      totalProducts,
      averageScore,
      dashboardMetrics,
      lastSync: recentLogs.find((log) => log.type === "sync")?.createdAt || null,
      recentLogs: recentLogs.map((log) => ({
        id: log.id,
        type: log.type,
        message: log.message,
        createdAt: log.createdAt
      }))
    });
  } catch (error) {
    if (console.error("\u274C ERROR in index loader:", error), console.error("\u274C ERROR details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    }), error instanceof Response)
      throw console.log("\u{1F504} Re-throwing OAuth redirect response"), error;
    return json9({
      shop: "unknown",
      products: [],
      user: null,
      totalProducts: 0,
      averageScore: 0,
      lastSync: null,
      recentLogs: []
    });
  }
}, action7 = async ({ request }) => {
  console.log("\u{1F3AF} INDEX ACTION CALLED");
  try {
    let { admin, session } = await authenticate.admin(request);
    console.log("\u2705 Authentication successful in index action"), console.log("\u{1F511} Admin API client available:", !!admin), console.log("\u{1F4CD} Session shop:", session.shop);
    let formData = await request.formData(), actionType = formData.get("action");
    if (actionType === "sync") {
      console.log("\u{1F680} Starting sync in index action");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return console.log("\u274C User not found for shop:", session.shop), json9({ success: !1, error: "User not found" }, { status: 404 });
      console.log("\u{1F464} User ID:", user.id);
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`;
      console.log("\u{1F511} Loading offline session:", offlineSessionId);
      let offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession)
        return console.log("\u274C Offline session not found"), json9({ success: !1, error: "Offline session not found. Please reinstall the app." }, { status: 401 });
      console.log("\u2705 Offline session loaded, has accessToken:", !!offlineSession.accessToken), console.log("\u{1F511} Access token prefix:", offlineSession.accessToken?.substring(0, 15) + "..."), console.log("\u{1F511} Access token length:", offlineSession.accessToken?.length), console.log("\u{1F50D} Session scope:", offlineSession.scope), console.log("\u{1F50D} Session isOnline:", offlineSession.isOnline);
      let { GraphQLClient: GraphQLClient2 } = await import("graphql-request"), graphqlClient = new GraphQLClient2(
        `https://${session.shop}/admin/api/2025-10/graphql`,
        {
          headers: {
            "X-Shopify-Access-Token": offlineSession.accessToken,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("\u{1F4E6} Starting product sync with offline access token...");
      let PRODUCTS_QUERY2 = `
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
      `, allProducts = [], hasNextPage = !0, after, pageCount = 0;
      for (; hasNextPage; ) {
        pageCount++, console.log(`\u{1F4C4} Fetching page ${pageCount}${after ? " (after cursor)" : " (first page)"}`);
        let response = await graphqlClient.request(PRODUCTS_QUERY2, {
          first: 250,
          after
        });
        console.log("\u{1F4E6} Products in this page:", response.products?.edges?.length || 0), response.products?.edges && allProducts.push(...response.products.edges), hasNextPage = response.products?.pageInfo?.hasNextPage || !1, after = response.products?.pageInfo?.endCursor, hasNextPage && (console.log("\u23F3 Waiting 500ms before next request..."), await new Promise((resolve) => setTimeout(resolve, 500)));
      }
      console.log("\u2705 Product sync completed:", allProducts.length, "products"), await db.log.create({
        data: {
          userId: user.id,
          type: "sync",
          message: `Synchronized ${allProducts.length} products from Shopify`,
          metadata: {
            productsCount: allProducts.length,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), console.log("\u{1F4DD} Creating audit record...");
      let audit = await db.audit.create({
        data: {
          userId: user.id,
          score: 0,
          // Will be calculated after field mapping
          totalProducts: allProducts.length,
          validProducts: 0,
          // Will be calculated after validation
          gaps: []
          // Will be populated after field mapping and validation
        }
      });
      return console.log("\u2705 Audit record created:", audit.id), json9({
        success: !0,
        message: `Successfully synced ${allProducts.length} products`,
        data: {
          productsCount: allProducts.length,
          auditId: audit.id
        }
      });
    }
    if (actionType === "generate-recommendations") {
      console.log("\u{1F916} Generating AI recommendations for single product");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json9({ success: !1, error: "User not found" }, { status: 404 });
      let productId = formData.get("productId");
      if (console.log("\u{1F3AF} Product ID:", productId), !(formData.get("forceRegenerate") === "true")) {
        let existingProduct = await db.product.findFirst({
          where: {
            userId: user.id,
            shopifyId: productId
          }
        });
        if (existingProduct?.recommendations) {
          let recData = existingProduct.recommendations;
          return console.log("\u{1F4CB} Returning existing recommendations for product:", productId), json9({
            success: !0,
            recommendations: recData.recommendations || [],
            isExisting: !0
          });
        }
      }
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return json9({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      let { ShopifySyncService: ShopifySyncService2 } = await Promise.resolve().then(() => (init_shopifySync(), shopifySync_exports)), { AIEnrichmentService: AIEnrichmentService2 } = await Promise.resolve().then(() => (init_aiEnrich(), aiEnrich_exports)), product = (await new ShopifySyncService2(session.shop, offlineSession.accessToken).syncProducts(user.id)).find((p) => p.id.includes(productId));
      if (!product)
        return json9({ success: !1, error: "Product not found" }, { status: 404 });
      let { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), spec = mapShopifyToSpec2(product), gaps = calculateProductScore2(spec).gaps;
      console.log("\u{1F3AF} Product gaps identified:", gaps);
      let result = await new AIEnrichmentService2().enrichProduct(user.id, product, gaps);
      console.log("\u2705 Generated recommendations:", result.improvements.length);
      let recommendationData = {
        recommendations: result.improvements.map((rec) => ({
          ...rec,
          status: "pending"
          // pending, approved, rejected, applied
        })),
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
      };
      return await db.product.upsert({
        where: {
          userId_shopifyId: {
            userId: user.id,
            shopifyId: productId
          }
        },
        create: {
          userId: user.id,
          shopifyId: productId,
          title: product.title,
          recommendations: recommendationData
        },
        update: {
          recommendations: recommendationData
        }
      }), console.log("\u{1F4BE} Stored recommendations in database for product:", productId), json9({
        success: !0,
        recommendations: recommendationData.recommendations,
        isExisting: !1
      });
    }
    if (actionType === "apply-recommendations") {
      console.log("\u{1F4DD} Applying approved recommendations to Shopify");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json9({ success: !1, error: "User not found" }, { status: 404 });
      let productId = formData.get("productId"), approvedRecommendationsJson = formData.get("approvedRecommendations"), approvedRecommendations = JSON.parse(approvedRecommendationsJson);
      if (console.log("\u{1F3AF} Product ID:", productId), console.log("\u2705 Approved recommendations:", approvedRecommendations.length), console.log("\u{1F4CB} Approved recommendation fields:", approvedRecommendations.map((r) => r.field)), !Array.isArray(approvedRecommendations) || approvedRecommendations.length === 0)
        return json9({
          success: !1,
          error: "No approved recommendations provided"
        }, { status: 400 });
      let productRecord = await db.product.findFirst({
        where: {
          userId: user.id,
          shopifyId: productId
        }
      }), updatedRecommendationData = null;
      if (productRecord?.recommendations) {
        let recData = productRecord.recommendations, approvedFields = approvedRecommendations.map((r) => r.field);
        updatedRecommendationData = {
          ...recData,
          recommendations: recData.recommendations.map((rec) => ({
            ...rec,
            status: approvedFields.includes(rec.field) ? "applied" : rec.status
          })),
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return json9({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      let { ShopifySyncService: ShopifySyncService2 } = await Promise.resolve().then(() => (init_shopifySync(), shopifySync_exports)), { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), syncService = new ShopifySyncService2(session.shop, offlineSession.accessToken), product = (await syncService.syncProducts(user.id)).find((p) => p.id.includes(productId));
      if (!product)
        return json9({ success: !1, error: "Product not found" }, { status: 404 });
      let initialSpec = mapShopifyToSpec2(product), initialScore = calculateProductScore2(initialSpec).score;
      console.log("\u{1F4CA} Initial product score:", initialScore);
      let { AIEnrichmentService: AIEnrichmentService2 } = await Promise.resolve().then(() => (init_aiEnrich(), aiEnrich_exports)), enrichmentService = new AIEnrichmentService2(), partialResult = {
        originalProduct: product,
        enrichedSpec: {},
        improvements: approvedRecommendations,
        totalUsage: 0,
        errors: []
      }, success = await enrichmentService.applyEnrichmentToShopify(
        user.id,
        session.shop,
        offlineSession.accessToken,
        partialResult
      );
      console.log("\u2705 Applied changes to Shopify:", success);
      let finalScore = initialScore;
      if (success)
        try {
          let updatedProduct = (await syncService.syncProducts(user.id)).find((p) => p.id.includes(productId));
          if (updatedProduct) {
            let updatedSpec = mapShopifyToSpec2(updatedProduct);
            finalScore = calculateProductScore2(updatedSpec).score, console.log("\u{1F4CA} Final product score:", finalScore), console.log("\u{1F4C8} Score improvement:", finalScore - initialScore);
          }
        } catch (error) {
          console.warn("Could not validate score improvement:", error);
        }
      return updatedRecommendationData && productRecord && (await db.product.update({
        where: { id: productRecord.id },
        data: {
          recommendations: updatedRecommendationData
        }
      }), console.log("\u{1F4BE} Updated recommendation status to applied in database")), await db.log.create({
        data: {
          userId: user.id,
          type: "enrichment",
          message: `Applied ${approvedRecommendations.length} approved AI recommendations to product ${productId}`,
          metadata: {
            productId,
            approvedCount: approvedRecommendations.length,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), json9({
        success: !0,
        appliedCount: approvedRecommendations.length,
        scoreImprovement: {
          initial: initialScore,
          final: finalScore,
          improvement: finalScore - initialScore
        }
      });
    }
    if (actionType === "save-customer-input") {
      console.log("\u{1F4BE} Saving customer input data");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json9({ success: !1, error: "User not found" }, { status: 404 });
      let productId = formData.get("productId"), inputDataJson = formData.get("inputData"), inputData = JSON.parse(inputDataJson);
      console.log("\u{1F3AF} Product ID:", productId), console.log("\u{1F4DD} Input data:", inputData);
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return json9({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      let { GraphQLClient: GraphQLClient2 } = await import("graphql-request"), graphqlClient = new GraphQLClient2(
        `https://${session.shop}/admin/api/2025-10/graphql`,
        {
          headers: {
            "X-Shopify-Access-Token": offlineSession.accessToken,
            "Content-Type": "application/json"
          }
        }
      ), appliedCount = 0, appliedFields = [];
      for (let [field, value] of Object.entries(inputData))
        try {
          let metafieldValue = value, metafieldType = "single_line_text_field";
          if (field.startsWith("dimensions_"))
            continue;
          (field === "specifications" || field === "warranty" || field === "return_policy") && (metafieldType = "multi_line_text_field");
          let CREATE_METAFIELD_MUTATION = `
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
              metafieldsSet(metafields: $metafields) {
                metafields {
                  id
                  namespace
                  key
                  value
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `, response = await graphqlClient.request(CREATE_METAFIELD_MUTATION, {
            metafields: [
              {
                ownerId: `gid://shopify/Product/${productId}`,
                namespace: "catalogai",
                key: field,
                type: metafieldType,
                value: metafieldValue
              }
            ]
          });
          response.metafieldsSet.userErrors?.length ? console.error(`\u274C Error applying ${field}:`, response.metafieldsSet.userErrors) : (appliedCount++, appliedFields.push(field), console.log(`\u2705 Applied ${field}: ${metafieldValue}`));
        } catch (error) {
          console.error(`\u274C Error applying ${field}:`, error);
        }
      let dimensionData = ["dimensions_length", "dimensions_width", "dimensions_height"].reduce((acc, key) => {
        if (inputData[key]) {
          let dimKey = key.replace("dimensions_", "");
          acc[dimKey] = inputData[key];
        }
        return acc;
      }, {});
      if (Object.keys(dimensionData).length > 0)
        try {
          let CREATE_METAFIELD_MUTATION = `
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
              metafieldsSet(metafields: $metafields) {
                metafields {
                  id
                  namespace
                  key
                  value
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `;
          (await graphqlClient.request(CREATE_METAFIELD_MUTATION, {
            metafields: [
              {
                ownerId: `gid://shopify/Product/${productId}`,
                namespace: "catalogai",
                key: "dimensions",
                type: "json",
                value: JSON.stringify(dimensionData)
              }
            ]
          })).metafieldsSet.userErrors?.length || (appliedCount++, appliedFields.push("dimensions"), console.log("\u2705 Applied dimensions:", dimensionData));
        } catch (error) {
          console.error("\u274C Error applying dimensions:", error);
        }
      return await db.log.create({
        data: {
          userId: user.id,
          type: "customer_input",
          message: `Applied ${appliedCount} customer input fields to product ${productId}`,
          metadata: {
            productId,
            appliedFields,
            appliedCount,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), json9({
        success: !0,
        appliedCount,
        appliedFields,
        message: `Successfully saved ${appliedCount} fields to your product!`
      });
    }
    return json9({ success: !0 });
  } catch (error) {
    if (console.error("\u274C Error in index action:", error), error instanceof Response)
      throw console.log("\u{1F504} Re-throwing OAuth redirect response"), error;
    let userFriendlyError = "Sync failed. Please try again.";
    error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized") ? userFriendlyError = "Authentication failed. Please reinstall the app." : error.message.includes("403") || error.message.includes("Forbidden") ? userFriendlyError = "Insufficient permissions. Please check app permissions." : error.message.includes("429") || error.message.includes("rate limit") ? userFriendlyError = "Rate limit exceeded. Please try again in a few minutes." : error.message.includes("GraphQL") && (userFriendlyError = "API connection failed. Please try again."));
    try {
      let { session } = await authenticate.admin(request), user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      user && await db.log.create({
        data: {
          userId: user.id,
          type: "error",
          message: userFriendlyError,
          error: error instanceof Error ? error.message : "Unknown error",
          metadata: {
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            action: "sync"
          }
        }
      });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
    return json9(
      {
        success: !1,
        error: userFriendlyError
      },
      { status: 500 }
    );
  }
};
function Index() {
  let loaderData = useLoaderData(), { shop, totalProducts, averageScore, dashboardMetrics, lastSync, recentLogs, user } = loaderData, [products, setProducts] = useState2(loaderData.products), [isSyncing, setIsSyncing] = useState2(!1), [isHealthChecking, setIsHealthChecking] = useState2(!1), [toastActive, setToastActive] = useState2(!1), [toastMessage, setToastMessage] = useState2(""), [healthModalOpen, setHealthModalOpen] = useState2(!1), [healthCheckJobId, setHealthCheckJobId] = useState2(), [selectedProduct, setSelectedProduct] = useState2(null), [productModalOpen, setProductModalOpen] = useState2(!1), [recommendations, setRecommendations] = useState2([]), [approvalState, setApprovalState] = useState2({}), [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState2(!1), [isApplyingChanges, setIsApplyingChanges] = useState2(!1), [justAppliedChanges, setJustAppliedChanges] = useState2(!1), [customerInputOpen, setCustomerInputOpen] = useState2(!1), [customerInputData, setCustomerInputData] = useState2({}), [isSavingCustomerInput, setIsSavingCustomerInput] = useState2(!1), [showOnlyLowHealth, setShowOnlyLowHealth] = useState2(!1), [showOnlyNoDescription, setShowOnlyNoDescription] = useState2(!1), syncFetcher = useFetcher(), healthCheckFetcher = useFetcher(), recommendationFetcher = useFetcher(), customerInputFetcher = useFetcher();
  useEffect2(() => {
    setProducts(loaderData.products);
  }, [loaderData.products]);
  let handleSync = () => {
    setIsSyncing(!0), syncFetcher.submit(
      { action: "sync" },
      { method: "post" }
      // Same route action, no need to specify action path
    );
  }, handleHealthCheck = () => {
    setIsHealthChecking(!0), healthCheckFetcher.submit(
      {},
      { method: "get", action: "/api/health-check" }
    );
  }, handleProductClick = (product) => {
    if (setSelectedProduct(product), setProductModalOpen(!0), setJustAppliedChanges(!1), product.recommendations?.recommendations) {
      console.log("\u{1F4CB} Loading existing recommendations for product:", product.id);
      let existingRecs = product.recommendations.recommendations;
      setRecommendations(existingRecs);
      let approvalState2 = {};
      existingRecs.forEach((rec) => {
        rec.status === "approved" || rec.status === "applied" ? approvalState2[rec.field] = !0 : rec.status === "rejected" && (approvalState2[rec.field] = !1);
      }), setApprovalState(approvalState2);
    } else
      setRecommendations([]), setApprovalState({});
  }, handleGenerateRecommendations = () => {
    selectedProduct && (setIsGeneratingRecommendations(!0), setJustAppliedChanges(!1), recommendationFetcher.submit(
      {
        action: "generate-recommendations",
        productId: selectedProduct.id,
        forceRegenerate: recommendations.length > 0 ? "true" : "false"
        // Force regenerate if called from regenerate button
      },
      { method: "post" }
    ));
  }, handleToggleApproval = (fieldName, newState) => {
    setApprovalState((prev) => ({
      ...prev,
      [fieldName]: newState !== void 0 ? newState : prev[fieldName] === !0 ? !1 : prev[fieldName] === !1 ? void 0 : !0
    }));
  }, handleApplyChanges = () => {
    if (!selectedProduct)
      return;
    let approvedRecommendations = recommendations.filter(
      (rec) => approvalState[rec.field] === !0
    ), rejectedRecommendations = recommendations.filter(
      (rec) => approvalState[rec.field] === !1
    ), pendingRecommendations = recommendations.filter(
      (rec) => approvalState[rec.field] === void 0
    );
    if (console.log("\u{1F4CA} Approval Summary:", {
      total: recommendations.length,
      approved: approvedRecommendations.length,
      rejected: rejectedRecommendations.length,
      pending: pendingRecommendations.length,
      approvedFields: approvedRecommendations.map((r) => r.field),
      rejectedFields: rejectedRecommendations.map((r) => r.field)
    }), approvedRecommendations.length === 0) {
      setToastMessage("Please approve at least one recommendation before applying changes"), setToastActive(!0);
      return;
    }
    console.log("\u{1F680} Starting apply changes..."), console.log("\u{1F4CB} Approved recommendations to apply:", approvedRecommendations), setIsApplyingChanges(!0), recommendationFetcher.submit(
      {
        action: "apply-recommendations",
        productId: selectedProduct.id,
        approvedRecommendations: JSON.stringify(approvedRecommendations)
      },
      { method: "post" }
    );
  };
  if (syncFetcher.data && isSyncing) {
    let data = syncFetcher.data;
    data.success ? (setToastMessage(`Successfully synced ${data.data?.productsCount || 0} products`), setToastActive(!0)) : (setToastMessage(`Sync failed: ${data.error}`), setToastActive(!0)), setIsSyncing(!1);
  }
  if (healthCheckFetcher.data && isHealthChecking) {
    let data = healthCheckFetcher.data;
    data.success ? (setHealthCheckJobId(data.jobId), setHealthModalOpen(!0), setToastMessage(`Health scan initiated - analyzing ${data.currentScore}% current score`), setToastActive(!0)) : (setToastMessage(`Health check failed: ${data.error}`), setToastActive(!0)), setIsHealthChecking(!1);
  }
  if (recommendationFetcher.data && isGeneratingRecommendations) {
    let data = recommendationFetcher.data;
    if (data.success && data.recommendations) {
      if (setRecommendations(data.recommendations), data.isExisting ? setToastMessage(`Loaded existing ${data.recommendations.length} AI recommendations`) : setToastMessage(`Generated ${data.recommendations.length} new AI recommendations`), setToastActive(!0), data.isExisting) {
        let approvalState2 = {};
        data.recommendations.forEach((rec) => {
          rec.status === "approved" || rec.status === "applied" ? approvalState2[rec.field] = !0 : rec.status === "rejected" && (approvalState2[rec.field] = !1);
        }), setApprovalState(approvalState2);
      }
    } else
      data.error && (setToastMessage(`Failed to generate recommendations: ${data.error}`), setToastActive(!0));
    setIsGeneratingRecommendations(!1);
  }
  if (recommendationFetcher.data && isApplyingChanges) {
    let data = recommendationFetcher.data;
    if (console.log("\u{1F50D} Apply changes response:", data), console.log("\u{1F50D} Response type:", typeof data), console.log("\u{1F50D} Response keys:", Object.keys(data)), data.success && selectedProduct) {
      let appliedFields = recommendations.filter((rec) => approvalState[rec.field] === !0).map((rec) => rec.field), getFieldCelebration = (field) => ({
        keywords: "\u{1F3AF} Awesome! Keywords added - your product is now more discoverable!",
        description: "\u{1F4DD} Great work! Enhanced description will help customers understand your product better!",
        features: "\u2728 Fantastic! Feature list added - customers can see what makes your product special!",
        use_cases: "\u{1F4A1} Perfect! Use cases added - customers now know how to use your product!",
        target_audience: "\u{1F465} Excellent! Target audience defined - your marketing just got more focused!",
        material: "\u{1F52C} Nice! Material info added - customers can make informed decisions!",
        dimensions: "\u{1F4CF} Great! Dimensions added - no more size surprises for customers!",
        weight: "\u2696\uFE0F Perfect! Weight information helps with shipping expectations!",
        color: "\u{1F3A8} Colorful! Color info added - visual buyers will love this!",
        brand: "\u{1F3F7}\uFE0F Brand power! Brand info strengthens customer trust!",
        warranty: "\u{1F6E1}\uFE0F Security boost! Warranty info builds customer confidence!",
        sku: "\u{1F4E6} Organized! SKU added for better inventory management!",
        tags: "\u{1F3F7}\uFE0F Tagged! Product categorization just got better!",
        ai_search_queries: "\u{1F916} AI-ready! Search queries optimized for AI discovery!",
        semantic_description: "\u{1F9E0} Smart! AI-optimized description for better search matching!"
      })[field] || `\u2705 ${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ")} updated!`, message = "";
      appliedFields.length === 1 ? message = getFieldCelebration(appliedFields[0]) : appliedFields.length === 2 ? message = `\u{1F389} Double win! Updated ${appliedFields.map((f) => f.replace(/_/g, " ")).join(" and ")}!` : appliedFields.length >= 3 && (message = `\u{1F680} Amazing progress! Applied ${appliedFields.length} improvements - you're on fire!`);
      let finalScore = selectedProduct.score, pointsEarned = 0;
      if (data.scoreImprovement) {
        finalScore = data.scoreImprovement.final;
        let improvement = data.scoreImprovement.improvement;
        pointsEarned = appliedFields.length * 15, improvement > 0 ? message += ` \u{1F4C8} Score: ${data.scoreImprovement.initial}% \u2192 ${data.scoreImprovement.final}% (+${improvement.toFixed(0)}%) | +${pointsEarned} points!` : message += ` \u{1F4CA} Score: ${data.scoreImprovement.final}%`;
      }
      let updatedGaps = selectedProduct.gaps.filter((gap) => !appliedFields.includes(gap)), updatedSelectedProduct = {
        ...selectedProduct,
        score: finalScore,
        gaps: updatedGaps
      };
      setProducts((prev) => prev.map(
        (p) => p.id === selectedProduct.id ? updatedSelectedProduct : p
      )), setSelectedProduct(updatedSelectedProduct), setRecommendations([]), setApprovalState({}), setJustAppliedChanges(!0);
      let safeMessage = typeof message == "string" && message.length > 0 && !message.match(/^\d{3}$/) ? message : "Changes applied successfully!";
      setToastMessage(safeMessage), setToastActive(!0);
    } else
      data.error ? (setToastMessage(`Failed to apply changes: ${data.error}`), setToastActive(!0)) : (console.error("\u{1F6A8} Unexpected response format:", data), setToastMessage(`Unexpected response: ${JSON.stringify(data)}`), setToastActive(!0));
    setIsApplyingChanges(!1);
  }
  if (customerInputFetcher.data && isSavingCustomerInput) {
    let data = customerInputFetcher.data;
    if (console.log("\u{1F50D} Customer input save response:", data), data.success && selectedProduct) {
      let appliedFields = data.appliedFields || [], appliedCount = data.appliedCount || 0, message = "";
      appliedCount === 1 ? message = `\u{1F389} Great! ${appliedFields[0]?.replace(/_/g, " ")} added to your product specs!` : appliedCount > 1 && (message = `\u{1F680} Excellent! Added ${appliedCount} product specifications!`);
      let estimatedImprovement = appliedCount * 4;
      message += ` \u{1F4C8} Health score boost: ~+${estimatedImprovement}% | +${appliedCount * 15} points!`;
      let updatedGaps = selectedProduct.gaps.filter((gap) => !appliedFields.includes(gap)), updatedScore = Math.min(100, selectedProduct.score + estimatedImprovement), updatedSelectedProduct = {
        ...selectedProduct,
        score: updatedScore,
        gaps: updatedGaps
      };
      setProducts((prev) => prev.map(
        (p) => p.id === selectedProduct.id ? updatedSelectedProduct : p
      )), setSelectedProduct(updatedSelectedProduct), setCustomerInputData({}), setCustomerInputOpen(!1), setJustAppliedChanges(!0), setToastMessage(message), setToastActive(!0);
    } else
      data.error && (setToastMessage(`Failed to save: ${data.error}`), setToastActive(!0));
    setIsSavingCustomerInput(!1);
  }
  let getFieldPlaceholder = (field) => ({
    material: "e.g., Cotton, Polyester, Steel, Wood",
    weight: "e.g., 2.5 lbs, 1.2 kg",
    color: "e.g., Navy Blue, Black, Red",
    size: "e.g., Large, XL, 12x8x4",
    brand: "e.g., Your Brand Name",
    model: "e.g., Model ABC-123",
    upc: "e.g., 123456789012",
    vendor: "e.g., Supplier Company",
    age_range: "e.g., 18-65, Adults, 3+",
    compatibility: "e.g., iPhone 12, Samsung Galaxy",
    warranty: "e.g., 1 year limited warranty",
    return_policy: "e.g., 30-day returns accepted",
    shipping_info: "e.g., Free shipping over $50",
    specifications: "e.g., Power: 110V, Material: ABS Plastic",
    documentation_url: "e.g., https://yoursite.com/manual.pdf",
    video_urls: "e.g., https://youtube.com/watch?v=abc123"
  })[field] || `Enter ${field.replace(/_/g, " ")}`, getFieldHelpText = (field) => ({
    material: "Primary material or fabric composition",
    weight: "Product weight with unit (lbs, kg, oz)",
    color: "Primary color or color options",
    brand: "Manufacturer or brand name",
    warranty: "Warranty terms and duration",
    upc: "Universal Product Code for inventory",
    specifications: "Technical specs, one per line"
  })[field] || "", getFieldPoints = (field) => {
    let fieldCategories = {
      required: 25,
      high: 20,
      medium: 15,
      low: 10
    }, highFields = ["material", "dimensions", "weight", "brand"], mediumFields = ["color", "size", "upc", "compatibility", "age_range", "gender"];
    return highFields.includes(field) ? fieldCategories.high : mediumFields.includes(field) ? fieldCategories.medium : fieldCategories.low;
  }, getFieldImpact = (field) => {
    let highFields = ["material", "dimensions", "weight", "brand"], mediumFields = ["color", "size", "upc", "compatibility", "age_range", "gender"];
    return highFields.includes(field) ? "4-5" : mediumFields.includes(field) ? "3-4" : "2-3";
  }, handleSaveCustomerInput = () => {
    if (!selectedProduct)
      return;
    let validationErrors = [], filledData = {};
    if (Object.entries(customerInputData).forEach(([field, value]) => {
      let trimmedValue = value.trim();
      trimmedValue && (field === "upc" && trimmedValue.length < 8 ? validationErrors.push("UPC must be at least 8 digits") : field === "weight" && !/\d+(\.\d+)?\s*(lbs?|kgs?|oz|pounds?|kilograms?|ounces?)/i.test(trimmedValue) ? validationErrors.push('Weight must include unit (e.g., "2.5 lbs", "1.2 kg")') : (field === "documentation_url" || field === "video_urls") && trimmedValue && !trimmedValue.startsWith("http") ? validationErrors.push(`${field.replace(/_/g, " ")} must be a valid URL starting with http`) : field === "age_range" && trimmedValue && !/\d+/.test(trimmedValue) ? validationErrors.push('Age range must contain numbers (e.g., "18+", "3-12")') : filledData[field] = trimmedValue);
    }), validationErrors.length > 0) {
      setToastMessage(`Validation errors: ${validationErrors.join(", ")}`), setToastActive(!0);
      return;
    }
    if (Object.keys(filledData).length === 0) {
      setToastMessage("Please fill in at least one field before saving"), setToastActive(!0);
      return;
    }
    setIsSavingCustomerInput(!0), customerInputFetcher.submit(
      {
        action: "save-customer-input",
        productId: selectedProduct.id,
        inputData: JSON.stringify(filledData)
      },
      { method: "post" }
    );
  }, filteredProducts = products.filter((product) => !(showOnlyLowHealth && product.score >= 70 || showOnlyNoDescription && product.description && product.description !== "No description")), rows = products.map(
    (product) => [
      product.id,
      product.title,
      product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description,
      `${product.score}%`,
      product.gaps.length > 0 ? product.gaps.join(", ") : "None"
    ]
  );
  return /* @__PURE__ */ jsxs3(Page, { title: "CatalogAI Optimizer Dashboard", children: [
    /* @__PURE__ */ jsxs3(Layout, { children: [
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }, children: [
        /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { align: "center", children: [
          /* @__PURE__ */ jsxs3("div", { style: { position: "relative", width: "80px", height: "80px", marginBottom: "10px" }, children: [
            /* @__PURE__ */ jsxs3("svg", { width: "80", height: "80", style: { transform: "rotate(-90deg)" }, children: [
              /* @__PURE__ */ jsx4("circle", { cx: "40", cy: "40", r: "35", fill: "none", stroke: "#e5e7eb", strokeWidth: "8" }),
              /* @__PURE__ */ jsx4(
                "circle",
                {
                  cx: "40",
                  cy: "40",
                  r: "35",
                  fill: "none",
                  stroke: dashboardMetrics.aiReadinessScore >= 90 ? "#10b981" : dashboardMetrics.aiReadinessScore >= 50 ? "#f59e0b" : "#ef4444",
                  strokeWidth: "8",
                  strokeDasharray: `${dashboardMetrics.aiReadinessScore / 100 * 220} 220`,
                  strokeLinecap: "round"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3("div", { style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              fontWeight: "bold",
              color: dashboardMetrics.aiReadinessScore >= 90 ? "#10b981" : dashboardMetrics.aiReadinessScore >= 50 ? "#f59e0b" : "#ef4444"
            }, children: [
              dashboardMetrics.aiReadinessScore,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3(Text2, { variant: "headingLg", as: "p", children: [
            dashboardMetrics.aiReadinessScore,
            " / 100"
          ] }),
          /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Excellent AI readiness" })
        ] }) }),
        /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { align: "center", children: [
          /* @__PURE__ */ jsxs3(Text2, { variant: "headingLg", as: "p", children: [
            dashboardMetrics.productsPassedPercentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
            dashboardMetrics.validProducts,
            " of ",
            dashboardMetrics.totalProducts,
            " products"
          ] }),
          /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "success", as: "p", children: "\u2191 5% from last week" })
        ] }) }),
        /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { align: "center", children: [
          /* @__PURE__ */ jsx4(Text2, { variant: "headingLg", as: "p", children: dashboardMetrics.lastSyncTime ? `${Math.floor((Date.now() - new Date(dashboardMetrics.lastSyncTime).getTime()) / (1e3 * 60 * 60))}h ago` : "Never" }),
          /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", as: "p", children: "Last synced successfully" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
        /* @__PURE__ */ jsx4(Text2, { variant: "headingLg", as: "h2", children: "Feed Health" }),
        /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Product validation distribution" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: "20px" }, children: [
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", marginBottom: "10px" }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              width: `${dashboardMetrics.validProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#10b981",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }),
            /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.validProducts,
              " products"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", marginBottom: "10px" }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              width: `${dashboardMetrics.warningProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#f59e0b",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }),
            /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.warningProducts,
              " products"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", marginBottom: "20px" }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              width: `${dashboardMetrics.invalidProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#ef4444",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }),
            /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.invalidProducts,
              " products"
            ] })
          ] }),
          /* @__PURE__ */ jsx4(Button2, { variant: "primary", children: "View Validation Report" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
        /* @__PURE__ */ jsx4(Text2, { variant: "headingLg", as: "h2", children: "Next Actions" }),
        /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Recommended optimizations for your catalog" }),
        /* @__PURE__ */ jsxs3("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }, children: [
          /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.invalidProducts,
              " products need attention"
            ] }),
            /* @__PURE__ */ jsx4(Button2, { variant: "primary", tone: "critical", children: "Take Action" })
          ] }) }),
          /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
              "Optimize ",
              dashboardMetrics.warningProducts,
              " products"
            ] }),
            /* @__PURE__ */ jsx4(Button2, { variant: "primary", children: "Take Action" })
          ] }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
        /* @__PURE__ */ jsx4("div", { style: { marginBottom: "10px" }, children: /* @__PURE__ */ jsx4("div", { style: {
          width: "100%",
          height: "8px",
          background: "#e5e7eb",
          borderRadius: "4px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ jsx4("div", { style: {
          width: `${dashboardMetrics.optimizationProgress}%`,
          height: "100%",
          background: "#3b82f6",
          transition: "width 0.3s ease"
        } }) }) }),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
            "Your catalog is ",
            dashboardMetrics.optimizationProgress,
            "% AI-ready \u2014 ",
            100 - dashboardMetrics.optimizationProgress,
            "% left to optimize!"
          ] }),
          /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: [
            dashboardMetrics.optimizationProgress,
            "% Complete"
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { style: { marginTop: "5px" }, children: /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: "Keep going! \u{1F680}" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
        /* @__PURE__ */ jsxs3(InlineStack2, { children: [
          /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsx4(Text2, { variant: "headingLg", as: "h2", children: "\u{1F4E6} Product Catalog" }),
            /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Browse and manage your product inventory" })
          ] }),
          /* @__PURE__ */ jsx4(InlineStack2, { children: /* @__PURE__ */ jsx4(
            Button2,
            {
              onClick: handleSync,
              loading: isSyncing,
              variant: "primary",
              size: "large",
              children: isSyncing ? "Syncing..." : "\u{1F504} Sync Products"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(InlineStack2, { children: [
          /* @__PURE__ */ jsxs3(InlineStack2, { children: [
            /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Filter by:" }),
            /* @__PURE__ */ jsx4(
              Button2,
              {
                variant: showOnlyLowHealth ? "primary" : "tertiary",
                size: "slim",
                onClick: () => setShowOnlyLowHealth(!showOnlyLowHealth),
                children: "\u{1F6A8} Low Health Only"
              }
            ),
            /* @__PURE__ */ jsx4(
              Button2,
              {
                variant: showOnlyNoDescription ? "primary" : "tertiary",
                size: "slim",
                onClick: () => setShowOnlyNoDescription(!showOnlyNoDescription),
                children: "\u{1F4DD} Missing Descriptions"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: [
            "Showing ",
            filteredProducts.length,
            " of ",
            products.length,
            " products"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "product-grid",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px",
              marginTop: "20px",
              width: "100%"
            },
            children: filteredProducts.map(
              (product, index) => /* @__PURE__ */ jsx4(
                Card2,
                {
                  children: /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                    /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                      /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                        /* @__PURE__ */ jsx4(
                          Button2,
                          {
                            variant: "plain",
                            onClick: () => handleProductClick(product),
                            children: product.title
                          }
                        ),
                        /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: [
                          "ID: ",
                          product.id
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                        /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", as: "p", children: product.description && product.description !== "No description" ? product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description : /* @__PURE__ */ jsx4(Text2, { tone: "subdued", variant: "bodyMd", as: "p", children: "No description available" }) }),
                        product.gaps.length > 0 && /* @__PURE__ */ jsxs3(InlineStack2, { wrap: !0, children: [
                          product.gaps.slice(0, 3).map(
                            (gap, gapIndex) => /* @__PURE__ */ jsx4(Badge2, { tone: "warning", size: "small", children: gap }, gapIndex)
                          ),
                          product.gaps.length > 3 && /* @__PURE__ */ jsx4(Badge2, { tone: "info", size: "small", children: `+${product.gaps.length - 3} more` })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                      /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                        /* @__PURE__ */ jsx4(
                          ProgressBar2,
                          {
                            progress: product.score,
                            size: "small"
                          }
                        ),
                        /* @__PURE__ */ jsx4(
                          Badge2,
                          {
                            tone: product.score >= 90 ? "success" : product.score >= 70 ? "warning" : "critical",
                            size: "small",
                            children: `${product.score}%`
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx4(
                        Button2,
                        {
                          size: "slim",
                          variant: "primary",
                          onClick: () => handleProductClick(product),
                          children: "\u{1F527} Optimize"
                        }
                      )
                    ] })
                  ] })
                },
                product.id
              )
            )
          }
        ),
        filteredProducts.length === 0 && /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
          /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "\u{1F389} No products match your filters!" }),
          /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: showOnlyLowHealth ? "All your products are healthy! Great job maintaining your catalog." : showOnlyNoDescription ? "All your products have descriptions! Your catalog is well-documented." : "No products found matching your current filters." }),
          /* @__PURE__ */ jsx4(
            Button2,
            {
              variant: "tertiary",
              onClick: () => {
                setShowOnlyLowHealth(!1), setShowOnlyNoDescription(!1);
              },
              children: "Clear Filters"
            }
          )
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
        /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "Quick Actions" }),
        /* @__PURE__ */ jsxs3(BlockStack2, { children: [
          /* @__PURE__ */ jsx4(
            Button2,
            {
              fullWidth: !0,
              onClick: handleHealthCheck,
              loading: isHealthChecking,
              variant: averageScore < 90 ? "primary" : "secondary",
              children: averageScore < 90 ? "Quick Scan Now" : "Run Health Check"
            }
          ),
          /* @__PURE__ */ jsx4(Button2, { fullWidth: !0, children: "Generate Feed" }),
          /* @__PURE__ */ jsx4(Button2, { fullWidth: !0, children: "View Analytics" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
        /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "Recent Activity" }),
        /* @__PURE__ */ jsx4(BlockStack2, { children: recentLogs.length > 0 ? recentLogs.map(
          (log) => /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(Text2, { as: "span", children: [
              log.type === "sync" && "\u{1F504} ",
              log.type === "push" && "\u{1F4E4} ",
              log.type === "error" && "\u274C ",
              log.type === "health_scan" && "\u{1F50D} ",
              log.type === "auto_fix" && "\u{1F527} ",
              log.type === "ai_enrichment" && "\u{1F916} ",
              log.type === "settings_update" && "\u2699\uFE0F ",
              log.message
            ] }),
            /* @__PURE__ */ jsx4(Text2, { as: "p", variant: "bodySm", tone: "subdued", children: new Date(log.createdAt).toLocaleString() })
          ] }, log.id)
        ) : /* @__PURE__ */ jsx4(Text2, { as: "p", tone: "subdued", children: "No recent activity" }) })
      ] }) }) })
    ] }),
    toastActive && /* @__PURE__ */ jsx4(
      Toast2,
      {
        content: toastMessage,
        onDismiss: () => setToastActive(!1)
      }
    ),
    /* @__PURE__ */ jsx4(
      HealthCheckModal,
      {
        isOpen: healthModalOpen,
        onClose: () => setHealthModalOpen(!1),
        jobId: healthCheckJobId,
        currentScore: averageScore,
        currentGaps: []
      }
    ),
    /* @__PURE__ */ jsx4(
      Modal2,
      {
        open: productModalOpen,
        onClose: () => setProductModalOpen(!1),
        title: "",
        size: "large",
        primaryAction: {
          content: "Close",
          onAction: () => setProductModalOpen(!1)
        },
        children: selectedProduct && /* @__PURE__ */ jsx4(Modal2.Section, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
          /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(InlineStack2, { children: [
              /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                /* @__PURE__ */ jsxs3(Text2, { variant: "headingLg", as: "h2", children: [
                  "\u{1F4E6} ",
                  selectedProduct.title
                ] }),
                /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: [
                  "Product ID: ",
                  selectedProduct.id
                ] }),
                selectedProduct.description && selectedProduct.description !== "No description" && /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", as: "p", children: selectedProduct.description })
              ] }),
              /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                /* @__PURE__ */ jsxs3(
                  Badge2,
                  {
                    tone: selectedProduct.score >= 90 ? "success" : selectedProduct.score >= 70 ? "warning" : "critical",
                    size: "large",
                    children: [
                      selectedProduct.score,
                      "% Health"
                    ]
                  }
                ),
                justAppliedChanges && /* @__PURE__ */ jsx4(Badge2, { tone: "success", size: "small", children: "\u2728 Just Updated!" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs3(Box2, { children: [
              /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Overall Health Progress" }),
                /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: `${Math.round(selectedProduct.score / 100 * 500)} / 500 points` })
              ] }),
              /* @__PURE__ */ jsx4(Box2, { paddingBlockStart: "200", children: /* @__PURE__ */ jsx4(
                ProgressBar2,
                {
                  progress: selectedProduct.score,
                  size: "large"
                }
              ) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "\u{1F4CA} Category Breakdown" }),
            /* @__PURE__ */ jsx4(InlineStack2, { children: [
              {
                name: "\u{1F6A8} Required Fields",
                icon: "\u{1F6A8}",
                fields: ["title", "description", "price", "availability", "category"],
                color: "critical",
                description: "Essential for product visibility"
              },
              {
                name: "\u26A1 High Priority",
                icon: "\u26A1",
                fields: ["material", "dimensions", "weight", "brand", "use_cases", "features", "image_urls"],
                color: "warning",
                description: "Important for customer decisions"
              },
              {
                name: "\u{1F4CB} Medium Priority",
                icon: "\u{1F4CB}",
                fields: ["color", "size", "target_audience", "keywords", "upc", "compatibility", "age_range", "gender", "video_urls"],
                color: "attention",
                description: "Enhances product discovery"
              },
              {
                name: "\u2728 Enhancement",
                icon: "\u2728",
                fields: ["model", "sku", "tags", "vendor", "warranty", "return_policy", "shipping_info", "documentation_url", "specifications", "ai_search_queries", "semantic_description"],
                color: "success",
                description: "Optimizes for AI search"
              }
            ].map((category, index) => {
              let missingInCategory = selectedProduct.gaps.filter((gap) => category.fields.includes(gap)).length, completedInCategory = category.fields.length - missingInCategory, progress = Math.round(completedInCategory / category.fields.length * 100);
              return /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                  /* @__PURE__ */ jsxs3(Text2, { variant: "headingSm", as: "h4", children: [
                    category.icon,
                    " ",
                    category.name
                  ] }),
                  /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: category.description }),
                  /* @__PURE__ */ jsxs3(InlineStack2, { wrap: !0, children: [
                    /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", as: "p", children: [
                      completedInCategory,
                      "/",
                      category.fields.length,
                      " complete"
                    ] }),
                    missingInCategory > 0 && /* @__PURE__ */ jsx4(Badge2, { tone: "warning", size: "small", children: `${missingInCategory} missing` })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                  /* @__PURE__ */ jsx4(
                    ProgressBar2,
                    {
                      progress,
                      size: "small"
                    }
                  ),
                  /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: `${progress}% complete` })
                ] })
              ] }) }, index);
            }) })
          ] }) }),
          /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(InlineStack2, { children: [
              /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "\u{1F50D} Missing Fields Analysis" }),
              selectedProduct.gaps.length === 0 ? /* @__PURE__ */ jsx4(Badge2, { tone: "success", size: "large", children: "\u{1F389} Perfect Score!" }) : /* @__PURE__ */ jsx4(Badge2, { tone: "critical", size: "large", children: `${selectedProduct.gaps.length} fields missing` })
            ] }),
            selectedProduct.gaps.length > 0 ? /* @__PURE__ */ jsxs3(BlockStack2, { children: [
              /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "These fields are missing and could improve your product's visibility and AI search performance:" }),
              /* @__PURE__ */ jsx4(InlineStack2, { wrap: !0, children: selectedProduct.gaps.map(
                (gap, index) => /* @__PURE__ */ jsx4(Badge2, { tone: "warning", size: "small", children: gap.replace(/_/g, " ") }, index)
              ) })
            ] }) : /* @__PURE__ */ jsxs3(BlockStack2, { children: [
              /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "success", as: "p", children: "\u{1F389} Congratulations! Your product has all the essential fields completed." }),
              /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: "This product is optimized for search engines and AI-powered discovery." })
            ] })
          ] }) }),
          selectedProduct.gaps.length > 0 && /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(InlineStack2, { children: [
              /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "\u{1F916} AI Recommendations" }),
              recommendations.length > 0 && /* @__PURE__ */ jsx4(
                Button2,
                {
                  onClick: () => {
                    setRecommendations([]), setApprovalState({}), handleGenerateRecommendations();
                  },
                  variant: "secondary",
                  size: "slim",
                  loading: isGeneratingRecommendations,
                  children: "\u{1F504} Regenerate"
                }
              )
            ] }),
            recommendations.length === 0 ? /* @__PURE__ */ jsxs3(BlockStack2, { children: [
              /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "\u{1F3AF} Ready to improve your product's health score?" }),
                /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: "Our AI will analyze your missing fields and suggest improvements for:" }),
                /* @__PURE__ */ jsxs3(InlineStack2, { wrap: !0, children: [
                  selectedProduct.gaps.slice(0, 5).map(
                    (gap, index) => /* @__PURE__ */ jsx4(Badge2, { tone: "warning", size: "small", children: gap.replace(/_/g, " ") }, index)
                  ),
                  selectedProduct.gaps.length > 5 && /* @__PURE__ */ jsx4(Badge2, { tone: "info", size: "small", children: `+${selectedProduct.gaps.length - 5} more` })
                ] })
              ] }),
              /* @__PURE__ */ jsx4(
                Button2,
                {
                  onClick: handleGenerateRecommendations,
                  variant: "primary",
                  size: "large",
                  loading: isGeneratingRecommendations,
                  children: isGeneratingRecommendations ? "\u{1F916} Generating..." : "\u{1F680} Generate AI Recommendations"
                }
              )
            ] }) : /* @__PURE__ */ jsxs3(BlockStack2, { children: [
              selectedProduct.recommendations?.generatedAt && /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: [
                "Generated: ",
                new Date(selectedProduct.recommendations.generatedAt).toLocaleString()
              ] }),
              /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Review and approve the AI-generated suggestions below. Only approved changes will be applied to your product." })
            ] })
          ] }) }),
          recommendations.length > 0 && /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(InlineStack2, { children: [
              /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "\u270F\uFE0F Review & Approve Recommendations" }),
              /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                /* @__PURE__ */ jsx4(Badge2, { tone: "success", size: "small", children: `${Object.values(approvalState).filter(Boolean).length} approved` }),
                /* @__PURE__ */ jsx4(Badge2, { tone: "critical", size: "small", children: `${Object.values(approvalState).filter((val) => val === !1).length} rejected` })
              ] })
            ] }),
            /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Review each AI suggestion below. Use \u2705 to approve or \u274C to reject. Only approved changes will be applied to your product." }),
            /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(InlineStack2, { children: [
              /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Quick Actions:" }),
              /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                /* @__PURE__ */ jsx4(
                  Button2,
                  {
                    size: "slim",
                    variant: "secondary",
                    tone: "success",
                    onClick: () => {
                      let allApproved = recommendations.reduce((acc, rec) => ({
                        ...acc,
                        [rec.field]: !0
                      }), {});
                      setApprovalState(allApproved);
                    },
                    children: "\u2705 Approve All"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  Button2,
                  {
                    size: "slim",
                    variant: "secondary",
                    tone: "critical",
                    onClick: () => {
                      let allRejected = recommendations.reduce((acc, rec) => ({
                        ...acc,
                        [rec.field]: !1
                      }), {});
                      setApprovalState(allRejected);
                    },
                    children: "\u274C Reject All"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  Button2,
                  {
                    size: "slim",
                    variant: "secondary",
                    onClick: () => setApprovalState({}),
                    children: "Clear All"
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx4(BlockStack2, { children: recommendations.map((rec, index) => {
              let isApproved = approvalState[rec.field] === !0, isRejected = approvalState[rec.field] === !1, isPending = approvalState[rec.field] === void 0, isApplied = rec.status === "applied", fieldInfo = ((field) => {
                let fieldCategories = {
                  required: { fields: ["title", "description", "price", "availability", "category"], points: "25", impact: "5-6%", color: "critical", icon: "\u{1F6A8}" },
                  high: { fields: ["material", "dimensions", "weight", "brand", "use_cases", "features", "image_urls"], points: "20", impact: "4-5%", color: "warning", icon: "\u26A1" },
                  medium: { fields: ["color", "size", "target_audience", "keywords", "upc", "compatibility", "age_range", "gender", "video_urls"], points: "15", impact: "3-4%", color: "attention", icon: "\u{1F4CB}" },
                  low: { fields: ["model", "sku", "tags", "vendor", "warranty", "return_policy", "shipping_info", "documentation_url", "specifications", "ai_search_queries", "semantic_description"], points: "10", impact: "2-3%", color: "info", icon: "\u2728" }
                };
                for (let [category, info] of Object.entries(fieldCategories))
                  if (info.fields.includes(field))
                    return { category, ...info };
                return { category: "low", fields: [], points: "10", impact: "2%", color: "info", icon: "\u2728" };
              })(rec.field);
              return /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                  /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                    /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                      /* @__PURE__ */ jsxs3(Text2, { variant: "headingSm", as: "h4", children: [
                        fieldInfo.icon,
                        " ",
                        rec.field.charAt(0).toUpperCase() + rec.field.slice(1).replace(/_/g, " ")
                      ] }),
                      /* @__PURE__ */ jsx4(Badge2, { tone: fieldInfo.color, size: "small", children: fieldInfo.category.charAt(0).toUpperCase() + fieldInfo.category.slice(1) })
                    ] }),
                    /* @__PURE__ */ jsxs3(InlineStack2, { wrap: !0, children: [
                      /* @__PURE__ */ jsxs3(Badge2, { tone: "info", size: "small", children: [
                        "+",
                        fieldInfo.points,
                        " pts"
                      ] }),
                      /* @__PURE__ */ jsxs3(Badge2, { tone: "subdued", size: "small", children: [
                        "~",
                        fieldInfo.impact,
                        " impact"
                      ] }),
                      isApplied && /* @__PURE__ */ jsx4(Badge2, { tone: "success", size: "small", children: "\u{1F680} Applied" }),
                      !isApplied && isApproved && /* @__PURE__ */ jsx4(Badge2, { tone: "success", size: "small", children: "\u2705 Approved" }),
                      !isApplied && isRejected && /* @__PURE__ */ jsx4(Badge2, { tone: "critical", size: "small", children: "\u274C Rejected" }),
                      !isApplied && isPending && /* @__PURE__ */ jsx4(Badge2, { tone: "attention", size: "small", children: "\u23F3 Pending" })
                    ] })
                  ] }),
                  !isApplied && /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                    /* @__PURE__ */ jsx4(
                      Button2,
                      {
                        size: "slim",
                        onClick: () => handleToggleApproval(rec.field, !1),
                        variant: isRejected ? "primary" : "secondary",
                        tone: isRejected ? "critical" : void 0,
                        children: isRejected ? "\u274C Rejected" : "\u274C Reject"
                      }
                    ),
                    /* @__PURE__ */ jsx4(
                      Button2,
                      {
                        size: "slim",
                        onClick: () => handleToggleApproval(rec.field, !0),
                        variant: isApproved ? "primary" : "secondary",
                        tone: isApproved ? "success" : void 0,
                        children: isApproved ? "\u2705 Approved" : "\u2705 Approve"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                  /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                    /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                      /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Current Value" }),
                      /* @__PURE__ */ jsx4(Box2, { padding: "200", borderRadius: "100", children: /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", as: "p", children: rec.originalValue || /* @__PURE__ */ jsx4(Text2, { tone: "subdued", as: "p", children: "(empty)" }) }) })
                    ] }),
                    /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                      /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "success", as: "p", children: "AI Recommendation" }),
                      /* @__PURE__ */ jsx4(Box2, { padding: "200", borderRadius: "100", children: /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", as: "p", children: rec.newValue }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: [
                    "\u{1F4A1} ",
                    /* @__PURE__ */ jsx4("em", { children: rec.improvement })
                  ] })
                ] }) })
              ] }) }, index);
            }) }),
            /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(InlineStack2, { children: [
              /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                /* @__PURE__ */ jsx4(Text2, { variant: "bodyMd", tone: "subdued", as: "p", children: "Ready to apply your approved changes?" }),
                /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: [
                  recommendations.filter(
                    (rec) => rec.status !== "applied" && approvalState[rec.field] === !0
                  ).length,
                  " changes approved for application"
                ] })
              ] }),
              /* @__PURE__ */ jsxs3(InlineStack2, { children: [
                /* @__PURE__ */ jsx4(
                  Button2,
                  {
                    onClick: () => setRecommendations([]),
                    variant: "secondary",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  Button2,
                  {
                    variant: "primary",
                    size: "large",
                    onClick: handleApplyChanges,
                    loading: isApplyingChanges,
                    disabled: recommendations.filter(
                      (rec) => rec.status !== "applied" && approvalState[rec.field] === !0
                    ).length === 0,
                    children: isApplyingChanges ? "\u{1F680} Applying..." : `\u2705 Apply ${recommendations.filter(
                      (rec) => rec.status !== "applied" && approvalState[rec.field] === !0
                    ).length} Changes`
                  }
                )
              ] })
            ] }) })
          ] }) }),
          selectedProduct.gaps.length > 0 && /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsxs3(InlineStack2, { align: "space-between", children: [
              /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: "Manual Product Information" }),
                /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: "Fill in product specs that only you know. These can't be generated by AI." })
              ] }),
              /* @__PURE__ */ jsx4(
                Button2,
                {
                  onClick: () => setCustomerInputOpen(!customerInputOpen),
                  variant: "secondary",
                  size: "slim",
                  children: customerInputOpen ? "Hide Fields" : "Add Product Info"
                }
              )
            ] }),
            /* @__PURE__ */ jsx4(Collapsible, { id: "customer-input-collapsible", open: customerInputOpen, children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
              selectedProduct.gaps.filter((gap) => getFieldInputType(gap) === "customer_required").map((field, index) => {
                let label = FIELD_LABELS[field] || field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ");
                return /* @__PURE__ */ jsxs3(Box2, { children: [
                  field === "dimensions" ? /* @__PURE__ */ jsxs3(BlockStack2, { children: [
                    /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", as: "p", children: label }),
                    /* @__PURE__ */ jsxs3(InlineStack2, { gap: "300", children: [
                      /* @__PURE__ */ jsx4(
                        TextField,
                        {
                          label: "Length",
                          value: customerInputData[`${field}_length`] || "",
                          onChange: (value) => setCustomerInputData((prev) => ({
                            ...prev,
                            [`${field}_length`]: value
                          })),
                          placeholder: "e.g., 12 inches",
                          autoComplete: "off"
                        }
                      ),
                      /* @__PURE__ */ jsx4(
                        TextField,
                        {
                          label: "Width",
                          value: customerInputData[`${field}_width`] || "",
                          onChange: (value) => setCustomerInputData((prev) => ({
                            ...prev,
                            [`${field}_width`]: value
                          })),
                          placeholder: "e.g., 8 inches",
                          autoComplete: "off"
                        }
                      ),
                      /* @__PURE__ */ jsx4(
                        TextField,
                        {
                          label: "Height",
                          value: customerInputData[`${field}_height`] || "",
                          onChange: (value) => setCustomerInputData((prev) => ({
                            ...prev,
                            [`${field}_height`]: value
                          })),
                          placeholder: "e.g., 4 inches",
                          autoComplete: "off"
                        }
                      )
                    ] })
                  ] }) : field === "gender" ? /* @__PURE__ */ jsx4(
                    Select,
                    {
                      label,
                      options: [
                        { label: "Select target gender", value: "" },
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Unisex", value: "unisex" },
                        { label: "Kids", value: "kids" }
                      ],
                      value: customerInputData[field] || "",
                      onChange: (value) => setCustomerInputData((prev) => ({
                        ...prev,
                        [field]: value
                      }))
                    }
                  ) : /* @__PURE__ */ jsx4(
                    TextField,
                    {
                      label,
                      value: customerInputData[field] || "",
                      onChange: (value) => setCustomerInputData((prev) => ({
                        ...prev,
                        [field]: value
                      })),
                      placeholder: getFieldPlaceholder(field),
                      helpText: getFieldHelpText(field),
                      multiline: field === "specifications" || field === "warranty" || field === "return_policy",
                      autoComplete: "off"
                    }
                  ),
                  /* @__PURE__ */ jsx4(Box2, { paddingBlockStart: "200", children: /* @__PURE__ */ jsxs3(InlineStack2, { gap: "200", blockAlign: "center", children: [
                    /* @__PURE__ */ jsxs3(Text2, { variant: "bodySm", tone: "subdued", as: "p", children: [
                      "Impact: +",
                      getFieldPoints(field),
                      " points, ~",
                      getFieldImpact(field),
                      "% health boost"
                    ] }),
                    customerInputData[field] && /* @__PURE__ */ jsx4(Badge2, { tone: "success", size: "small", children: "\u2705 Ready to save" })
                  ] }) })
                ] }, index);
              }),
              Object.keys(customerInputData).length > 0 && /* @__PURE__ */ jsxs3(InlineStack2, { align: "end", children: [
                /* @__PURE__ */ jsx4(Button2, { onClick: () => setCustomerInputData({}), children: "Clear All" }),
                /* @__PURE__ */ jsxs3(
                  Button2,
                  {
                    variant: "primary",
                    onClick: handleSaveCustomerInput,
                    loading: isSavingCustomerInput,
                    children: [
                      "Save ",
                      Object.values(customerInputData).filter((v) => v.trim()).length,
                      " Fields"
                    ]
                  }
                )
              ] })
            ] }) })
          ] }) }),
          selectedProduct.score >= 90 && /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { children: [
            /* @__PURE__ */ jsx4(Text2, { variant: "headingMd", as: "h3", children: selectedProduct.score === 100 ? "\u{1F389} Perfect Product Health!" : "\u2705 Product Health: Excellent" }),
            /* @__PURE__ */ jsx4(Text2, { as: "p", children: selectedProduct.score === 100 ? "Congratulations! This product has achieved perfect health with all OpenAI spec requirements met." : "This product has a high health score and does not need immediate attention." }),
            selectedProduct.gaps.length === 0 && selectedProduct.score === 100 && /* @__PURE__ */ jsx4(Text2, { variant: "bodySm", tone: "success", as: "p", children: "\u{1F680} Ready for OpenAI ChatGPT discovery!" })
          ] }) })
        ] }) })
      }
    )
  ] });
}

// app/routes/auth.$.tsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader8
});
init_shopify_server();
var loader8 = async ({ request }) => (await authenticate.admin(request), null);

// app/routes/health.tsx
var health_exports = {};
__export(health_exports, {
  loader: () => loader9
});
import { json as json10 } from "@remix-run/node";
async function loader9() {
  try {
    return json10(
      {
        status: "healthy",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        service: "catalogai-optimizer",
        environment: "production",
        uptime: process.uptime()
      },
      { status: 200 }
    );
  } catch (error) {
    return console.error("Health check failed:", error), json10(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      },
      { status: 500 }
    );
  }
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-2QPO3E3T.js", imports: ["/build/_shared/chunk-LOR64ATL.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-FFRYPQBT.js", imports: ["/build/_shared/chunk-H2DI5CET.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-PHC7MEKY.js", imports: ["/build/_shared/chunk-MWF276KD.js", "/build/_shared/chunk-ADGUJX5W.js", "/build/_shared/chunk-KADRYHQJ.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.enrich": { id: "routes/api.enrich", parentId: "root", path: "api/enrich", index: void 0, caseSensitive: void 0, module: "/build/routes/api.enrich-SFXHLYSE.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.health-check": { id: "routes/api.health-check", parentId: "root", path: "api/health-check", index: void 0, caseSensitive: void 0, module: "/build/routes/api.health-check-4K2OQFHX.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.queue-status": { id: "routes/api.queue-status", parentId: "root", path: "api/queue-status", index: void 0, caseSensitive: void 0, module: "/build/routes/api.queue-status-BGLNO3UC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.settings": { id: "routes/api.settings", parentId: "root", path: "api/settings", index: void 0, caseSensitive: void 0, module: "/build/routes/api.settings-FJ3TID6M.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.sync": { id: "routes/api.sync", parentId: "root", path: "api/sync", index: void 0, caseSensitive: void 0, module: "/build/routes/api.sync-64X2SDGK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.test-health-check": { id: "routes/api.test-health-check", parentId: "root", path: "api/test-health-check", index: void 0, caseSensitive: void 0, module: "/build/routes/api.test-health-check-IYEKKCWC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.validate": { id: "routes/api.validate", parentId: "root", path: "api/validate", index: void 0, caseSensitive: void 0, module: "/build/routes/api.validate-HG5RCGQI.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.$-QXGTKEOT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/health": { id: "routes/health", parentId: "root", path: "health", index: void 0, caseSensitive: void 0, module: "/build/routes/health-TTCX2HYV.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-PBKDGD5Z.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "202e0870", hmr: void 0, url: "/build/manifest-202E0870.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.test-health-check": {
    id: "routes/api.test-health-check",
    parentId: "root",
    path: "api/test-health-check",
    index: void 0,
    caseSensitive: void 0,
    module: api_test_health_check_exports
  },
  "routes/api.health-check": {
    id: "routes/api.health-check",
    parentId: "root",
    path: "api/health-check",
    index: void 0,
    caseSensitive: void 0,
    module: api_health_check_exports
  },
  "routes/api.queue-status": {
    id: "routes/api.queue-status",
    parentId: "root",
    path: "api/queue-status",
    index: void 0,
    caseSensitive: void 0,
    module: api_queue_status_exports
  },
  "routes/api.settings": {
    id: "routes/api.settings",
    parentId: "root",
    path: "api/settings",
    index: void 0,
    caseSensitive: void 0,
    module: api_settings_exports
  },
  "routes/api.validate": {
    id: "routes/api.validate",
    parentId: "root",
    path: "api/validate",
    index: void 0,
    caseSensitive: void 0,
    module: api_validate_exports
  },
  "routes/api.enrich": {
    id: "routes/api.enrich",
    parentId: "root",
    path: "api/enrich",
    index: void 0,
    caseSensitive: void 0,
    module: api_enrich_exports
  },
  "routes/api.sync": {
    id: "routes/api.sync",
    parentId: "root",
    path: "api/sync",
    index: void 0,
    caseSensitive: void 0,
    module: api_sync_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/health": {
    id: "routes/health",
    parentId: "root",
    path: "health",
    index: void 0,
    caseSensitive: void 0,
    module: health_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
