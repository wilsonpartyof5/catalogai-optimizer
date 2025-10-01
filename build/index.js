var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

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
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
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
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var meta = () => [
  { title: "CatalogAI Optimizer" },
  { name: "description", content: "AI-powered Shopify catalog optimization" }
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
      /* @__PURE__ */ jsx2(AppProvider, { i18n: enTranslations, children: /* @__PURE__ */ jsx2(Outlet, {}) }),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}

// app/routes/api.validate.ts
var api_validate_exports = {};
__export(api_validate_exports, {
  action: () => action
});
import { json } from "@remix-run/node";

// app/shopify.server.ts
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";

// app/utils/db.ts
import { PrismaClient } from "@prisma/client";
var db;
db = new PrismaClient();

// app/shopify.server.ts
var shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  appUrl: process.env.SHOPIFY_APP_URL,
  apiVersion: "2025-10",
  scopes: process.env.SCOPES?.split(",") || ["read_products", "read_inventory", "write_metafields", "read_orders"],
  sessionStorage: new PrismaSessionStorage(db),
  distribution: "app",
  hooks: {
    afterAuth: async ({ session }) => {
      await db.user.upsert({
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
    }
  }
});
var addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;

// app/utils/shopifySync.ts
import { GraphQLClient } from "graphql-request";
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
`, ShopifySyncService = class {
  client;
  constructor(shopDomain, accessToken) {
    this.client = new GraphQLClient(
      `https://${shopDomain}/admin/api/2023-10/graphql.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json"
        }
      }
    );
  }
  async syncProducts(userId) {
    let allProducts = [], hasNextPage = !0, after;
    try {
      for (; hasNextPage; ) {
        let response = await this.client.request(PRODUCTS_QUERY, {
          first: 250,
          after
        }), products = response.products.edges.map((edge) => ({
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
        allProducts.push(...products), hasNextPage = response.products.pageInfo.hasNextPage, after = response.products.pageInfo.endCursor, hasNextPage && await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return await db.log.create({
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
      throw await db.log.create({
        data: {
          userId,
          type: "error",
          message: `Failed to sync products: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.stack : String(error),
          metadata: {
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), error;
    }
  }
  async getInventoryLevels(shopDomain, accessToken) {
    try {
      let response = await fetch(
        `https://${shopDomain}/admin/api/2023-10/inventory_levels.json`,
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
        `https://${shopDomain}/admin/api/2023-10/orders.json?limit=${limit}&status=any`,
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

// app/utils/openaiSpec.ts
var OPENAI_PRODUCT_SCHEMA = {
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
  // Required fields (must be 100% complete)
  required: {
    title: 1,
    description: 1,
    price: 1,
    availability: 1,
    category: 1
  },
  // High importance optional fields
  high: {
    material: 0.8,
    dimensions: 0.7,
    weight: 0.6,
    brand: 0.7,
    use_cases: 0.8,
    features: 0.7
  },
  // Medium importance fields
  medium: {
    color: 0.5,
    size: 0.5,
    target_audience: 0.6,
    keywords: 0.6,
    image_urls: 0.5
  },
  // Low importance fields
  low: {
    model: 0.3,
    sku: 0.4,
    tags: 0.4,
    vendor: 0.3,
    warranty: 0.3
  }
};

// app/utils/fieldMapper.ts
function mapShopifyToSpec(product) {
  let spec = {
    // Core required fields - map directly from Shopify
    title: product.title || "",
    description: product.description || "",
    price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
    availability: getAvailabilityStatus(product.variants),
    category: product.productType || "Uncategorized",
    // Optional fields - extract from metafields and infer from existing data
    material: getMetafieldValue(product.metafields, "material") || inferMaterial(product.title, product.description),
    weight: getMetafieldValue(product.metafields, "weight"),
    color: getMetafieldValue(product.metafields, "color") || inferColor(product.title, product.description),
    size: getMetafieldValue(product.metafields, "size"),
    brand: product.vendor || getMetafieldValue(product.metafields, "brand"),
    model: getMetafieldValue(product.metafields, "model"),
    sku: product.variants[0]?.sku,
    use_cases: getMetafieldArray(product.metafields, "use_cases") || inferUseCases(product.title, product.description),
    target_audience: getMetafieldValue(product.metafields, "target_audience"),
    age_range: getMetafieldValue(product.metafields, "age_range"),
    gender: getMetafieldValue(product.metafields, "gender"),
    features: getMetafieldArray(product.metafields, "features") || inferFeatures(product.description),
    keywords: product.tags || [],
    tags: product.tags || [],
    image_urls: product.images.map((img) => img.url),
    vendor: product.vendor,
    warranty: getMetafieldValue(product.metafields, "warranty"),
    shipping_info: getMetafieldValue(product.metafields, "shipping_info")
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
  return metafields.find(
    (m) => m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
  )?.value;
}
function getMetafieldArray(metafields, key) {
  let value = getMetafieldValue(metafields, key);
  if (value)
    try {
      let parsed = JSON.parse(value);
      if (Array.isArray(parsed))
        return parsed.filter((item) => typeof item == "string");
    } catch {
      return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
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
  let gaps = [], recommendations = [], totalWeight = 0, weightedScore = 0;
  for (let [field, weight] of Object.entries(FIELD_WEIGHTS.required)) {
    totalWeight += weight;
    let value = spec[field];
    !value || typeof value == "string" && value.trim() === "" ? (gaps.push(field), weightedScore += 0) : weightedScore += weight;
  }
  for (let [field, weight] of Object.entries(FIELD_WEIGHTS.high)) {
    totalWeight += weight;
    let value = spec[field];
    !value || typeof value == "string" && value.trim() === "" || Array.isArray(value) && value.length === 0 ? (gaps.push(field), weightedScore += 0, recommendations.push(`Add ${field} to improve product discoverability`)) : weightedScore += weight;
  }
  for (let [field, weight] of Object.entries(FIELD_WEIGHTS.medium)) {
    totalWeight += weight;
    let value = spec[field];
    !value || typeof value == "string" && value.trim() === "" || Array.isArray(value) && value.length === 0 ? (gaps.push(field), weightedScore += 0) : weightedScore += weight;
  }
  for (let [field, weight] of Object.entries(FIELD_WEIGHTS.low)) {
    totalWeight += weight;
    let value = spec[field];
    !value || typeof value == "string" && value.trim() === "" || Array.isArray(value) && value.length === 0 ? (gaps.push(field), weightedScore += 0) : weightedScore += weight;
  }
  let score = totalWeight > 0 ? Math.round(weightedScore / totalWeight * 100) : 0, completeness = Math.round(Object.keys(spec).filter((key) => {
    let value = spec[key];
    return value != null && (typeof value != "string" || value.trim() !== "") && (!Array.isArray(value) || value.length > 0);
  }).length / Object.keys(FIELD_WEIGHTS).length * 100);
  return {
    score,
    completeness,
    gaps,
    recommendations
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

// app/utils/validator.ts
import Ajv from "ajv";
import addFormats from "ajv-formats";
import axios from "axios";
var ajv = new Ajv({ allErrors: !0 });
addFormats(ajv);
var validate = ajv.compile(OPENAI_PRODUCT_SCHEMA);
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
        let response = await axios.head(url, { timeout: 5e3 });
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
      let response = await axios.head(url, { timeout: 5e3 });
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
var action = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json({ error: "User not found" }, { status: 404 });
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
      }), json({
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
    return json({ error: "Invalid action" }, { status: 400 });
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
    }), json(
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
  action: () => action2
});
import { json as json2 } from "@remix-run/node";

// app/utils/aiClient.ts
import OpenAI from "openai";
var openai = new OpenAI({
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
};

// app/utils/aiEnrich.ts
var AIEnrichmentService = class {
  aiClient;
  constructor() {
    this.aiClient = new AIClient();
  }
  async enrichProduct(userId, product, options = {}) {
    let {
      enrichDescription = !0,
      inferMaterial: inferMaterial2 = !0,
      generateUseCases = !0,
      generateFeatures = !0,
      generateKeywords = !0
    } = options, improvements = [], errors = [], totalUsage = 0, baseSpec = {
      title: product.title || "",
      description: product.description || "",
      price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
      availability: this.getAvailabilityStatus(product.variants),
      category: product.productType || "Uncategorized",
      sku: product.variants[0]?.sku,
      image_urls: product.images.map((img) => img.url),
      vendor: product.vendor
    };
    if (enrichDescription && (!baseSpec.description || baseSpec.description.length < 200))
      try {
        let result = await this.aiClient.enrichDescription(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category,
          baseSpec.material
        );
        result.enriched !== baseSpec.description && (improvements.push({
          field: "description",
          originalValue: baseSpec.description,
          newValue: result.enriched,
          improvement: `Expanded from ${baseSpec.description.length} to ${result.enriched.length} characters`
        }), baseSpec.description = result.enriched), totalUsage += result.usage.totalTokens;
      } catch (error) {
        errors.push(`Failed to enrich description: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    if (inferMaterial2 && !this.getMetafieldValue(product.metafields, "material"))
      try {
        let result = await this.aiClient.inferMaterial(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        );
        result.material !== "Unknown" && (improvements.push({
          field: "material",
          originalValue: void 0,
          newValue: result.material,
          improvement: `Inferred material: ${result.material}`
        }), baseSpec.material = result.material), totalUsage += result.usage.totalTokens;
      } catch (error) {
        errors.push(`Failed to infer material: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    if (generateUseCases && !this.getMetafieldArray(product.metafields, "use_cases"))
      try {
        let result = await this.aiClient.generateUseCases(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        );
        result.useCases.length > 0 && (improvements.push({
          field: "use_cases",
          originalValue: void 0,
          newValue: result.useCases,
          improvement: `Generated ${result.useCases.length} use cases`
        }), baseSpec.use_cases = result.useCases), totalUsage += result.usage.totalTokens;
      } catch (error) {
        errors.push(`Failed to generate use cases: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    if (generateFeatures)
      try {
        let result = await this.aiClient.generateFeatures(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        );
        result.features.length > 0 && (improvements.push({
          field: "features",
          originalValue: baseSpec.features || [],
          newValue: result.features,
          improvement: `Generated ${result.features.length} key features`
        }), baseSpec.features = result.features), totalUsage += result.usage.totalTokens;
      } catch (error) {
        errors.push(`Failed to generate features: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    if (generateKeywords)
      try {
        let result = await this.aiClient.generateKeywords(
          userId,
          baseSpec.title,
          baseSpec.description,
          baseSpec.category
        );
        result.keywords.length > 0 && (improvements.push({
          field: "keywords",
          originalValue: baseSpec.keywords || [],
          newValue: result.keywords,
          improvement: `Generated ${result.keywords.length} SEO keywords`
        }), baseSpec.keywords = result.keywords), totalUsage += result.usage.totalTokens;
      } catch (error) {
        errors.push(`Failed to generate keywords: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    return {
      originalProduct: product,
      enrichedSpec: baseSpec,
      improvements,
      totalUsage,
      errors
    };
  }
  async enrichProducts(userId, products, options = {}, maxProducts = 5) {
    let limitedProducts = products.slice(0, maxProducts), results = [];
    for (let product of limitedProducts)
      try {
        let result = await this.enrichProduct(userId, product, options);
        results.push(result);
      } catch (error) {
        console.error(`Failed to enrich product ${product.id}:`, error), results.push({
          originalProduct: product,
          enrichedSpec: {
            title: product.title || "",
            description: product.description || "",
            price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
            availability: this.getAvailabilityStatus(product.variants),
            category: product.productType || "Uncategorized"
          },
          improvements: [],
          totalUsage: 0,
          errors: [`Failed to enrich product: ${error instanceof Error ? error.message : "Unknown error"}`]
        });
      }
    return results;
  }
  async applyEnrichmentToShopify(userId, shopDomain, accessToken, enrichmentResult) {
    try {
      let metafieldsToUpdate = [];
      enrichmentResult.enrichedSpec.material && metafieldsToUpdate.push({
        namespace: "catalogai",
        key: "material",
        value: enrichmentResult.enrichedSpec.material,
        type: "single_line_text_field"
      }), enrichmentResult.enrichedSpec.use_cases && metafieldsToUpdate.push({
        namespace: "catalogai",
        key: "use_cases",
        value: JSON.stringify(enrichmentResult.enrichedSpec.use_cases),
        type: "json"
      }), enrichmentResult.enrichedSpec.features && metafieldsToUpdate.push({
        namespace: "catalogai",
        key: "features",
        value: JSON.stringify(enrichmentResult.enrichedSpec.features),
        type: "json"
      }), enrichmentResult.enrichedSpec.keywords && metafieldsToUpdate.push({
        namespace: "catalogai",
        key: "keywords",
        value: JSON.stringify(enrichmentResult.enrichedSpec.keywords),
        type: "json"
      }), enrichmentResult.improvements.find((imp) => imp.field === "description") && await this.updateProductDescription(
        shopDomain,
        accessToken,
        enrichmentResult.originalProduct.id,
        enrichmentResult.enrichedSpec.description
      );
      for (let metafield of metafieldsToUpdate)
        await this.createProductMetafield(
          shopDomain,
          accessToken,
          enrichmentResult.originalProduct.id,
          metafield
        );
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
            description
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
        description
      }
    }, response = await fetch(`https://${shopDomain}/admin/api/2023-10/graphql.json`, {
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
    }, response = await fetch(`https://${shopDomain}/admin/api/2023-10/graphql.json`, {
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

// app/routes/api.enrich.ts
var action2 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json2({ error: "User not found" }, { status: 404 });
  try {
    let formData = await request.formData();
    if (formData.get("action") === "enrich") {
      let productIds = formData.getAll("productIds"), maxProducts = parseInt(formData.get("maxProducts")) || 5, tierLimits = {
        starter: 5,
        pro: 25,
        enterprise: 100
      }, limit = tierLimits[user.tier] || tierLimits.starter;
      if (maxProducts > limit)
        return json2({
          success: !1,
          error: `Your ${user.tier} tier allows up to ${limit} products per enrichment. Please upgrade to process more products.`
        }, { status: 400 });
      let allProducts = await new ShopifySyncService(session.shop, user.accessToken).syncProducts(user.id), productsToEnrich = productIds.length > 0 ? allProducts.filter((p) => productIds.includes(p.id)) : allProducts.slice(0, maxProducts);
      if (productsToEnrich.length === 0)
        return json2({
          success: !1,
          error: "No products found to enrich"
        }, { status: 400 });
      let enrichmentService = new AIEnrichmentService(), enrichmentResults = await enrichmentService.enrichProducts(
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
      ), applyToShopify = formData.get("applyToShopify") === "true", appliedResults = [];
      if (applyToShopify)
        for (let result of enrichmentResults)
          try {
            let success = await enrichmentService.applyEnrichmentToShopify(
              user.id,
              session.shop,
              user.accessToken,
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
      return await db.log.create({
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
      }), json2({
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
      });
    }
    return json2({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return console.error("Enrichment error:", error), await db.log.create({
      data: {
        userId: user.id,
        type: "error",
        message: `Enrichment error: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: error instanceof Error ? error.stack : String(error),
        metadata: {
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), json2(
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
  action: () => action3,
  loader: () => loader
});
import { json as json3 } from "@remix-run/node";
var loader = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json3({ error: "User not found" }, { status: 404 });
  let recentLogs = await db.log.findMany({
    where: {
      userId: user.id,
      type: "sync"
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 5
  });
  return json3({
    lastSync: recentLogs[0]?.createdAt || null,
    recentLogs: recentLogs.map((log) => ({
      id: log.id,
      message: log.message,
      createdAt: log.createdAt,
      metadata: log.metadata
    }))
  });
}, action3 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json3({ error: "User not found" }, { status: 404 });
  try {
    let syncService = new ShopifySyncService(session.shop, user.accessToken), products = await syncService.syncProducts(user.id), inventoryLevels = await syncService.getInventoryLevels(session.shop, user.accessToken), recentOrders = await syncService.getRecentOrders(session.shop, user.accessToken, 50), audit = await db.audit.create({
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
    return json3({
      success: !0,
      message: `Successfully synced ${products.length} products`,
      data: {
        productsCount: products.length,
        inventoryLevelsCount: inventoryLevels.length,
        recentOrdersCount: recentOrders.length,
        auditId: audit.id
      }
    });
  } catch (error) {
    return console.error("Sync error:", error), json3(
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
  action: () => action4
});
import { json as json4 } from "@remix-run/node";
var action4 = async ({ request }) => {
  let { topic, shop, session } = await authenticate.webhook(request);
  if (!session)
    return json4({ error: "No session found" }, { status: 401 });
  try {
    let user = await db.user.findUnique({
      where: { shopId: shop }
    });
    if (!user)
      return json4({ error: "User not found" }, { status: 404 });
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
    return json4({ success: !0 });
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
    return json4(
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
  action: () => action5,
  default: () => Index,
  loader: () => loader2
});
import { json as json5 } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  Page,
  Card,
  Text,
  Button,
  DataTable,
  Layout,
  Banner,
  Toast
} from "@shopify/polaris";
import { useState } from "react";
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var loader2 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  }), latestAudit = await db.audit.findFirst({
    where: { userId: user?.id },
    orderBy: { timestamp: "desc" }
  }), recentLogs = await db.log.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
    take: 3
  }), mockProducts = [
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
  return json5({
    shop: session.shop,
    user,
    products: mockProducts,
    totalProducts: latestAudit?.totalProducts || 0,
    averageScore: latestAudit?.score || 0,
    lastSync: recentLogs.find((log) => log.type === "sync")?.createdAt || null,
    recentLogs: recentLogs.map((log) => ({
      id: log.id,
      type: log.type,
      message: log.message,
      createdAt: log.createdAt
    }))
  });
}, action5 = async ({ request }) => {
  let { session } = await authenticate.admin(request);
  return (await request.formData()).get("action") === "sync" ? json5({ redirect: "/api/sync" }) : json5({ success: !0 });
};
function Index() {
  let { shop, products, totalProducts, averageScore, lastSync, recentLogs, user } = useLoaderData(), [isSyncing, setIsSyncing] = useState(!1), [isEnriching, setIsEnriching] = useState(!1), [toastActive, setToastActive] = useState(!1), [toastMessage, setToastMessage] = useState(""), syncFetcher = useFetcher(), enrichFetcher = useFetcher(), handleSync = () => {
    setIsSyncing(!0), syncFetcher.submit(
      { action: "sync" },
      { method: "post", action: "/api/sync" }
    );
  }, handleAIEnrich = () => {
    setIsEnriching(!0), enrichFetcher.submit(
      {
        action: "enrich",
        maxProducts: "3",
        // Demo limit
        applyToShopify: "false"
        // Preview mode first
      },
      { method: "post", action: "/api/enrich" }
    );
  };
  if (syncFetcher.data && !isSyncing) {
    let data = syncFetcher.data;
    data.success ? (setToastMessage(`Successfully synced ${data.data?.productsCount || 0} products`), setToastActive(!0)) : (setToastMessage(`Sync failed: ${data.error}`), setToastActive(!0)), setIsSyncing(!1);
  }
  if (enrichFetcher.data && !isEnriching) {
    let data = enrichFetcher.data;
    data.success ? (setToastMessage(`AI enrichment completed for ${data.data?.productsProcessed || 0} products (${data.data?.totalUsage || 0} tokens used)`), setToastActive(!0)) : (setToastMessage(`Enrichment failed: ${data.error}`), setToastActive(!0)), setIsEnriching(!1);
  }
  let rows = products.map((product) => [
    product.id,
    product.title,
    product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description,
    `${product.score}%`,
    product.gaps.length > 0 ? product.gaps.join(", ") : "None"
  ]);
  return /* @__PURE__ */ jsxs2(Page, { title: "CatalogAI Optimizer Dashboard", children: [
    /* @__PURE__ */ jsxs2(Layout, { children: [
      /* @__PURE__ */ jsx3(Layout.Section, { children: /* @__PURE__ */ jsx3(Banner, { title: `Welcome, ${shop}!`, tone: "info", children: /* @__PURE__ */ jsxs2("p", { children: [
        "Your catalog health score: ",
        /* @__PURE__ */ jsxs2("strong", { children: [
          averageScore,
          "%"
        ] }),
        /* @__PURE__ */ jsx3("br", {}),
        "Total products: ",
        /* @__PURE__ */ jsx3("strong", { children: totalProducts }),
        lastSync && /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsx3("br", {}),
          "Last sync: ",
          /* @__PURE__ */ jsx3("strong", { children: new Date(lastSync).toLocaleString() })
        ] }),
        user && /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsx3("br", {}),
          "Tier: ",
          /* @__PURE__ */ jsx3("strong", { children: user.tier }),
          " | AI Usage: ",
          /* @__PURE__ */ jsxs2("strong", { children: [
            user.aiUsage,
            " tokens"
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx3(Layout.Section, { children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2("div", { style: { padding: "16px" }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [
          /* @__PURE__ */ jsx3(Text, { variant: "headingMd", as: "h2", children: "Product Catalog Health" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "primary",
                onClick: handleSync,
                loading: isSyncing,
                disabled: isSyncing,
                children: isSyncing ? "Syncing..." : "Sync Products"
              }
            ),
            /* @__PURE__ */ jsx3(
              Button,
              {
                onClick: handleAIEnrich,
                loading: isEnriching,
                disabled: isEnriching || !user,
                children: isEnriching ? "AI Enriching..." : "AI Fix Products"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx3(
          DataTable,
          {
            columnContentTypes: ["text", "text", "text", "text", "text"],
            headings: ["ID", "Title", "Description", "Score", "Gaps"],
            rows,
            footerContent: `Showing ${products.length} products`
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs2(Layout.Section, { children: [
        /* @__PURE__ */ jsx3(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2("div", { style: { padding: "16px" }, children: [
          /* @__PURE__ */ jsx3(Text, { variant: "headingMd", as: "h3", children: "Quick Actions" }),
          /* @__PURE__ */ jsxs2("div", { style: { marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
            /* @__PURE__ */ jsx3(Button, { fullWidth: !0, children: "Run Health Check" }),
            /* @__PURE__ */ jsx3(Button, { fullWidth: !0, children: "Generate Feed" }),
            /* @__PURE__ */ jsx3(Button, { fullWidth: !0, children: "View Analytics" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx3(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2("div", { style: { padding: "16px" }, children: [
          /* @__PURE__ */ jsx3(Text, { variant: "headingMd", as: "h3", children: "Recent Activity" }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: "16px" }, children: recentLogs.length > 0 ? recentLogs.map((log) => /* @__PURE__ */ jsxs2(Text, { as: "p", children: [
            log.type === "sync" && "\u{1F504} ",
            log.type === "push" && "\u{1F4E4} ",
            log.type === "error" && "\u274C ",
            log.message,
            " - ",
            new Date(log.createdAt).toLocaleString()
          ] }, log.id)) : /* @__PURE__ */ jsx3(Text, { as: "p", children: "No recent activity" }) })
        ] }) }) })
      ] })
    ] }),
    toastActive && /* @__PURE__ */ jsx3(
      Toast,
      {
        content: toastMessage,
        onDismiss: () => setToastActive(!1)
      }
    )
  ] });
}

// app/routes/auth.tsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader3
});
var loader3 = async ({ request }) => (await authenticate.admin(request), null);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-2QPO3E3T.js", imports: ["/build/_shared/chunk-LOR64ATL.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-ATVZQQIY.js", imports: ["/build/_shared/chunk-4JXOOEM4.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-EEESWQOY.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.enrich": { id: "routes/api.enrich", parentId: "root", path: "api/enrich", index: void 0, caseSensitive: void 0, module: "/build/routes/api.enrich-SFXHLYSE.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.sync": { id: "routes/api.sync", parentId: "root", path: "api/sync", index: void 0, caseSensitive: void 0, module: "/build/routes/api.sync-64X2SDGK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.validate": { id: "routes/api.validate", parentId: "root", path: "api/validate", index: void 0, caseSensitive: void 0, module: "/build/routes/api.validate-HG5RCGQI.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth": { id: "routes/auth", parentId: "root", path: "auth", index: void 0, caseSensitive: void 0, module: "/build/routes/auth-XQZBNYGZ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-PBKDGD5Z.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "5881f874", hmr: void 0, url: "/build/manifest-5881F874.js" };

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
  "routes/auth": {
    id: "routes/auth",
    parentId: "root",
    path: "auth",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
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
