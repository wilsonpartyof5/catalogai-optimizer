# CatalogAI Optimizer

AI-powered Shopify catalog optimization tool that helps merchants improve their product data quality and enhance search performance.

## Features

- **Catalog Health Monitoring**: Analyze product data completeness and quality
- **AI-Powered Field Population**: Automatically enrich product descriptions and metadata
- **OpenAI Integration**: Generate optimized product feeds for AI search
- **Real-time Analytics**: Track catalog performance and improvement metrics
- **Automated Health Checks**: Scheduled audits and reporting

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Shopify Partner account
- OpenAI API key

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.template .env
# Edit .env with your actual values
```

3. Set up the database:
```bash
npm run db:push
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

### Environment Variables

Required environment variables:

- `SHOPIFY_API_KEY`: Your Shopify app's API key
- `SHOPIFY_API_SECRET`: Your Shopify app's API secret
- `SHOPIFY_APP_URL`: Your app's public URL
- `SESSION_SECRET`: Random string for session encryption
- `OPENAI_API_KEY`: Your OpenAI API key
- `DATABASE_URL`: PostgreSQL connection string

### Shopify App Setup

1. Create a new app in your Shopify Partners dashboard
2. Set the app URL to your deployed app URL
3. Configure the required scopes:
   - `read_products`
   - `read_inventory`
   - `write_metafields`
   - `read_orders`
4. Update your `shopify.app.toml` with the correct values

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript checks
- `npm test` - Run tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database

### Project Structure

```
├── app/
│   ├── routes/          # Remix routes
│   └── utils/           # Utility functions
├── db/
│   └── seed.ts         # Database seeding
├── prisma/
│   └── schema.prisma   # Database schema
└── extensions/         # Shopify app extensions (if needed)
```

## Architecture

- **Frontend**: React with Shopify Polaris UI components
- **Backend**: Remix with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Shopify OAuth
- **AI Integration**: OpenAI API for content generation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
