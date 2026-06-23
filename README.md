# Online Food Ordering Web Application 🍕

A complete full-stack web application for online food ordering with multi-language support (English & Arabic).

## Features ✨

### User Features
- 🍽️ **Complete Menu Display** - Browse food items with images and prices
- 🛒 **Shopping Cart** - Add/remove items, adjust quantities
- 👤 **User Authentication** - Register and Login
- 💳 **Payment Options** - Online payment or Cash on Delivery
- 📍 **Order Tracking** - Real-time order status updates
- 🌍 **Multi-Language** - Full support for English & Arabic with RTL layout
- 👥 **User Profile** - Manage personal information and delivery address

### Admin Features
- 📊 **Dashboard** - View statistics and analytics
- 📦 **Product Management** - Add, edit, delete food items
- 📋 **Order Management** - View and update order statuses
- 👨‍💼 **User Management** - View registered users
- 💰 **Revenue Tracking** - Monitor sales and revenue

## Tech Stack 🛠️

### Backend
- **Node.js & Express** - REST API server
- **MongoDB** - Database (local or Atlas)
- **JWT** - Authentication & authorization
- **Bcrypt** - Password hashing
- **Cors** - Cross-origin resource sharing

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **i18next** - Internationalization (i18n)
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons

## Project Structure

```
online_food__web_app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── cart.js
│   │   ├── admin.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    └── my-react-app/
        ├── src/
        │   ├── components/
        │   │   ├── Navbar.jsx
        │   │   ├── ProductCard.jsx
        │   │   └── CartItem.jsx
        │   ├── pages/
        │   │   ├── Home.jsx
        │   │   ├── Menu.jsx
        │   │   ├── Cart.jsx
        │   │   ├── Login.jsx
        │   │   ├── Register.jsx
        │   │   ├── Orders.jsx
        │   │   ├── Profile.jsx
        │   │   └── AdminDashboard.jsx
        │   ├── i18n/
        │   │   ├── config.js
        │   │   └── locales/
        │   │       ├── en.json
        │   │       └── ar.json
        │   ├── store/
        │   │   └── useStore.js
        │   ├── api/
        │   │   └── api.js
        │   ├── styles/
        │   │   ├── *.css (component styles)
        │   ├── App.jsx
        │   └── main.jsx
        ├── package.json
        └── vite.config.js
```

## Setup Instructions 📝

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Configure Environment Variables**
Create a `.env` file in the backend folder:
```env
MONGODB_URI=mongodb://localhost:27017/food-ordering
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
```

3. **Start MongoDB**
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

4. **Run Backend Server**
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

Server will be running at `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend/my-react-app
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

Frontend will be running at `http://localhost:5173`

3. **Build for Production**
```bash
npm run build
```

## API Endpoints 🔗

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order

### Admin
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/users` - Get all users

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/profile` - Update user profile

## Language Support 🌐

The app supports both English and Arabic with:
- **Language Switcher** - Toggle between EN/AR in navbar
- **RTL Layout** - Automatic right-to-left layout for Arabic
- **Translation Keys** - Complete translation coverage for all UI elements
- **Persistent Selection** - Language preference saved to localStorage

## How to Use 🚀

### For Users
1. **Browse Menu** - Visit the menu page to see all available food items
2. **Add to Cart** - Click "Add to Cart" on any food item
3. **Create Account** - Register or login to place orders
4. **Checkout** - Review cart and proceed to checkout
5. **Select Payment** - Choose payment method (Online or Cash)
6. **Track Order** - Monitor your order status in real-time

### For Admin
1. **Login as Admin** - Use admin credentials
2. **Access Dashboard** - View statistics and analytics
3. **Manage Products** - Add, edit, or delete menu items
4. **Manage Orders** - Update order statuses
5. **View Users** - Monitor registered users

## Sample Admin Credentials
```
Email: admin@example.com
Password: admin123
```
*(Note: Create admin user via database or use MongoDB directly)*

## Database Models 🗄️

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (user/admin),
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  nameAr: String,
  description: String,
  descriptionAr: String,
  price: Number,
  image: String (URL),
  category: String,
  categoryAr: String,
  availability: Boolean,
  preparationTime: Number (minutes),
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId (User),
  items: Array,
  totalAmount: Number,
  paymentMethod: String (online/cash),
  paymentStatus: String,
  orderStatus: String,
  deliveryAddress: String,
  estimatedDeliveryTime: Date,
  specialInstructions: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Payment Integration 💳

Currently supports:
- **Cash on Delivery** - Pay when order arrives
- **Online Payment** - Ready for Stripe integration

To add Stripe:
1. Get API keys from Stripe dashboard
2. Update `.env` with your keys
3. Implement Stripe checkout in Cart component

## Future Enhancements 🔮

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS order updates
- [ ] Ratings and reviews
- [ ] Promotional codes/coupons
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Restaurant ratings and filters
- [ ] Favorites/Wishlist
- [ ] Order scheduling

## Troubleshooting 🔧

**MongoDB connection error?**
- Make sure MongoDB is running
- Check connection string in `.env`

**API not working?**
- Verify backend is running on port 5000
- Check CORS is enabled
- Review API endpoint syntax

**Frontend not loading?**
- Clear browser cache
- Check if Vite dev server is running
- Verify package.json dependencies are installed

## License 📄

MIT License - Feel free to use this project for learning and development purposes.

## Support 💬

For issues or questions, please create an issue in the repository.

---

Happy Coding! 🎉
# online-food-web-delivery
