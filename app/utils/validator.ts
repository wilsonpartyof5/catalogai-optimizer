import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import axios from 'axios'
import { OPENAI_PRODUCT_SCHEMA, OpenAISpecProduct } from './openaiSpec'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

// Compile the schema
const validate = ajv.compile(OPENAI_PRODUCT_SCHEMA)

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export interface ValidationError {
  field: string
  message: string
  value?: any
}

export interface ValidationWarning {
  field: string
  message: string
  suggestion?: string
}

export function validateProduct(product: OpenAISpecProduct): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  // Schema validation
  const isValid = validate(product)
  
  if (!isValid && validate.errors) {
    for (const error of validate.errors) {
      errors.push({
        field: error.instancePath ? error.instancePath.slice(1) : 'root',
        message: error.message || 'Validation error',
        value: error.data
      })
    }
  }

  // Custom validations
  validateDescription(product, warnings)
  validatePrice(product, errors)
  validateImageUrls(product, warnings)
  validateLinks(product, warnings)

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

function validateDescription(product: OpenAISpecProduct, warnings: ValidationWarning[]) {
  if (!product.description) return

  const desc = product.description

  // Check for HTML tags
  const htmlRegex = /<[^>]*>/g
  if (htmlRegex.test(desc)) {
    warnings.push({
      field: 'description',
      message: 'Description contains HTML tags',
      suggestion: 'Use plain text for better AI search compatibility'
    })
  }

  // Check length
  if (desc.length < 100) {
    warnings.push({
      field: 'description',
      message: 'Description is too short',
      suggestion: 'Add more details about features, benefits, and use cases'
    })
  }

  if (desc.length > 4000) {
    warnings.push({
      field: 'description',
      message: 'Description is too long',
      suggestion: 'Consider shortening to under 4000 characters'
    })
  }

  // Check for generic descriptions
  const genericPhrases = [
    'great product',
    'high quality',
    'perfect for',
    'amazing',
    'wonderful',
    'excellent'
  ]

  const lowerDesc = desc.toLowerCase()
  const genericCount = genericPhrases.filter(phrase => lowerDesc.includes(phrase)).length
  
  if (genericCount > 2) {
    warnings.push({
      field: 'description',
      message: 'Description contains too many generic phrases',
      suggestion: 'Use more specific, descriptive language'
    })
  }
}

function validatePrice(product: OpenAISpecProduct, errors: ValidationError[]) {
  if (!product.price) return

  const priceRegex = /^\d+\.\d{2} [A-Z]{3}$/
  if (!priceRegex.test(product.price)) {
    errors.push({
      field: 'price',
      message: 'Price must be in format "XX.XX USD"',
      value: product.price
    })
  }
}

async function validateImageUrls(product: OpenAISpecProduct, warnings: ValidationWarning[]) {
  if (!product.image_urls || product.image_urls.length === 0) return

  for (const [index, url] of product.image_urls.entries()) {
    try {
      const response = await axios.head(url, { timeout: 5000 })
      
      if (response.status !== 200) {
        warnings.push({
          field: `image_urls[${index}]`,
          message: `Image URL returned status ${response.status}`,
          suggestion: 'Check if the image URL is accessible'
        })
      }

      // Check content type
      const contentType = response.headers['content-type']
      if (contentType && !contentType.startsWith('image/')) {
        warnings.push({
          field: `image_urls[${index}]`,
          message: 'URL does not appear to be an image',
          suggestion: 'Ensure the URL points to an image file'
        })
      }
    } catch (error) {
      warnings.push({
        field: `image_urls[${index}]`,
        message: 'Failed to validate image URL',
        suggestion: 'Check if the URL is accessible and points to an image'
      })
    }
  }
}

async function validateLinks(product: OpenAISpecProduct, warnings: ValidationWarning[]) {
  const linksToValidate = []

  if (product.documentation_url) {
    linksToValidate.push({ url: product.documentation_url, field: 'documentation_url' })
  }

  if (product.video_urls) {
    product.video_urls.forEach((url, index) => {
      linksToValidate.push({ url, field: `video_urls[${index}]` })
    })
  }

  for (const { url, field } of linksToValidate) {
    try {
      const response = await axios.head(url, { timeout: 5000 })
      
      if (response.status !== 200) {
        warnings.push({
          field,
          message: `Link returned status ${response.status}`,
          suggestion: 'Check if the link is accessible'
        })
      }
    } catch (error) {
      warnings.push({
        field,
        message: 'Failed to validate link',
        suggestion: 'Check if the link is accessible'
      })
    }
  }
}

// Batch validation for multiple products
export async function validateProducts(products: OpenAISpecProduct[]): Promise<ValidationResult[]> {
  const results: ValidationResult[] = []

  for (const product of products) {
    const result = validateProduct(product)
    results.push(result)
  }

  return results
}

// Get validation summary
export function getValidationSummary(results: ValidationResult[]) {
  const totalProducts = results.length
  const validProducts = results.filter(r => r.valid).length
  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0)
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0)

  const commonErrors = getCommonIssues(results.map(r => r.errors).flat(), 'error')
  const commonWarnings = getCommonIssues(results.map(r => r.warnings).flat(), 'warning')

  return {
    totalProducts,
    validProducts,
    invalidProducts: totalProducts - validProducts,
    totalErrors,
    totalWarnings,
    validationRate: totalProducts > 0 ? Math.round((validProducts / totalProducts) * 100) : 0,
    commonErrors,
    commonWarnings
  }
}

function getCommonIssues(issues: (ValidationError | ValidationWarning)[], type: 'error' | 'warning'): Array<{ field: string, count: number, message: string }> {
  const fieldCounts = new Map<string, { count: number, message: string }>()

  for (const issue of issues) {
    const key = issue.field
    if (fieldCounts.has(key)) {
      fieldCounts.get(key)!.count++
    } else {
      fieldCounts.set(key, { count: 1, message: issue.message })
    }
  }

  return Array.from(fieldCounts.entries())
    .map(([field, data]) => ({ field, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 most common issues
}
