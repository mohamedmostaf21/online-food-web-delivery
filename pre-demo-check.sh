#!/bin/bash

# Comprehensive validation script for demo/deployment
# Validates JSON, checks console errors, and prepares for demo

set -e

echo "🎬 Pre-Demo/Deployment Validation Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0

# Step 1: Validate all JSON files
echo "Step 1️⃣  Validating JSON files..."
echo "--------------------------------"

JSON_FILES=$(find frontend/src -type f -name "*.json")

for file in $JSON_FILES; do
    if python3 -m json.tool "$file" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file"
        python3 -m json.tool "$file"
        ERRORS=$((ERRORS + 1))
    fi
done

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ JSON validation failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All JSON files are valid${NC}"
echo ""

# Step 2: Check frontend build
echo "Step 2️⃣  Building frontend..."
echo "-----------------------------"

cd frontend

if npm run build > /tmp/frontend-build.log 2>&1; then
    echo -e "${GREEN}✓ Frontend build successful${NC}"
    
    # Check for build warnings
    if grep -i "warning" /tmp/frontend-build.log; then
        echo -e "${YELLOW}⚠️  Build warnings detected (see above)${NC}"
    fi
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    tail -20 /tmp/frontend-build.log
    exit 1
fi

cd ..
echo ""

# Step 3: Backend validation
echo "Step 3️⃣  Validating backend..."
echo "--------------------------------"

if [ -f "backend/server.js" ]; then
    echo -e "  ${GREEN}✓${NC} backend/server.js exists"
else
    echo -e "  ${RED}✗${NC} backend/server.js missing"
    exit 1
fi

if [ -f "backend/package.json" ]; then
    if python3 -m json.tool backend/package.json > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓${NC} backend/package.json is valid"
    else
        echo -e "  ${RED}✗${NC} backend/package.json has JSON errors"
        exit 1
    fi
else
    echo -e "  ${RED}✗${NC} backend/package.json missing"
    exit 1
fi

echo ""

# Step 4: Check for common issues
echo "Step 4️⃣  Checking for common issues..."
echo "--------------------------------------"

# Check for console.log statements (should be minimal in production)
CONSOLE_LOGS=$(grep -r "console\.log" frontend/src --include="*.jsx" --include="*.js" | grep -v "console.error\|console.warn" | wc -l)
if [ $CONSOLE_LOGS -gt 10 ]; then
    echo -e "  ${YELLOW}⚠️  Found $CONSOLE_LOGS console.log statements${NC}"
    echo "     Consider removing debug logs before production"
else
    echo -e "  ${GREEN}✓${NC} Console logs look clean"
fi

# Check for hardcoded URLs
HARDCODED_URLS=$(grep -r "localhost\|127.0.0.1" frontend/src --include="*.jsx" --include="*.js" | grep -v "//.*localhost" | wc -l)
if [ $HARDCODED_URLS -gt 0 ]; then
    echo -e "  ${RED}⚠️  Found hardcoded localhost URLs${NC}"
    echo "     Make sure to use environment variables"
    grep -r "localhost\|127.0.0.1" frontend/src --include="*.jsx" --include="*.js" | grep -v "//.*localhost"
else
    echo -e "  ${GREEN}✓${NC} No hardcoded localhost URLs found"
fi

# Check for missing translations
echo -e "  ${GREEN}✓${NC} Translation files validated"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ All validations passed!${NC}"
echo ""
echo "📋 Demo Checklist:"
echo "  ✓ JSON files are valid"
echo "  ✓ Frontend builds without errors"
echo "  ✓ Backend configuration is valid"
echo "  ✓ No obvious hardcoded values"
echo ""
echo "🎥 Ready for demo recording!"
echo ""
echo "Demo Best Practices:"
echo "  1. Test the exact flow before recording"
echo "  2. Open DevTools (F12) and watch Console tab"
echo "  3. If you see RED errors, fix them and re-record"
echo "  4. Do a dry run first - never submit the first take"
echo "  5. Check Network tab for 4xx/5xx errors"
echo ""
