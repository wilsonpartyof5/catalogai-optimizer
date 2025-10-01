import { PrismaClient } from '@prisma/client'

declare global {
  var __db__: PrismaClient
}

let db: PrismaClient

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'minimal',
  })
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      log: ['query', 'error', 'warn'],
      errorFormat: 'pretty',
    })
  }
  db = global.__db__
  
  // Only connect in development
  db.$connect().catch((error) => {
    console.error('Failed to connect to database:', error)
  })
}

export { db }
