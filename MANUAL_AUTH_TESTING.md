# Manual Authorization Testing Guide

## Overview
This guide walks through verifying that the admin authorization fixes are working correctly in the frontend and backend.

## Prerequisites
1. Application is running (frontend on port 3000/5173, backend on port 5001)
2. Test accounts exist:
   - Admin: `admin@example.com` / `password123` with `role: "admin"`
   - User: `user@example.com` / `password123` with `role: "user"`

## Test Scenario 1: Normal Admin Access

### Steps:
1. Open browser and navigate to `http://localhost:5173` (frontend)
2. Click "Login" 
3. Enter admin credentials:
   - Email: `admin@example.com`
   - Password: `password123`
4. Click "Login"
5. Navigate to Admin Dashboard (look for admin menu or go to `/admin`)
6. Verify dashboard loads and displays stats/orders/users/products

### Expected Result:
✅ Admin can view dashboard, stats, orders, users, messages, and manage products

### Why This Works:
- Frontend passes role check: `token && user?.role === 'admin'` ✓
- Backend receives JWT with `role: "admin"` ✓
- adminMiddleware validates: `req.userRole === 'admin'` ✓

---

## Test Scenario 2: Non-Admin User Attempting Frontend Access

### Steps:
1. Log out current user (if logged in)
2. Navigate to `http://localhost:5173`
3. Login with user account:
   - Email: `user@example.com`
   - Password: `password123`
4. Manually edit URL to `/admin`
5. Observe what happens

### Expected Result:
❌ Should redirect to home page (`/`) 
✓ Admin Dashboard should NOT render
✓ Should see "Not authorized" or redirect message

### Why This Works:
- Frontend AdminRoute guard checks role: `token && user?.role === 'admin'` ✓
- If role is not admin, renders `<Navigate to="/" />` ✓

### Test Code (Browser Console):
```javascript
// Check what role is stored
const user = JSON.parse(localStorage.getItem('user'));
console.log('User Role:', user?.role); // Should be "user"
```

---

## Test Scenario 3: Direct API Access with Non-Admin Token

This tests backend protection when someone bypasses the frontend.

### Steps:
1. Log out current user
2. Login as regular user
3. Open Browser Developer Tools (F12)
4. Go to "Console" tab
5. Copy your auth token:
   ```javascript
   const token = localStorage.getItem('token');
   console.log(token);
   ```
6. Copy the entire token string

### Now test the API:
7. Go to "Network" tab
8. Make API request:
   ```javascript
   fetch('http://localhost:5001/api/admin/stats', {
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
   })
   .then(r => r.json())
   .then(d => console.log(d));
   ```
9. Look at the response

### Expected Result:
```json
{
  "message": "Access denied. Admin only."
}
```
❌ Should get **403 Forbidden** status

### Check Response Interceptor:
- If you see user logged out automatically, the response interceptor worked!
- Check localStorage:
  ```javascript
  console.log(localStorage.getItem('token')); // Should be null
  console.log(localStorage.getItem('user'));  // Should be null
  ```

---

## Test Scenario 4: Token Manipulation (Man-in-the-Middle Simulation)

This tests whether user can trick the system by modifying their token.

### Steps:
1. Login as regular user
2. Open Browser Developer Tools
3. Get current token and user:
   ```javascript
   const token = localStorage.getItem('token');
   const user = JSON.parse(localStorage.getItem('user'));
   console.log('Original Token:', token);
   console.log('Original User:', user);
   ```
4. Modify the user object in localStorage to claim admin role:
   ```javascript
   const user = JSON.parse(localStorage.getItem('user'));
   user.role = 'admin'; // Fake role change
   localStorage.setItem('user', JSON.stringify(user));
   console.log('Modified user:', user);
   ```
5. Refresh the page
6. Try to navigate to `/admin`
7. Try to access admin API:
   ```javascript
   fetch('http://localhost:5001/api/admin/stats', {
     headers: {
       'Authorization': `Bearer ${token}` // Still the original user token!
     }
   })
   .then(r => r.json())
   .then(d => console.log(d));
   ```

### Expected Result:
✅ Frontend might show admin dashboard (because localStorage says admin)
❌ But API calls should still fail with 403
✅ User should be automatically logged out

### Why This Works:
- JWT token was signed by server with `role: "user"`
- User cannot modify the JWT without the server's secret
- Backend decodes JWT and checks: `decoded.role === 'admin'`
- Since it's still "user", it returns 403
- Response interceptor catches 403 and logs out user

---

## Test Scenario 5: Expired/Invalid Token

### Steps:
1. Login as admin
2. Open Browser Developer Tools
3. Manually corrupt the token:
   ```javascript
   localStorage.setItem('token', 'invalid_token_here');
   ```
4. Refresh page
5. Try to access admin dashboard

### Expected Result:
❌ Should redirect to login or home page
✓ Should see error message

### Why This Works:
- authMiddleware in backend validates JWT signature
- Invalid token fails verification
- Returns 401 Unauthorized
- Frontend receives 401 and should handle gracefully

---

## Audit Checklist

Run through these checks to verify authorization is working:

- [ ] Admin can access `/admin` route
- [ ] Non-admin cannot access `/admin` route (redirects to home)
- [ ] Non-admin API calls to `/admin/*` return 403
- [ ] No token returns 401
- [ ] Invalid token returns 401
- [ ] User cannot see other users' orders (403 unless admin)
- [ ] User cannot change order status (403 unless admin)
- [ ] User cannot create/edit/delete products (403 unless admin)
- [ ] Admin can view all orders
- [ ] Admin can update order status
- [ ] Admin can manage products
- [ ] Modifying localStorage doesn't grant admin access

---

## Debugging Tips

### If Admin Can't Access Dashboard:
```javascript
// Check if token is valid
const token = localStorage.getItem('token');
console.log('Token exists:', !!token);

// Check if user role is correct
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user?.role);

// Verify token payload (don't share this token!)
// JWT format: header.payload.signature
const parts = token.split('.');
const payload = JSON.parse(atob(parts[1]));
console.log('Token payload:', payload);
```

### If Non-Admin Can Access API:
```javascript
// Check Network tab for API responses
// Look for 403 status code on admin API calls
// If you see 200, that's the bug!

// Check if interceptor is working
const user = JSON.parse(localStorage.getItem('user'));
console.log('User after 403:', user); // Should be null if interceptor worked
```

### If User Gets Logged Out Unexpectedly:
```javascript
// This might be the response interceptor catching a 403
// Check browser console for warnings:
// "Authorization failed (403)"

// This is actually correct behavior - user should be logged out on 403
```

---

## Integration with CI/CD

To automate these tests, run the provided test script:
```bash
chmod +x test-authorization.sh
./test-authorization.sh
```

This will run all test scenarios automatically and report pass/fail status.

---

## Summary

The authorization system has **4 layers of protection**:

1. **Frontend Route Guard** - Prevents rendering admin pages
2. **AdminDashboard useEffect** - Validates role before loading data
3. **Backend Middleware** - Checks JWT role before allowing access
4. **API Response Interceptor** - Catches 403 and logs out user

Each layer independently protects against unauthorized access. Even if one layer is bypassed, the others still protect the system.
