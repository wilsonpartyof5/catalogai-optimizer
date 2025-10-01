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

// Field importance weights for scoring
export const FIELD_WEIGHTS = {
  // Required fields (must be 100% complete)
  required: {
    title: 1.0,
    description: 1.0,
    price: 1.0,
    availability: 1.0,
    category: 1.0,
  },
  // High importance optional fields
  high: {
    material: 0.8,
    dimensions: 0.7,
    weight: 0.6,
    brand: 0.7,
    use_cases: 0.8,
    features: 0.7,
  },
  // Medium importance fields
  medium: {
    color: 0.5,
    size: 0.5,
    target_audience: 0.6,
    keywords: 0.6,
    image_urls: 0.5,
  },
  // Low importance fields
  low: {
    model: 0.3,
    sku: 0.4,
    tags: 0.4,
    vendor: 0.3,
    warranty: 0.3,
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
}
