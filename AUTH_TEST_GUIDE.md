# Phase 1-2 Authentication Test - Quick Guide

## 🎯 Your Goal
Verify the dashboard shows **"Welcome, [Your Shop Name]!"** instead of **"Welcome, unknown!"**

---

## ✅ Your Current Setup Status

Based on diagnostics:
- ✅ Environment variables configured
- ✅ Dependencies installed  
- ✅ Prisma client ready
- ⚠️ Database connection failed locally (this is OK - you're using Railway production DB)
- ℹ️ No local sessions/users (expected - your data is in Railway)

---

## 🚀 How to Test Authentication

### Option 1: Test in Production (Railway)

Your app is deployed at: **https://catalogai-optimizer-production.up.railway.app**

**Steps:**

1. **Go to your Shopify Partners Dashboard**
   - Navigate to: https://partners.shopify.com
   - Find your "CatalogAI Optimizer" app
   - Click "Test on development store"

2. **Install the app** (if not already installed)
   - Select your development store
   - Click "Install"
   - You should see OAuth consent screen
   - Click "Install" again to confirm

3. **Check the Dashboard**
   - After install, you'll be redirected to the app
   - Look for the banner at the top
   - **✅ SUCCESS**: "Welcome, [your-store-name]!"
   - **❌ PROBLEM**: "Welcome, unknown!"

4. **If you see "unknown":**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests
   - See troubleshooting below

---

## 🔍 Checking Railway Database

Since your database is on Railway, use these methods:

### Method 1: Prisma Studio (Connect to Railway DB)

```bash
# This connects to your Railway database
npx prisma studio
```

**In Prisma Studio:**
1. Click on "Session" table
   - Look for entries with your shop domain
   - Example: `your-store.myshopify.com`
   - Verify `accessToken` exists
   - Check `expires` is in the future

2. Click on "User" table
   - Look for entry with `shopId` matching your shop
   - Verify `shopDomain` matches
   - Check `tier` = "starter"
   - Note the `aiUsage` value

### Method 2: Railway Dashboard

1. Go to https://railway.app
2. Select your project
3. Click on PostgreSQL service
4. Click "Data" tab
5. Run query:
   ```sql
   SELECT * FROM users;
   SELECT * FROM sessions;
   ```

---

## 🐛 Troubleshooting "unknown" Shop Name

### Issue: Dashboard shows "Welcome, unknown!"

This means `session.shop` is undefined. Here's why:

**Code Flow:**
```typescript
// app/routes/_index.tsx (line 55)
const { session } = await authenticate.admin(request)

// Line 111 returns:
return json({
  shop: session.shop,  // ← This becomes "unknown" if session.shop is undefined
  ...
})
```

**Common Causes:**

1. **Session not persisted in database**
   - Check: Does Session table have entries?
   - Fix: Reinstall the app to trigger `afterAuth`

2. **afterAuth hook failed silently**
   - Check: Railway logs for errors during install
   - Fix: Look for database connection errors

3. **Wrong Shopify App URL**
   - Check: Does `SHOPIFY_APP_URL` in Railway match actual URL?
   - Fix: Update Railway environment variable

4. **Stale session**
   - Check: Is session expired in database?
   - Fix: Clear sessions and reinstall

---

## 🔧 Step-by-Step Debug Process

### Step 1: Check Railway Logs

```bash
# If you have Railway CLI:
railway logs

# Or visit Railway dashboard → Your project → View logs
```

**Look for:**
- ✅ "afterAuth triggered for shop: [your-shop].myshopify.com"
- ✅ "User created/updated: [user-id]"
- ❌ Database connection errors
- ❌ Prisma errors

### Step 2: Add Debug Logging

Add temporary logging to your `_index.tsx`:

```typescript
// app/routes/_index.tsx, after line 55
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request)
    
    // ADD THIS:
    console.log('🔍 DEBUG - Session shop:', session.shop)
    console.log('🔍 DEBUG - Session exists:', !!session)
    console.log('🔍 DEBUG - Access token exists:', !!session.accessToken)
    
    // ... rest of loader
```

Then:
1. Deploy to Railway: `git push`
2. View Railway logs
3. Reload app in Shopify
4. Check what the debug logs show

### Step 3: Verify afterAuth Hook

Check if the hook is working:

```typescript
// app/shopify.server.ts, line 14
afterAuth: async ({ session }) => {
  // ADD THIS:
  console.log('🔍 afterAuth triggered for:', session.shop)
  
  try {
    const user = await db.user.upsert({
      where: { shopId: session.shop! },
      update: {
        accessToken: session.accessToken!,
        updatedAt: new Date(),
      },
      create: {
        shopId: session.shop!,
        shopDomain: session.shop!,
        accessToken: session.accessToken!,
        tier: "starter",
        aiUsage: 0,
      },
    })
    
    console.log('✅ User created/updated:', user.id)
  } catch (error) {
    console.error('❌ afterAuth error:', error)
    throw error
  }
},
```

Then:
1. Uninstall app from Shopify
2. Deploy changes: `git push`
3. Reinstall app
4. Check Railway logs for debug messages

### Step 4: Force Fresh Install

1. **Uninstall app** from your Shopify dev store
   - Go to: Settings → Apps and sales channels
   - Find CatalogAI Optimizer
   - Click "Uninstall"

2. **Clear database** (using Prisma Studio):
   - Delete all records from `Session` table
   - Delete your user from `User` table

3. **Reinstall app** from Partners dashboard
   - This forces complete OAuth flow
   - afterAuth hook will fire
   - User should be created

4. **Check again** for shop name

---

## ✅ Expected Success State

When working correctly, you should see:

### In Browser:
- ✅ Banner: "Welcome, My Dev Store!" (actual store name)
- ✅ No console errors
- ✅ UI loads with Polaris styling
- ✅ Buttons are clickable

### In Railway Logs:
```
afterAuth triggered for: my-dev-store.myshopify.com
User created/updated: clxxxxxxxxxxxxxxx
```

### In Database (Prisma Studio):

**Session Table:**
| id | shop | accessToken | expires |
|----|------|-------------|---------|
| clxxx | my-dev-store.myshopify.com | shpat_xxxxx | 2025-10-09 |

**User Table:**
| id | shopId | shopDomain | tier | aiUsage |
|----|--------|------------|------|---------|
| clxxx | my-dev-store.myshopify.com | my-dev-store.myshopify.com | starter | 0 |

---

## 📋 Quick Test Checklist

Run through this in 5 minutes:

- [ ] Open app in Shopify admin
- [ ] Check banner shows actual shop name (not "unknown")
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab - no errors
- [ ] Check Network tab - status 200 for initial load
- [ ] Run `npx prisma studio` locally
- [ ] Verify Session table has entry with your shop
- [ ] Verify User table has entry with matching shopId
- [ ] Refresh app in Shopify - still shows shop name
- [ ] Check Railway logs - no errors

**If ALL checked:** ✅ Phase 1-2 authentication is working!

**If ANY failed:** See troubleshooting section above

---

## 🆘 Still Stuck?

If after all these steps you still see "unknown":

1. **Share these details:**
   - Browser console errors (screenshot)
   - Railway logs (last 50 lines)
   - Prisma Studio screenshots (Session and User tables)
   - Network tab showing the initial page load

2. **Try these nuclear options:**
   - Completely uninstall and reinstall app
   - Create a new development store
   - Check if Shopify Partners app credentials are correct
   - Verify Railway environment variables match `.env`

3. **Verification points:**
   - Can you see the OAuth consent screen when installing?
   - Does the URL redirect back to your app after install?
   - Are there any 401/403 errors in Network tab?

---

## 🎯 Summary

**The Goal:** Verify authentication works by seeing your actual shop name.

**The Test:** Load app → See "Welcome, [Shop Name]!" → Pass!

**The Cause if failing:** Session or User not being persisted correctly.

**The Fix:** Check afterAuth hook, database connection, and Railway logs.

**Time Required:** 5 minutes to test, 15 minutes to debug if issues found.

---

**Files Created for You:**
- ✅ `VERIFICATION_CHECKLIST.md` - Detailed step-by-step guide
- ✅ `diagnose.sh` - Diagnostic script (run with `./diagnose.sh`)
- ✅ This guide - Quick reference for Phase 1-2 testing

**Next:** Once you see your shop name, Phase 1-2 is confirmed working! 🎉

