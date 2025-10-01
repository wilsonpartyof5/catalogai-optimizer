import OpenAI from 'openai'
import { db } from './db'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIUsage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

export class AIClient {
  private async trackUsage(userId: string, usage: AIUsage) {
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          aiUsage: {
            increment: usage.totalTokens,
          },
        },
      })
    } catch (error) {
      console.error('Failed to track AI usage:', error)
    }
  }

  async enrichDescription(
    userId: string,
    title: string,
    currentDescription: string,
    category?: string,
    material?: string
  ): Promise<{ enriched: string; usage: AIUsage }> {
    const prompt = `You are an expert product copywriter specializing in e-commerce optimization for AI search systems. 

Your task is to enrich the following product description to make it more comprehensive, SEO-friendly, and optimized for AI search queries. The description should be between 400-4000 characters and written in plain text (no HTML).

Product Information:
- Title: ${title}
- Category: ${category || 'Not specified'}
- Material: ${material || 'Not specified'}
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

Return only the enriched description text.`

    try {
      const response = await openai.chat.completions.create({
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
        max_tokens: 1000,
        temperature: 0.7,
      })

      const enriched = response.choices[0]?.message?.content || currentDescription
      const usage: AIUsage = {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      }

      await this.trackUsage(userId, usage)
      
      return { enriched, usage }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error(`Failed to enrich description: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async inferMaterial(
    userId: string,
    title: string,
    description: string,
    category?: string
  ): Promise<{ material: string; usage: AIUsage }> {
    const prompt = `Based on the following product information, determine the most likely primary material composition. Return only the material name.

Product Information:
- Title: ${title}
- Category: ${category || 'Not specified'}
- Description: ${description}

Common materials include: cotton, polyester, leather, metal, wood, plastic, glass, ceramic, fabric, denim, silk, wool, bamboo, steel, aluminum, bronze, silver, gold, rubber, silicone, etc.

If the material is unclear, return "Unknown". Return only the material name, nothing else.`

    try {
      const response = await openai.chat.completions.create({
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
        temperature: 0.3,
      })

      const material = response.choices[0]?.message?.content?.trim() || "Unknown"
      const usage: AIUsage = {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      }

      await this.trackUsage(userId, usage)
      
      return { material, usage }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error(`Failed to infer material: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateUseCases(
    userId: string,
    title: string,
    description: string,
    category?: string
  ): Promise<{ useCases: string[]; usage: AIUsage }> {
    const prompt = `Based on the following product information, generate 3-5 specific use cases or applications for this product. Return the use cases as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || 'Not specified'}
- Description: ${description}

Focus on practical, specific use cases that would help customers understand how to use this product. Examples might include specific activities, environments, or situations where the product would be useful.

Return only a JSON array like: ["Use case 1", "Use case 2", "Use case 3"]`

    try {
      const response = await openai.chat.completions.create({
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
        temperature: 0.7,
      })

      const content = response.choices[0]?.message?.content || "[]"
      let useCases: string[] = []
      
      try {
        useCases = JSON.parse(content)
        if (!Array.isArray(useCases)) {
          useCases = []
        }
      } catch {
        useCases = []
      }

      const usage: AIUsage = {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      }

      await this.trackUsage(userId, usage)
      
      return { useCases, usage }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error(`Failed to generate use cases: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateFeatures(
    userId: string,
    title: string,
    description: string,
    category?: string
  ): Promise<{ features: string[]; usage: AIUsage }> {
    const prompt = `Based on the following product information, extract and generate 3-6 key features or characteristics of this product. Return the features as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || 'Not specified'}
- Description: ${description}

Focus on specific, factual features that highlight the product's benefits or characteristics. These should be features that customers would care about when making a purchase decision.

Return only a JSON array like: ["Feature 1", "Feature 2", "Feature 3"]`

    try {
      const response = await openai.chat.completions.create({
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
        temperature: 0.5,
      })

      const content = response.choices[0]?.message?.content || "[]"
      let features: string[] = []
      
      try {
        features = JSON.parse(content)
        if (!Array.isArray(features)) {
          features = []
        }
      } catch {
        features = []
      }

      const usage: AIUsage = {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      }

      await this.trackUsage(userId, usage)
      
      return { features, usage }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error(`Failed to generate features: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateKeywords(
    userId: string,
    title: string,
    description: string,
    category?: string
  ): Promise<{ keywords: string[]; usage: AIUsage }> {
    const prompt = `Based on the following product information, generate 5-10 relevant SEO keywords that customers might use to search for this product. Return the keywords as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || 'Not specified'}
- Description: ${description}

Focus on keywords that are:
1. Relevant to the product
2. Commonly used in search queries
3. Specific enough to be meaningful
4. Broad enough to capture search volume

Include a mix of short-tail and long-tail keywords.

Return only a JSON array like: ["keyword 1", "keyword 2", "keyword 3"]`

    try {
      const response = await openai.chat.completions.create({
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
        temperature: 0.6,
      })

      const content = response.choices[0]?.message?.content || "[]"
      let keywords: string[] = []
      
      try {
        keywords = JSON.parse(content)
        if (!Array.isArray(keywords)) {
          keywords = []
        }
      } catch {
        keywords = []
      }

      const usage: AIUsage = {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      }

      await this.trackUsage(userId, usage)
      
      return { keywords, usage }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error(`Failed to generate keywords: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
