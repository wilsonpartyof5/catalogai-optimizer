import {
  FIELD_POINTS,
  FIELD_WEIGHTS
} from "/build/_shared/chunk-EJGQX3FZ.js";
import {
  createHotContext
} from "/build/_shared/chunk-JWO2UMNO.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-PNG5AS42.js";

// app/utils/fieldMapper.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/fieldMapper.ts"
  );
  import.meta.hot.lastModified = "1760473121057.0361";
}
function mapShopifyToSpec(product) {
  const spec = {
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
  };
  const dimensions = getDimensionsFromMetafields(product.metafields);
  if (dimensions) {
    spec.dimensions = dimensions;
  }
  const specifications = getSpecificationsFromMetafields(product.metafields);
  if (specifications && Object.keys(specifications).length > 0) {
    spec.specifications = specifications;
  }
  return spec;
}
function getAvailabilityStatus(variants) {
  if (variants.length === 0)
    return "out_of_stock";
  const hasAvailable = variants.some((v) => v.availableForSale && (v.inventoryQuantity || 0) > 0);
  const hasInventory = variants.some((v) => (v.inventoryQuantity || 0) > 0);
  if (hasAvailable)
    return "in_stock";
  if (hasInventory && !hasAvailable)
    return "pre_order";
  return "out_of_stock";
}
function getMetafieldValue(metafields, key) {
  let metafield = metafields.find(
    (m) => m.namespace === "catalogai" && (m.key === key || m.key.toLowerCase().includes(key.toLowerCase()))
  );
  if (!metafield) {
    metafield = metafields.find(
      (m) => m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
    );
  }
  return metafield?.value;
}
function getMetafieldArray(metafields, key) {
  const value = getMetafieldValue(metafields, key);
  if (!value)
    return void 0;
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string");
    }
  } catch {
    if (value.includes("\n-") || value.startsWith("-")) {
      return value.split("\n").map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
    }
    return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
  }
  return void 0;
}
function getDimensionsFromMetafields(metafields) {
  const length = getMetafieldValue(metafields, "length");
  const width = getMetafieldValue(metafields, "width");
  const height = getMetafieldValue(metafields, "height");
  if (!length && !width && !height)
    return null;
  return {
    ...length && { length },
    ...width && { width },
    ...height && { height }
  };
}
function getSpecificationsFromMetafields(metafields) {
  const specs = {};
  const specMetafields = metafields.filter(
    (m) => m.namespace === "specifications" || m.namespace === "specs"
  );
  for (const metafield of specMetafields) {
    specs[metafield.key] = metafield.value;
  }
  return Object.keys(specs).length > 0 ? specs : null;
}
function inferMaterial(title, description) {
  const materialKeywords = [
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
  ];
  const text = `${title} ${description}`.toLowerCase();
  for (const material of materialKeywords) {
    if (text.includes(material)) {
      return material.charAt(0).toUpperCase() + material.slice(1);
    }
  }
  return void 0;
}
function inferColor(title, description) {
  const colorKeywords = [
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
  ];
  const text = `${title} ${description}`.toLowerCase();
  for (const color of colorKeywords) {
    if (text.includes(color)) {
      return color.charAt(0).toUpperCase() + color.slice(1);
    }
  }
  return void 0;
}
function inferUseCases(title, description) {
  const useCaseKeywords = [
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
  ];
  const text = `${title} ${description}`.toLowerCase();
  const foundUseCases = [];
  for (const useCase of useCaseKeywords) {
    if (text.includes(useCase)) {
      foundUseCases.push(useCase.charAt(0).toUpperCase() + useCase.slice(1));
    }
  }
  return foundUseCases;
}
function inferFeatures(description) {
  const featureKeywords = [
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
  ];
  const text = description.toLowerCase();
  const foundFeatures = [];
  for (const feature of featureKeywords) {
    if (text.includes(feature)) {
      foundFeatures.push(feature.charAt(0).toUpperCase() + feature.slice(1));
    }
  }
  return foundFeatures;
}
function calculateProductScore(spec) {
  const gaps = [];
  const recommendations = [];
  let totalWeight = 0;
  let weightedScore = 0;
  let totalPoints = 0;
  let maxPossiblePoints = 0;
  const fieldProgress = {};
  const categoryProgress = {
    required: { completed: 0, total: 0, points: 0 },
    high: { completed: 0, total: 0, points: 0 },
    medium: { completed: 0, total: 0, points: 0 },
    low: { completed: 0, total: 0, points: 0 }
  };
  const hasValue = (value) => {
    return value !== void 0 && value !== null && (typeof value !== "string" || value.trim() !== "") && (!Array.isArray(value) || value.length > 0) && (typeof value !== "object" || Object.keys(value).length > 0);
  };
  const categories = [
    { name: "required", fields: FIELD_WEIGHTS.required, points: FIELD_POINTS.required },
    { name: "high", fields: FIELD_WEIGHTS.high, points: FIELD_POINTS.high },
    { name: "medium", fields: FIELD_WEIGHTS.medium, points: FIELD_POINTS.medium },
    { name: "low", fields: FIELD_WEIGHTS.low, points: FIELD_POINTS.low }
  ];
  categories.forEach(({ name, fields, points }) => {
    categoryProgress[name].total = Object.keys(fields).length;
    for (const [field, weight] of Object.entries(fields)) {
      totalWeight += weight;
      maxPossiblePoints += points[field];
      const value = spec[field];
      const completed = hasValue(value);
      fieldProgress[field] = {
        completed,
        category: name,
        points: points[field],
        weight
      };
      if (completed) {
        weightedScore += weight;
        totalPoints += points[field];
        categoryProgress[name].completed++;
        categoryProgress[name].points += points[field];
      } else {
        gaps.push(field);
        if (name === "high") {
          recommendations.push(`Add ${field} to improve product discoverability`);
        }
      }
    }
  });
  const score = totalWeight > 0 ? Math.round(weightedScore / totalWeight * 100) : 0;
  const totalFields = Object.keys(fieldProgress).length;
  const completedFields = Object.values(fieldProgress).filter((f) => f.completed).length;
  const completeness = totalFields > 0 ? Math.round(completedFields / totalFields * 100) : 0;
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
    const spec = mapShopifyToSpec(product);
    const score = calculateProductScore(spec);
    return {
      ...spec,
      originalId: product.id,
      score
    };
  });
}
export {
  calculateProductScore,
  mapProductsToSpec,
  mapShopifyToSpec
};
//# sourceMappingURL=/build/_shared/fieldMapper-CB5YLAG6.js.map
