# Railway Deployment Troubleshooting

## Current Issue: Healthcheck Failing

**Problem**: App builds successfully but healthcheck fails with "service unavailable"

**Root Cause**: Missing environment variables or database connection issues

## Step-by-Step Fix

### 1. Set Environment Variables in Railway

**Go to Railway Dashboard:**
1. Click on your **app service** (main service, not Postgres)
2. Go to **"Variables"** tab
3. Add these variables:

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

### 2. Connect Database Service

1. In your app service settings
2. Go to **"Connect"** tab
3. Connect to your **Postgres service**
4. This should auto-set the `DATABASE_URL`

### 3. Push Database Schema

After environment variables are set:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** to trigger new deployment
3. The build will now have access to database and can push schema

### 4. Check Logs

After redeploy, check the logs for:
- ✅ Database connection success
- ✅ Health endpoint responding
- ❌ Any error messages

## Expected Results

**Successful Deployment:**
- Build completes in ~60 seconds
- Healthcheck passes within 30 seconds
- Service shows "Healthy" status
- App URL becomes accessible

**Health Endpoint Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T20:00:00.000Z",
  "service": "catalogai-optimizer",
  "database": "connected",
  "environment": "production"
}
```

## Common Issues

1. **Missing DATABASE_URL**: App can't connect to database
2. **Missing SESSION_SECRET**: App can't start properly
3. **Wrong SHOPIFY_APP_URL**: Should be your Railway URL
4. **Database not connected**: Need to connect Postgres service

## Next Steps After Fix

1. ✅ Get working Railway URL
2. ✅ Update Shopify Partners dashboard with new URL
3. ✅ Test app installation in development store
4. ✅ Verify embedded app works in Shopify admin
