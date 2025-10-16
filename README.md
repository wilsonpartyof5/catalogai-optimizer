# CatalogAI Optimizer

AI-powered Shopify catalog optimization tool that helps merchants improve their product data quality for OpenAI search discovery. Automatically optimizes product catalogs for ChatGPT and AI-powered search engines through the Shopify-OpenAI partnership.

## 🎯 Key Features

### ✅ **Comprehensive OpenAI Compliance (35 Fields)**
- Tracks all 35 OpenAI product spec fields
- Real-time health scoring and gap analysis
- Complete visibility into missing metafields
- Optimizes products for ChatGPT discovery

### 🤖 **Scalable Gap-Driven AI Recommendations**
- Dynamically generates recommendations based on product gaps
- Smart categorization: AI-generatable vs. customer input required
- Approval workflow with ❌/✅ controls
- 11 AI-generatable fields: description, use_cases, features, keywords, etc.
- 17 customer input fields: material, dimensions, weight, color, etc.

### 📊 **Product Health Dashboard**
- Interactive product table with health scores
- Click-to-view detailed product gaps
- Visual gap identification
- Real-time score updates after improvements

### ⚡ **Automated Health Checks**
- Scheduled daily/weekly/monthly catalog scans
- BullMQ-powered background job processing
- Email notifications for critical issues
- Comprehensive analytics and trending

### 🔄 **Shopify Integration**
- Secure OAuth authentication
- Real-time product synchronization
- Direct metafield updates with `write_products` scope
- Automatic data sharing with OpenAI (no manual feeds needed)

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
2. Set the app URL to your deployed app URL (e.g., Railway)
3. Configure the required scopes:
   - `read_products` - Read product data
   - `read_inventory` - Read inventory levels
   - `write_products` - Update product data and metafields
   - `read_orders` - Read order history for analytics
4. Update your `shopify.app.toml` with the correct values
5. Deploy to Railway or your preferred hosting platform

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

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: React with Shopify Polaris UI components
- **Backend**: Remix with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Shopify OAuth (offline tokens)
- **AI Integration**: OpenAI GPT-3.5-turbo for content generation
- **Background Jobs**: BullMQ with Redis
- **Hosting**: Railway (production)

### **Key Components**

**1. Field Mapper (`app/utils/fieldMapper.ts`)**
- Maps Shopify product data to OpenAI spec (35 fields)
- Extracts metafields with multiple naming convention support
- Calculates health scores with weighted field importance

**2. AI Enrichment Service (`app/utils/aiEnrich.ts`)**
- Gap-driven recommendation generation
- Field categorization (customer input vs AI-generatable)
- Dynamic prompt configuration
- Approval workflow support

**3. Shopify Sync Service (`app/utils/shopifySync.ts`)**
- GraphQL-based product synchronization
- Pagination support for large catalogs
- Real-time inventory tracking

**4. Health Check System (`app/utils/healthChecks.ts`)**
- BullMQ job scheduling
- Automated catalog scans
- Email notifications via Resend
- Analytics and trending

### **Data Flow**
```
1. Shopify OAuth → Session Storage
2. Product Sync → Shopify GraphQL API → Local DB
3. Field Mapping → OpenAI Spec → Health Score
4. Gap Analysis → AI Recommendations → Approval UI
5. Approved Changes → Shopify API → Product Updates
6. Background Jobs → Health Checks → Email Reports
```

## 📋 OpenAI Product Spec Fields (35 Total)

### **Required Fields (5)**
- title, description, price, availability, category

### **High Priority (7)**
- material, dimensions, weight, brand, use_cases, features, image_urls

### **Medium Priority (9)**
- color, size, target_audience, keywords, upc, compatibility, age_range, gender, video_urls

### **Low Priority (14)**
- model, sku, tags, vendor, warranty, return_policy, shipping_info, documentation_url, specifications, ai_search_queries, semantic_description

### **Field Categories**

**Customer Input Required (17 fields)**:
- Fields requiring actual product specifications from the brand
- Cannot be inferred or generated by AI
- Examples: material, dimensions, weight, color, size, model, upc

**AI-Generatable (11 fields)**:
- Marketing and descriptive content AI can create
- Examples: description, use_cases, features, keywords, tags, warranty

**Core Required (5 fields)**:
- Essential fields that must exist for all products
- Examples: title, description, price, availability, category

## 🚀 Deployment

**Production**: Deployed on Railway
- Automatic deployments from `main` branch
- PostgreSQL and Redis included
- Environment variables configured in Railway dashboard

**Health Checks**:
- BullMQ worker runs scheduled jobs
- Daily catalog scans at 2 AM UTC
- Email notifications via Resend

## 📖 Documentation

For detailed development history and technical documentation, see [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
# Force deployment Thu Oct 16 14:16:34 EDT 2025
