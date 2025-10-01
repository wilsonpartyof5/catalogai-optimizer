# Railway Deployment Setup Guide

## Step 1: Add Environment Variables

1. Go to your Railway project dashboard
2. Click on your **app service** (not the Postgres service)
3. Go to **"Variables"** tab
4. Add these variables one by one:

```
SHOPIFY_API_KEY=18d643b75cf05db561e4883f7a2ef108
SHOPIFY_API_SECRET=33efad08f53ac04ec1283b0c74e887a3
SCOPES=read_products,read_inventory,write_products,read_orders
SHOPIFY_APP_URL=https://your-railway-url.up.railway.app
SESSION_SECRET=kDKany3itZrgsp0K7Q+93BuER1XmU6eT6PJddwEqnEQ=
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://postgres:fFWnwOwgjGlWhvKojoUbjfmyRSsXJQui@maglev.proxy.rlwy.net:16514/railway
NODE_ENV=production
PORT=3000
```

## Step 2: Connect Database

1. In your app service settings
2. Go to **"Connect"** tab  
3. Connect to your **Postgres service**

## Step 3: Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"**

## Expected Result

- ✅ Healthcheck passes
- ✅ Service becomes healthy  
- ✅ App accessible via Railway URL
