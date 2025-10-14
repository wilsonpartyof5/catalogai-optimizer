// OpenAI Spec Schema for product data optimization
// Based on OpenAI's recommended product data structure for AI search

export const OPENAI_PRODUCT_SCHEMA = {
  type: "object",
  required: [
    "title",
    "description", 
    "price",
    "availability",
    "category",
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
      maxLength: 4000,
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
}

// Field importance weights for scoring (Enhanced for instant gratification)
export const FIELD_WEIGHTS = {
  // Required fields (must be 100% complete) - Higher impact
  required: {
    title: 2.5,
    description: 2.5,
    price: 2.0,
    availability: 2.0,
    category: 2.0,
  },
  // High importance optional fields (critical for AI search) - Meaningful impact
  high: {
    material: 2.0,
    dimensions: 2.0,
    weight: 1.8,
    brand: 2.0,
    use_cases: 2.2,
    features: 2.0,
    image_urls: 1.8,
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
    video_urls: 1.5,
  },
  // Low importance fields (nice to have) - Still meaningful
  low: {
    model: 1.0,
    sku: 1.2,
    tags: 1.2,
    vendor: 1.0,
    warranty: 1.0,
    return_policy: 1.0,
    shipping_info: 1.0,
    documentation_url: 1.0,
    specifications: 1.2,
    ai_search_queries: 1.0,
    semantic_description: 1.0,
  }
}

// Points system for instant gratification
export const FIELD_POINTS = {
  required: {
    title: 25,
    description: 25,
    price: 20,
    availability: 20,
    category: 20,
  },
  high: {
    material: 20,
    dimensions: 20,
    weight: 18,
    brand: 20,
    use_cases: 22,
    features: 20,
    image_urls: 18,
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
    video_urls: 15,
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
    semantic_description: 10,
  }
}

// Field categories for gap analysis
export const FIELD_CATEGORIES = {
  basic: ["title", "description", "price", "availability", "category"],
  physical: ["material", "dimensions", "weight", "color", "size"],
  functional: ["brand", "model", "sku", "use_cases", "features"],
  seo: ["keywords", "tags", "semantic_description"],
  media: ["image_urls", "video_urls"],
  business: ["vendor", "warranty", "shipping_info"]
}

// Customer input vs AI-generatable field categorization  
export const FIELD_INPUT_TYPES = {
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
}

// Helper function to get field input type
export function getFieldInputType(fieldName: string): 'customer_required' | 'ai_generatable' | 'core_required' {
  if (FIELD_INPUT_TYPES.customer_input_required.includes(fieldName)) {
    return 'customer_required'
  } else if (FIELD_INPUT_TYPES.ai_generatable.includes(fieldName)) {
    return 'ai_generatable'
  } else if (FIELD_INPUT_TYPES.core_required.includes(fieldName)) {
    return 'core_required'
  }
  return 'customer_required' // Default to customer input for safety
}

// User-friendly field labels
export const FIELD_LABELS: Record<string, string> = {
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
}

export interface OpenAISpecProduct {
  // Core required fields
  title: string
  description: string
  price: string
  availability: "in_stock" | "out_of_stock" | "pre_order" | "discontinued"
  category: string

  // Optional fields
  material?: string
  dimensions?: {
    length?: string
    width?: string
    height?: string
  }
  weight?: string
  color?: string
  size?: string
  brand?: string
  model?: string
  sku?: string
  upc?: string
  use_cases?: string[]
  target_audience?: string
  age_range?: string
  gender?: "male" | "female" | "unisex" | "kids"
  features?: string[]
  specifications?: Record<string, any>
  compatibility?: string[]
  keywords?: string[]
  tags?: string[]
  image_urls?: string[]
  video_urls?: string[]
  documentation_url?: string
  vendor?: string
  warranty?: string
  return_policy?: string
  shipping_info?: string
  ai_search_queries?: string[]
  semantic_description?: string
}

export interface ProductScore {
  score: number
  completeness: number
  gaps: string[]
  recommendations: string[]
  // New: Points system for instant gratification
  points: number
  maxPoints: number
  // New: Field-level progress tracking
  fieldProgress: {
    [fieldName: string]: {
      completed: boolean
      category: 'required' | 'high' | 'medium' | 'low'
      points: number
      weight: number
    }
  }
  // New: Category progress
  categoryProgress: {
    required: { completed: number; total: number; points: number }
    high: { completed: number; total: number; points: number }
    medium: { completed: number; total: number; points: number }
    low: { completed: number; total: number; points: number }
  }
}
