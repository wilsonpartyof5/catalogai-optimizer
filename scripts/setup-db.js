#!/usr/bin/env node

/**
 * Database Setup Script for Railway Deployment
 * This script ensures the database is properly set up before the app starts
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';

// Load environment variables
config();

console.log('🔧 Setting up database...');

try {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable not found');
    process.exit(1);
  }

  console.log('✅ DATABASE_URL found');

  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');

  // Push database schema
  console.log('🗄️ Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema pushed');

  // Verify tables exist
  console.log('🔍 Verifying database tables...');
  execSync('npx prisma db execute --stdin <<< "SELECT tablename FROM pg_tables WHERE schemaname = \'public\';"', { stdio: 'inherit' });
  console.log('✅ Database tables verified');

  console.log('🎉 Database setup completed successfully!');

} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  process.exit(1);
}
