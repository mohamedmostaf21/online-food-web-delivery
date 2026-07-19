#!/bin/bash

# Security Authorization Test Suite
# This script tests all layers of the authorization system

set -e

API_URL="${API_URL:-http://localhost:5001/api}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@example.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-password123}"
USER_EMAIL="${USER_EMAIL:-user@example.com}"
USER_PASSWORD="${USER_PASSWORD:-password123}"

echo "🔒 Security Authorization Test Suite"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test Counter
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

run_test() {
  local test_name=$1
  local command=$2
  local expected_status=$3
  
  TESTS_RUN=$((TESTS_RUN + 1))
  echo ""
  echo "Test $TESTS_RUN: $test_name"
  echo "Command: $command"
  echo "Expected Status: $expected_status"
  
  response=$(eval "$command" 2>&1) || true
  status=$(echo "$response" | grep -o '"[^"]*"' | head -1)
  
  if [[ $status == *"$expected_status"* ]] || echo "$response" | grep -q "$expected_status"; then
    echo -e "${GREEN}✓ PASSED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
  else
    echo -e "${RED}✗ FAILED${NC}"
    echo "Response: $response"
    TESTS_FAILED=$((TESTS_FAILED + 1))
  fi
}

# Get tokens
echo "📝 Obtaining test tokens..."
echo ""

# Try to get admin token
echo "Logging in as admin: $ADMIN_EMAIL"
ADMIN_TOKEN=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ADMIN_TOKEN" ]; then
  echo -e "${YELLOW}⚠️  Could not obtain admin token. Make sure admin account exists.${NC}"
else
  echo -e "${GREEN}✓ Admin token obtained${NC}"
fi

# Try to get user token
echo "Logging in as user: $USER_EMAIL"
USER_TOKEN=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\"}" \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$USER_TOKEN" ]; then
  echo -e "${YELLOW}⚠️  Could not obtain user token. Make sure user account exists.${NC}"
else
  echo -e "${GREEN}✓ User token obtained${NC}"
fi

echo ""
echo "🧪 Running Tests..."
echo "==================="

if [ ! -z "$ADMIN_TOKEN" ]; then
  # Test 1: Admin can access stats
  run_test "Admin can access /admin/stats" \
    "curl -s -X GET '$API_URL/admin/stats' \
      -H 'Authorization: Bearer $ADMIN_TOKEN' \
      -w '\n%{http_code}' | tail -1" \
    "200"
    
  # Test 2: Admin can access messages
  run_test "Admin can access /admin/messages" \
    "curl -s -X GET '$API_URL/admin/messages' \
      -H 'Authorization: Bearer $ADMIN_TOKEN' \
      -w '\n%{http_code}' | tail -1" \
    "200"
    
  # Test 3: Admin can access orders
  run_test "Admin can access /admin/orders" \
    "curl -s -X GET '$API_URL/admin/orders' \
      -H 'Authorization: Bearer $ADMIN_TOKEN' \
      -w '\n%{http_code}' | tail -1" \
    "200"
fi

if [ ! -z "$USER_TOKEN" ]; then
  # Test 4: User cannot access stats
  run_test "User CANNOT access /admin/stats (should get 403)" \
    "curl -s -o /dev/null -w '%{http_code}' -X GET '$API_URL/admin/stats' \
      -H 'Authorization: Bearer $USER_TOKEN'" \
    "403"
    
  # Test 5: User cannot access messages
  run_test "User CANNOT access /admin/messages (should get 403)" \
    "curl -s -o /dev/null -w '%{http_code}' -X GET '$API_URL/admin/messages' \
      -H 'Authorization: Bearer $USER_TOKEN'" \
    "403"
    
  # Test 6: User cannot access orders
  run_test "User CANNOT access /admin/orders (should get 403)" \
    "curl -s -o /dev/null -w '%{http_code}' -X GET '$API_URL/admin/orders' \
      -H 'Authorization: Bearer $USER_TOKEN'" \
    "403"
    
  # Test 7: User can access own orders
  run_test "User CAN access /orders/user/my-orders" \
    "curl -s -o /dev/null -w '%{http_code}' -X GET '$API_URL/orders/user/my-orders' \
      -H 'Authorization: Bearer $USER_TOKEN'" \
    "200"
      
  # Test 8: No token gets 401
  run_test "No token gets 401 Unauthorized" \
    "curl -s -o /dev/null -w '%{http_code}' -X GET '$API_URL/admin/stats'" \
    "401"
fi

# Test 9: Invalid token gets 401
run_test "Invalid token gets 401 Unauthorized" \
  "curl -s -o /dev/null -w '%{http_code}' -X GET '$API_URL/admin/stats' \
    -H 'Authorization: Bearer invalid_token_here'" \
  "401"

echo ""
echo "📊 Test Results"
echo "==============="
echo "Tests Run: $TESTS_RUN"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed! Authorization is working correctly.${NC}"
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please review the authorization setup.${NC}"
  exit 1
fi
