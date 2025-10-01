// Simple test utilities for development

import { mapShopifyToSpec, calculateProductScore } from './fieldMapper'
import { validateProduct } from './validator'

export function testFieldMapping() {
  const mockShopifyProduct = {
    id: "123",
    title: "Cotton T-Shirt",
    description: "A comfortable cotton t-shirt for everyday wear",
    handle: "cotton-t-shirt",
    productType: "Clothing",
    vendor: "Test Brand",
    tags: ["cotton", "casual", "comfortable"],
    variants: [{
      id: "456",
      title: "Default Title",
      price: "19.99",
      compareAtPrice: undefined,
      sku: "TSHIRT-001",
      inventoryQuantity: 50,
      availableForSale: true,
    }],
    metafields: [],
    images: [{
      id: "789",
      url: "https://example.com/image.jpg",
      altText: "Cotton T-Shirt",
    }],
  }

  console.log("Testing field mapping...")
  const spec = mapShopifyToSpec(mockShopifyProduct)
  console.log("Mapped spec:", spec)

  const score = calculateProductScore(spec)
  console.log("Product score:", score)

  const validation = validateProduct(spec)
  console.log("Validation result:", validation)

  return { spec, score, validation }
}

export function testValidation() {
  const testProduct = {
    title: "Test Product",
    description: "This is a test product description that should be long enough to pass validation. It contains detailed information about the product features and benefits.",
    price: "29.99 USD",
    availability: "in_stock" as const,
    category: "Test Category",
  }

  console.log("Testing validation...")
  const result = validateProduct(testProduct)
  console.log("Validation result:", result)

  return result
}

// Export for testing in development
if (typeof window === 'undefined') {
  // Node.js environment
  console.log("Running tests...")
  testFieldMapping()
  testValidation()
}
