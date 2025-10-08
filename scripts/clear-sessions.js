#!/usr/bin/env node

/**
 * Clear all Shopify sessions from the database
 * This forces a fresh OAuth flow with updated scopes
 */

import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const prisma = new PrismaClient()

async function clearSessions() {
  console.log('🧹 Clearing all Shopify sessions from database...')
  
  try {
    // Delete all sessions
    const result = await prisma.session.deleteMany({})
    console.log(`✅ Deleted ${result.count} sessions`)
    
    // Also clear user access tokens to force re-auth
    const userUpdate = await prisma.user.updateMany({
      data: {
        accessToken: ''
      }
    })
    console.log(`✅ Cleared access tokens for ${userUpdate.count} users`)
    
    console.log('✨ Database cleaned! Ready for fresh OAuth flow.')
    console.log('👉 Now uninstall and reinstall the app from Shopify.')
    
  } catch (error) {
    console.error('❌ Error clearing sessions:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

clearSessions()

