import {
  createHotContext
} from "/build/_shared/chunk-JWO2UMNO.js";

// app/utils/openaiSpec.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/openaiSpec.ts"
  );
  import.meta.hot.lastModified = "1760473121056.9587";
}
var FIELD_WEIGHTS = {
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
};
var FIELD_POINTS = {
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
};
var FIELD_INPUT_TYPES = {
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
function getFieldInputType(fieldName) {
  if (FIELD_INPUT_TYPES.customer_input_required.includes(fieldName)) {
    return "customer_required";
  } else if (FIELD_INPUT_TYPES.ai_generatable.includes(fieldName)) {
    return "ai_generatable";
  } else if (FIELD_INPUT_TYPES.core_required.includes(fieldName)) {
    return "core_required";
  }
  return "customer_required";
}
var FIELD_LABELS = {
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

export {
  FIELD_WEIGHTS,
  FIELD_POINTS,
  getFieldInputType,
  FIELD_LABELS
};
//# sourceMappingURL=/build/_shared/chunk-EJGQX3FZ.js.map
