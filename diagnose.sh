#!/bin/bash

# CatalogAI Optimizer - Phase 1-2 Diagnostic Script
# This script checks if authentication and database are working correctly

echo "======================================"
echo "CatalogAI Optimizer - Diagnostics"
echo "Phase 1-2: Load & Authentication Test"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Environment Variables
echo "1. Checking Environment Variables..."
if [ -f .env ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    
    # Check critical variables
    if grep -q "SHOPIFY_API_KEY=your" .env; then
        echo -e "${RED}✗${NC} SHOPIFY_API_KEY is still a placeholder"
        ENV_OK=false
    else
        echo -e "${GREEN}✓${NC} SHOPIFY_API_KEY is set"
    fi
    
    if grep -q "DATABASE_URL=postgresql" .env; then
        echo -e "${GREEN}✓${NC} DATABASE_URL is configured"
    else
        echo -e "${RED}✗${NC} DATABASE_URL not found"
        ENV_OK=false
    fi
    
    if grep -q "SHOPIFY_APP_URL=http" .env; then
        echo -e "${GREEN}✓${NC} SHOPIFY_APP_URL is set"
    else
        echo -e "${RED}✗${NC} SHOPIFY_APP_URL not found"
        ENV_OK=false
    fi
else
    echo -e "${RED}✗${NC} .env file not found!"
    echo "  Run: cp env.template .env"
    ENV_OK=false
fi
echo ""

# Check 2: Node Modules
echo "2. Checking Dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
else
    echo -e "${RED}✗${NC} node_modules not found"
    echo "  Run: npm install"
fi
echo ""

# Check 3: Prisma Client
echo "3. Checking Prisma..."
if [ -d "node_modules/.prisma" ]; then
    echo -e "${GREEN}✓${NC} Prisma client generated"
else
    echo -e "${YELLOW}!${NC} Prisma client may need regeneration"
    echo "  Run: npx prisma generate"
fi
echo ""

# Check 4: Database Connection
echo "4. Testing Database Connection..."
npx prisma db execute --stdin <<EOF > /dev/null 2>&1
SELECT 1;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Database connection successful"
else
    echo -e "${RED}✗${NC} Database connection failed"
    echo "  Check your DATABASE_URL in .env"
fi
echo ""

# Check 5: Session Table
echo "5. Checking Sessions in Database..."
SESSION_COUNT=$(npx prisma db execute --stdin <<EOF 2>/dev/null | grep -c "row"
SELECT * FROM sessions LIMIT 5;
EOF
)

if [ "$SESSION_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Found $SESSION_COUNT session(s) in database"
    echo "  You can view them with: npx prisma studio"
else
    echo -e "${YELLOW}!${NC} No sessions found"
    echo "  This is normal if you haven't installed the app yet"
fi
echo ""

# Check 6: User Table
echo "6. Checking Users in Database..."
USER_COUNT=$(npx prisma db execute --stdin <<EOF 2>/dev/null | grep -c "row"
SELECT * FROM users LIMIT 5;
EOF
)

if [ "$USER_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Found $USER_COUNT user(s) in database"
    echo "  User record exists - afterAuth hook worked!"
else
    echo -e "${YELLOW}!${NC} No users found"
    echo "  Install the app in Shopify to trigger user creation"
fi
echo ""

# Check 7: Build Status
echo "7. Checking Build..."
if [ -d "build" ]; then
    echo -e "${GREEN}✓${NC} Build directory exists"
    if [ -f "build/index.js" ]; then
        echo -e "${GREEN}✓${NC} Application built successfully"
    else
        echo -e "${YELLOW}!${NC} Build incomplete"
        echo "  Run: npm run build"
    fi
else
    echo -e "${YELLOW}!${NC} No build directory"
    echo "  Run: npm run build (if deploying)"
fi
echo ""

# Summary
echo "======================================"
echo "Summary"
echo "======================================"
echo ""

if [ "$ENV_OK" = false ]; then
    echo -e "${RED}⚠ ACTION REQUIRED:${NC}"
    echo "  1. Update your .env file with real values"
    echo "  2. Make sure DATABASE_URL points to Railway PostgreSQL"
    echo "  3. Set SHOPIFY_APP_URL to your Railway deployment URL"
    echo ""
fi

echo "Next Steps:"
echo "  1. Run: npx prisma studio"
echo "     → Check Session and User tables"
echo ""
echo "  2. Install app in Shopify dev store"
echo "     → Go to Partners dashboard"
echo "     → Click 'Test on development store'"
echo ""
echo "  3. Check if dashboard shows 'Welcome, [Your Shop]!'"
echo "     → If 'unknown' appears, check browser console (F12)"
echo "     → Check Railway logs for errors"
echo ""
echo "  4. For detailed troubleshooting:"
echo "     → See: VERIFICATION_CHECKLIST.md"
echo ""
echo "======================================"

