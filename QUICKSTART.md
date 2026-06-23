# Quick Start Guide

## 1. Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend  
```bash
cd frontend/my-react-app
npm install
```

## 2. Start MongoDB
```bash
# Make sure MongoDB is running locally
mongod
```

## 3. Configure Environment
Create `.env` file in backend folder with required variables (see README.md)

## 4. Start Backend Server
```bash
cd backend
npm run dev
```

## 5. Start Frontend Dev Server
In a new terminal:
```bash
cd frontend/my-react-app
npm run dev
```

## 6. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 7. Test the Application

### Sample User Registration
```
Name: John Doe
Email: john@example.com
Password: password123
Phone: +1234567890
Address: 123 Main St
```

### Browse Menu
- Navigate to Menu page to see available food items
- Items are categorized (Appetizers, Mains, Desserts, etc.)

### Add Items & Checkout
- Add items to cart
- View cart summary
- Select payment method
- Place order

### Track Orders
- Go to "My Orders" to see order history
- Check real-time status updates

### Admin Access
- Login with admin role
- Access admin dashboard
- Manage products and orders

## Useful Commands

```bash
# Backend development
npm run dev       # Start with nodemon
npm start         # Production start

# Frontend development
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linter

# Database
db.createCollection("products")  # Create collections
db.createCollection("users")
db.createCollection("orders")
```

## First Time Setup

1. **Create Admin User**
   - Insert admin document into MongoDB:
   ```javascript
   db.users.insertOne({
     name: "Admin",
     email: "admin@example.com",
     password: "hashed_password",
     role: "admin"
   })
   ```

2. **Seed Sample Products**
   - Add some food items to test the menu

3. **Test Flow**
   - Register as user
   - Add items to cart
   - Place an order
   - Check admin dashboard

## Troubleshooting

### Port 5000 already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB connection issues
- Check if MongoDB service is running
- Verify connection string in `.env`
- Try: `mongosh` to test connection

### CORS errors
- Ensure backend server is running
- Check frontend API URL configuration
- Verify CORS middleware in express server

## Next Steps

1. Add more food items to database
2. Customize styling and branding
3. Implement payment gateway
4. Add email notifications
5. Deploy to production

Enjoy building! 🚀
