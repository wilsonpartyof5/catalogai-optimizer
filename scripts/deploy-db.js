#!/usr/bin/env node

// Script to push database schema to Railway
const { execSync } = require('child_process')

console.log('🚀 Pushing database schema to Railway...')

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
  
  // Push schema to database
  console.log('🗄️ Pushing schema to database...')
  execSync('npx prisma db push', { stdio: 'inherit' })
  
  console.log('✅ Database schema pushed successfully!')
} catch (error) {
  console.error('❌ Failed to push database schema:', error.message)
  process.exit(1)
}
