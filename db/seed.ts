import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create a demo user
  const user = await db.user.upsert({
    where: { shopId: 'demo-shop.myshopify.com' },
    update: {},
    create: {
      shopId: 'demo-shop.myshopify.com',
      shopDomain: 'demo-shop.myshopify.com',
      accessToken: 'demo-access-token',
      tier: 'starter',
      aiUsage: 0,
    },
  })

  console.log('Created demo user:', user.id)

  // Create some demo audits
  await db.audit.create({
    data: {
      userId: user.id,
      score: 75.5,
      totalProducts: 150,
      validProducts: 113,
      gaps: [
        { field: 'material', count: 25 },
        { field: 'dimensions', count: 18 },
        { field: 'weight', count: 12 },
      ],
    },
  })

  await db.audit.create({
    data: {
      userId: user.id,
      score: 82.3,
      totalProducts: 150,
      validProducts: 123,
      gaps: [
        { field: 'material', count: 15 },
        { field: 'dimensions', count: 8 },
        { field: 'weight', count: 4 },
      ],
    },
  })

  // Create some demo logs
  await db.log.create({
    data: {
      userId: user.id,
      type: 'sync',
      message: 'Product catalog synchronized successfully',
      metadata: { productsCount: 150, duration: 2500 },
    },
  })

  await db.log.create({
    data: {
      userId: user.id,
      type: 'push',
      message: 'Feed pushed to OpenAI endpoint',
      pushStatus: 'success',
      metadata: { endpoint: 'https://api.openai.com/v1/files', fileSize: '2.3MB' },
    },
  })

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
