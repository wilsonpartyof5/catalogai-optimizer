# Phase 1-2 Verification Checklist: Load & Auth

## 🎯 Goal: Verify "Welcome, [Your Shop Name]!" appears (not "unknown")

---

## ✅ Pre-Flight Checks

### 1. Environment Variables
Check your `.env` file has all required values:

```bash
# Run this to verify env vars are set
cat .env | grep -E "SHOPIFY_API_KEY|SHOPIFY_API_SECRET|SHOPIFY_APP_URL|DATABASE_URL|SESSION_SECRET"
```

**Expected:**
- ✅ All variables should have actual values (not placeholder text)
- ✅ `SHOPIFY_APP_URL` should match your Railway deployment URL
- ✅ `DATABASE_URL` should point to your Railway PostgreSQL

### 2. Database Connection
Verify database is accessible:

```bash
# Test database connection
npx prisma db push

# Expected: "The database is already in sync with the Prisma schema."
```

### 3. Check Existing Sessions
Open Prisma Studio to see current database state:

```bash
npx prisma studio
```

**In Prisma Studio:**
- Navigate to `Session` table
- Look for records with your shop domain
- Navigate to `User` table
- Check if a user exists with your `shopId`

---

## 🧪 Test 1: Initial App Load

### Step 1: Load the App in Shopify Admin

1. Go to your Shopify Partners dashboard
2. Click "Test on development store"
3. Or navigate directly: `https://[YOUR-STORE].myshopify.com/admin/apps/[APP-NAME]`

### Expected Results:

✅ **SUCCESS Signs:**
- Banner shows: "Welcome, [Your Actual Shop Name]!" 
- Shop name is NOT "unknown"
- UI loads with Polaris styling
- No JavaScript errors in browser console (F12)
- Quick action buttons visible (Sync Products, AI Fix Products, Run Health Check)

❌ **FAILURE Signs:**
- Banner shows: "Welcome, unknown!"
- White screen / infinite loading
- Console errors about authentication
- 401/403 errors in Network tab

### Step 2: Check Browser Console

**Open DevTools (F12) → Console Tab**

✅ **Good:** No red errors
❌ **Bad:** Errors mentioning "session", "authenticate", "401", "403"

### Step 3: Check Network Tab

**DevTools → Network Tab → Reload page**

Look for the initial document request:
- ✅ Status: 200 OK
- ✅ Response contains your shop name in HTML
- ❌ Status: 302 (redirect loop)
- ❌ Status: 401/403 (auth failure)

---

## 🧪 Test 2: Verify Session in Database

If you see "unknown" shop name, check the database:

### Method 1: Prisma Studio (GUI)

```bash
npx prisma studio
```

**Check Session Table:**
1. Look for a row with `shop` = "[your-store].myshopify.com"
2. Verify `accessToken` exists (should be a long string)
3. Check `expires` is in the future
4. Note the `userId` if present

**Check User Table:**
1. Look for a row with `shopId` = "[your-store].myshopify.com"
2. Verify `accessToken` matches session
3. Check `tier` = "starter"
4. Check `aiUsage` = 0 (or some number)

### Method 2: Direct Query

```bash
# Check if user exists
npx prisma db execute --stdin <<EOF
SELECT * FROM users WHERE "shopId" LIKE '%myshopify.com%';
EOF
```

---

## 🧪 Test 3: Verify Authentication Flow

### Test Fresh Installation

If you want to test the full OAuth flow:

1. **Uninstall the app** from your dev store (if installed)
2. **Clear sessions** from database:
   ```bash
   npx prisma studio
   # Delete all records from Session table
   # Delete your user from User table
   ```
3. **Reinstall the app** from Partners dashboard
4. **Watch for**:
   - OAuth consent screen (should appear)
   - Redirect back to your app
   - "Welcome, [Shop Name]!" appears immediately

### Expected Flow:
1. Click "Install" → Shopify OAuth consent screen
2. Click "Install" → Redirects to your app
3. `afterAuth` hook triggers → User created in database
4. Dashboard loads → Shows shop name

---

## 🔧 Troubleshooting Guide

### Issue 1: Shows "Welcome, unknown!"

**Root Cause:** Session authentication failing

**Debug Steps:**

1. **Check loader in `_index.tsx`** (lines 53-139):
   - Line 55: `const { session } = await authenticate.admin(request)`
   - This should NOT throw an error
   - If it does, check your Shopify app credentials

2. **Add debug logging:**
   ```typescript
   // In app/routes/_index.tsx, add after line 55:
   console.log('Session shop:', session.shop)
   console.log('Session accessToken exists:', !!session.accessToken)
   ```

3. **Check afterAuth hook** in `shopify.server.ts`:
   - Line 14-30: Should create user on first install
   - Add logging:
   ```typescript
   afterAuth: async ({ session }) => {
     console.log('afterAuth triggered for shop:', session.shop)
     const result = await db.user.upsert({
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
     console.log('User created/updated:', result.id)
   }
   ```

4. **Check Railway logs:**
   ```bash
   # If deployed on Railway, check application logs
   # Look for:
   # - "afterAuth triggered for shop: ..."
   # - "User created/updated: ..."
   # - Any database connection errors
   ```

### Issue 2: White Screen / Loading Forever

**Root Cause:** JavaScript error or authentication loop

**Fix:**
1. Check browser console for errors
2. Check Network tab for redirect loops (multiple 302s)
3. Verify `SHOPIFY_APP_URL` in `.env` matches actual deployment URL
4. Clear browser cache and cookies for your dev store

### Issue 3: Database Connection Errors

**Root Cause:** DATABASE_URL incorrect or database unreachable

**Fix:**
1. Verify DATABASE_URL in Railway matches `.env`
2. Test connection: `npx prisma db push`
3. Check Railway PostgreSQL service is running
4. Regenerate Prisma client: `npx prisma generate`

### Issue 4: afterAuth Hook Not Triggering

**Root Cause:** Hook might not be firing on subsequent loads

**Expected Behavior:**
- `afterAuth` only triggers on **fresh installation** or **re-authentication**
- On normal page loads, it uses the existing session from database

**Fix:**
1. Uninstall app from dev store
2. Clear Session table in Prisma Studio
3. Reinstall app - this forces `afterAuth` to fire
4. Check if user is created in database

---

## 🎯 Success Criteria

**✅ Phase 1-2 PASSING if:**

1. Dashboard loads with "Welcome, [Your Actual Shop Name]!"
2. No "unknown" text anywhere
3. Browser console has no errors
4. User exists in database with correct shopId
5. Session exists in database with valid accessToken
6. UI is stable on refresh (no flickering/reloading)
7. Polaris styling applied (buttons look like Shopify buttons)

---

## 📋 Quick Test Commands

Run these in order:

```bash
# 1. Verify environment
echo "Checking environment variables..."
env | grep SHOPIFY

# 2. Test database connection
echo "Testing database..."
npx prisma db push

# 3. Open database viewer
echo "Opening Prisma Studio..."
npx prisma studio
# → Check Session and User tables

# 4. Check application logs (if on Railway)
# → View Railway dashboard logs

# 5. Test the app
echo "Open your app in Shopify admin and verify shop name appears"
```

---

## 🐛 Debug Checklist

If "unknown" appears, check these in order:

- [ ] `.env` file has all variables set (not placeholders)
- [ ] `SHOPIFY_APP_URL` matches your actual deployment URL
- [ ] Database connection works (`npx prisma db push`)
- [ ] Session exists in database (check via Prisma Studio)
- [ ] User exists in database with matching shopId
- [ ] `afterAuth` hook has no syntax errors
- [ ] Railway logs show no database connection errors
- [ ] Browser console shows no JavaScript errors
- [ ] Network tab shows 200 response (not 401/403)
- [ ] Try fresh install after clearing sessions

---

## 📞 Need Help?

If still stuck after these checks:

1. **Share the output of:**
   - Browser console errors (F12 → Console)
   - Railway application logs
   - Prisma Studio screenshots (Session and User tables)

2. **Verify these specific values:**
   - What does `session.shop` log as in loader?
   - Does user exist in database? What's the shopId?
   - Does session exist? What's the shop value?

3. **Common fixes:**
   - Redeploy to Railway after `.env` changes
   - Clear Shopify admin cache: Settings → Apps → Clear cache
   - Try in incognito/private browsing mode
   - Reinstall app completely

---

**Last Updated:** October 8, 2025
**Status:** Phase 1-2 verification guide for load & authentication

