import { ShopifyProduct } from './shopifySync'
import { OpenAISpecProduct, FIELD_WEIGHTS, FIELD_POINTS, ProductScore } from './openaiSpec'

export function mapShopifyToSpec(product: ShopifyProduct): OpenAISpecProduct {
  const spec: OpenAISpecProduct = {
    // Core required fields - map directly from Shopify
    title: product.title || '',
    description: product.description || '',
    price: product.variants[0]?.price ? `${product.variants[0].price} USD` : '0.00 USD',
    availability: getAvailabilityStatus(product.variants),
    category: product.productType || 'Uncategorized',

    // Physical attributes - from metafields or inference
    material: getMetafieldValue(product.metafields, 'material') || inferMaterial(product.title, product.description),
    weight: getMetafieldValue(product.metafields, 'weight'),
    color: getMetafieldValue(product.metafields, 'color') || inferColor(product.title, product.description),
    size: getMetafieldValue(product.metafields, 'size'),
    
    // Identification fields
    brand: product.vendor || getMetafieldValue(product.metafields, 'brand'),
    model: getMetafieldValue(product.metafields, 'model'),
    sku: product.variants[0]?.sku,
    upc: getMetafieldValue(product.metafields, 'upc') || getMetafieldValue(product.metafields, 'barcode'),
    
    // Usage and context
    use_cases: getMetafieldArray(product.metafields, 'use_cases') || inferUseCases(product.title, product.description),
    target_audience: getMetafieldValue(product.metafields, 'target_audience'),
    age_range: getMetafieldValue(product.metafields, 'age_range'),
    gender: getMetafieldValue(product.metafields, 'gender') as any,
    
    // Technical specifications
    features: getMetafieldArray(product.metafields, 'features') || inferFeatures(product.description),
    compatibility: getMetafieldArray(product.metafields, 'compatibility'),
    
    // SEO and search
    keywords: product.tags || [],
    tags: product.tags || [],
    
    // Media
    image_urls: product.images.map(img => img.url),
    video_urls: getMetafieldArray(product.metafields, 'video_urls') || getMetafieldArray(product.metafields, 'videos'),
    documentation_url: getMetafieldValue(product.metafields, 'documentation_url') || getMetafieldValue(product.metafields, 'manual_url'),
    
    // Business information
    vendor: product.vendor,
    warranty: getMetafieldValue(product.metafields, 'warranty'),
    return_policy: getMetafieldValue(product.metafields, 'return_policy'),
    shipping_info: getMetafieldValue(product.metafields, 'shipping_info'),
    
    // AI-specific fields
    ai_search_queries: getMetafieldArray(product.metafields, 'ai_search_queries'),
    semantic_description: getMetafieldValue(product.metafields, 'semantic_description'),
  }

  // Add dimensions if available
  const dimensions = getDimensionsFromMetafields(product.metafields)
  if (dimensions) {
    spec.dimensions = dimensions
  }

  // Add specifications if available
  const specifications = getSpecificationsFromMetafields(product.metafields)
  if (specifications && Object.keys(specifications).length > 0) {
    spec.specifications = specifications
  }

  return spec
}

function getAvailabilityStatus(variants: ShopifyProduct['variants']): "in_stock" | "out_of_stock" | "pre_order" | "discontinued" {
  if (variants.length === 0) return 'out_of_stock'
  
  const hasAvailable = variants.some(v => v.availableForSale && (v.inventoryQuantity || 0) > 0)
  const hasInventory = variants.some(v => (v.inventoryQuantity || 0) > 0)
  
  if (hasAvailable) return 'in_stock'
  if (hasInventory && !hasAvailable) return 'pre_order'
  return 'out_of_stock'
}

function getMetafieldValue(metafields: ShopifyProduct['metafields'], key: string): string | undefined {
  // First try to find in catalogai namespace (our AI-generated fields)
  let metafield = metafields.find(m => 
    m.namespace === 'catalogai' && (m.key === key || m.key.toLowerCase().includes(key.toLowerCase()))
  )
  
  // Fall back to any namespace with matching key
  if (!metafield) {
    metafield = metafields.find(m => 
      m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
    )
  }
  
  return metafield?.value
}

function getMetafieldArray(metafields: ShopifyProduct['metafields'], key: string): string[] | undefined {
  const value = getMetafieldValue(metafields, key)
  if (!value) return undefined
  
  try {
    // Try to parse as JSON array
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.filter(item => typeof item === 'string')
    }
  } catch {
    // If not JSON, check for bullet-pointed text first
    if (value.includes('\n-') || value.startsWith('-')) {
      return value
        .split('\n')
        .map(line => line.replace(/^[-•*]\s*/, '').trim())
        .filter(Boolean)
    }
    
    // Fall back to splitting by common delimiters
    return value.split(/[,;|]/).map(item => item.trim()).filter(Boolean)
  }
  
  return undefined
}

function getDimensionsFromMetafields(metafields: ShopifyProduct['metafields']) {
  const length = getMetafieldValue(metafields, 'length')
  const width = getMetafieldValue(metafields, 'width')
  const height = getMetafieldValue(metafields, 'height')
  
  if (!length && !width && !height) return null
  
  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
  }
}

function getSpecificationsFromMetafields(metafields: ShopifyProduct['metafields']): Record<string, any> | null {
  const specs: Record<string, any> = {}
  
  // Look for metafields in a specifications namespace
  const specMetafields = metafields.filter(m => 
    m.namespace === 'specifications' || m.namespace === 'specs'
  )
  
  for (const metafield of specMetafields) {
    specs[metafield.key] = metafield.value
  }
  
  return Object.keys(specs).length > 0 ? specs : null
}

// Inference functions for missing data
function inferMaterial(title: string, description: string): string | undefined {
  const materialKeywords = [
    'cotton', 'polyester', 'leather', 'metal', 'wood', 'plastic', 'glass',
    'ceramic', 'fabric', 'denim', 'silk', 'wool', 'bamboo', 'steel',
    'aluminum', 'bronze', 'silver', 'gold', 'rubber', 'silicone'
  ]
  
  const text = `${title} ${description}`.toLowerCase()
  
  for (const material of materialKeywords) {
    if (text.includes(material)) {
      return material.charAt(0).toUpperCase() + material.slice(1)
    }
  }
  
  return undefined
}

function inferColor(title: string, description: string): string | undefined {
  const colorKeywords = [
    'red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'grey',
    'pink', 'purple', 'orange', 'brown', 'beige', 'navy', 'maroon'
  ]
  
  const text = `${title} ${description}`.toLowerCase()
  
  for (const color of colorKeywords) {
    if (text.includes(color)) {
      return color.charAt(0).toUpperCase() + color.slice(1)
    }
  }
  
  return undefined
}

function inferUseCases(title: string, description: string): string[] {
  const useCaseKeywords = [
    'home', 'office', 'kitchen', 'bedroom', 'bathroom', 'garden', 'outdoor',
    'travel', 'sports', 'fitness', 'workout', 'cooking', 'cleaning',
    'decorative', 'functional', 'storage', 'organization'
  ]
  
  const text = `${title} ${description}`.toLowerCase()
  const foundUseCases: string[] = []
  
  for (const useCase of useCaseKeywords) {
    if (text.includes(useCase)) {
      foundUseCases.push(useCase.charAt(0).toUpperCase() + useCase.slice(1))
    }
  }
  
  return foundUseCases
}

function inferFeatures(description: string): string[] {
  const featureKeywords = [
    'waterproof', 'durable', 'lightweight', 'compact', 'portable',
    'adjustable', 'reversible', 'washable', 'dishwasher safe',
    'battery powered', 'cordless', 'wireless', 'bluetooth',
    'stainless steel', 'non-stick', 'heat resistant'
  ]
  
  const text = description.toLowerCase()
  const foundFeatures: string[] = []
  
  for (const feature of featureKeywords) {
    if (text.includes(feature)) {
      foundFeatures.push(feature.charAt(0).toUpperCase() + feature.slice(1))
    }
  }
  
  return foundFeatures
}

// Calculate product completeness score with enhanced sensitivity and points system
export function calculateProductScore(spec: OpenAISpecProduct): ProductScore {
  const gaps: string[] = []
  const recommendations: string[] = []
  let totalWeight = 0
  let weightedScore = 0
  let totalPoints = 0
  let maxPossiblePoints = 0
  
  // Field-level progress tracking
  const fieldProgress: ProductScore['fieldProgress'] = {}
  
  // Category progress tracking
  const categoryProgress: ProductScore['categoryProgress'] = {
    required: { completed: 0, total: 0, points: 0 },
    high: { completed: 0, total: 0, points: 0 },
    medium: { completed: 0, total: 0, points: 0 },
    low: { completed: 0, total: 0, points: 0 }
  }

  // Helper function to check if field has value
  const hasValue = (value: any): boolean => {
    return value !== undefined && value !== null && 
           (typeof value !== 'string' || value.trim() !== '') &&
           (!Array.isArray(value) || value.length > 0) &&
           (typeof value !== 'object' || Object.keys(value).length > 0)
  }

  // Process each category
  const categories = [
    { name: 'required' as const, fields: FIELD_WEIGHTS.required, points: FIELD_POINTS.required },
    { name: 'high' as const, fields: FIELD_WEIGHTS.high, points: FIELD_POINTS.high },
    { name: 'medium' as const, fields: FIELD_WEIGHTS.medium, points: FIELD_POINTS.medium },
    { name: 'low' as const, fields: FIELD_WEIGHTS.low, points: FIELD_POINTS.low }
  ]

  categories.forEach(({ name, fields, points }) => {
    categoryProgress[name].total = Object.keys(fields).length
    
    for (const [field, weight] of Object.entries(fields)) {
      totalWeight += weight
      maxPossiblePoints += points[field as keyof typeof points]
      
      const value = spec[field as keyof OpenAISpecProduct]
      const completed = hasValue(value)
      
      // Track field progress
      fieldProgress[field] = {
        completed,
        category: name,
        points: points[field as keyof typeof points],
        weight
      }
      
      if (completed) {
        weightedScore += weight
        totalPoints += points[field as keyof typeof points]
        categoryProgress[name].completed++
        categoryProgress[name].points += points[field as keyof typeof points]
      } else {
        gaps.push(field)
        if (name === 'high') {
          recommendations.push(`Add ${field} to improve product discoverability`)
        }
      }
    }
  })

  // Calculate percentage score (now more sensitive due to higher weights)
  const score = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0
  
  // Calculate completeness based on filled fields
  const totalFields = Object.keys(fieldProgress).length
  const completedFields = Object.values(fieldProgress).filter(f => f.completed).length
  const completeness = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0

  return {
    score,
    completeness,
    gaps,
    recommendations,
    points: totalPoints,
    maxPoints: maxPossiblePoints,
    fieldProgress,
    categoryProgress
  }
}

// Bulk map products
export function mapProductsToSpec(products: ShopifyProduct[]): (OpenAISpecProduct & { originalId: string, score: ProductScore })[] {
  return products.map(product => {
    const spec = mapShopifyToSpec(product)
    const score = calculateProductScore(spec)
    
    return {
      ...spec,
      originalId: product.id,
      score
    }
  })
}
