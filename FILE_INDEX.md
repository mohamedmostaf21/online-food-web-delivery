# 📑 Project File Index & Guide

## 📚 Documentation Files (Start Here!)

| File | Purpose | When to Read |
|------|---------|--------------|
| **README.md** | Complete project overview and features | First - Get overall understanding |
| **QUICKSTART.md** | Fast setup instructions | Before running the app |
| **PROJECT_DELIVERY.md** | Delivery checklist and summary | Overview of what you have |
| **IMPLEMENTATION_SUMMARY.md** | Technical implementation details | For developers, implementation notes |
| **MONGODB_SETUP.md** | Database setup and configuration | Before connecting to database |
| **SAMPLE_DATA.js** | Test data to populate database | After MongoDB is set up |
| **FILE_INDEX.md** | This file - guide to all files | Reference for file locations |

---

## 🔧 Backend Files

### Configuration & Entry Point
```
backend/
├── server.js              Main Express server
├── .env                   Environment variables (REQUIRED - create this)
├── package.json           Dependencies and scripts
└── README.md              Setup instructions
```

### Database Models (`backend/models/`)
```
models/
├── User.js                User schema (authentication, profile)
├── Product.js             Product schema (bilingual)
└── Order.js               Order schema (tracking)
```

### API Routes (`backend/routes/`)
```
routes/
├── auth.js                Authentication endpoints (register, login)
├── products.js            Product CRUD operations
├── orders.js              Order management (create, track, cancel)
├── cart.js                Cart validation
├── admin.js               Admin dashboard operations
└── users.js               User profile management
```

### Middleware (`backend/middleware/`)
```
middleware/
└── auth.js                JWT verification and role-based access
```

---

## 🎨 Frontend Files

### Components (`frontend/my-react-app/src/components/`)
```
components/
├── Navbar.jsx             Navigation bar with language switcher
├── ProductCard.jsx        Individual food item card
└── CartItem.jsx           Cart item with quantity controls
```

### Pages (`frontend/my-react-app/src/pages/`)
```
pages/
├── Home.jsx               Home page with hero section
├── Menu.jsx               Menu with category filtering
├── Cart.jsx               Shopping cart and checkout
├── Login.jsx              User login form
├── Register.jsx           User registration form
├── Orders.jsx             Order history and tracking
├── Profile.jsx            User profile management
└── AdminDashboard.jsx     Admin panel and statistics
```

### Internationalization (`frontend/my-react-app/src/i18n/`)
```
i18n/
├── config.js              i18next configuration
└── locales/
    ├── en.json            English translations (141 keys)
    └── ar.json            Arabic translations (141 keys)
```

### State Management (`frontend/my-react-app/src/store/`)
```
store/
└── useStore.js            Zustand store (auth, cart, language)
```

### API Client (`frontend/my-react-app/src/api/`)
```
api/
└── api.js                 Axios HTTP client with interceptors
```

### Styles (`frontend/my-react-app/src/styles/`)
```
styles/
├── Navbar.css             Navigation styling
├── ProductCard.css        Product card styling
├── CartItem.css           Cart item styling
├── Auth.css               Login/Register styling
├── Cart.css               Cart page styling
├── Menu.css               Menu page styling
├── Orders.css             Orders page styling
├── Profile.css            Profile page styling
├── AdminDashboard.css     Admin dashboard styling
└── Home.css               Home page styling
```

### Main Application Files
```
frontend/my-react-app/src/
├── App.jsx                Main component with routing
├── App.css                Global application styles
├── main.jsx               Application entry point
└── index.css              Base styles
```

---

## 📊 Project Statistics

### Backend Statistics
- **Total routes**: 7 main routes
- **API endpoints**: 25+
- **Models**: 3 (User, Product, Order)
- **Database collections**: 3
- **Authentication**: JWT + bcrypt
- **Languages**: 2 supported

### Frontend Statistics
- **Pages**: 8
- **Components**: 3 reusable
- **CSS files**: 10 component-specific + 1 global
- **Translations**: 141 keys each language
- **State stores**: 1 Zustand store
- **Routes**: 8 application routes

### File Count
- **Backend files**: 15+
- **Frontend files**: 40+
- **Documentation files**: 7
- **Configuration files**: 3
- **Total files**: 65+

---

## 🚀 Quick File Reference

### To Run the Application
1. **Start Backend**: `backend/server.js` (via `npm run dev`)
2. **Start Frontend**: `frontend/my-react-app/src/main.jsx` (via `npm run dev`)
3. **Configuration**: `backend/.env` (create this file first)

### To Add New Feature
1. **Backend**: Create route in `backend/routes/`
2. **Database**: Update model in `backend/models/`
3. **Frontend**: Create page in `frontend/my-react-app/src/pages/`
4. **API**: Add endpoint in `frontend/my-react-app/src/api/api.js`
5. **Translations**: Update `frontend/my-react-app/src/i18n/locales/`

### To Debug
1. **API Issues**: Check `backend/routes/` and test with Postman
2. **UI Issues**: Check `frontend/my-react-app/src/pages/` and browser console
3. **Database Issues**: Check `backend/models/` and MongoDB
4. **Authentication**: Check `backend/middleware/auth.js`

---

## 📂 Directory Tree

```
online_food__web_app/
│
├── 📄 README.md                     # Main documentation
├── 📄 QUICKSTART.md                 # Setup guide (READ THIS FIRST)
├── 📄 PROJECT_DELIVERY.md           # Delivery checklist
├── 📄 IMPLEMENTATION_SUMMARY.md     # Technical details
├── 📄 MONGODB_SETUP.md              # Database setup
├── 📄 SAMPLE_DATA.js                # Test data
├── 📄 FILE_INDEX.md                 # This file
│
├── backend/                         # Node.js API Server
│   ├── .env                         # ⚠️ CREATE THIS - Environment vars
│   ├── server.js                    # ✨ Main entry point
│   ├── package.json                 # Dependencies
│   │
│   ├── models/
│   │   ├── User.js                  # User schema & methods
│   │   ├── Product.js               # Product schema (bilingual)
│   │   └── Order.js                 # Order schema
│   │
│   ├── routes/
│   │   ├── auth.js                  # /api/auth endpoints
│   │   ├── products.js              # /api/products endpoints
│   │   ├── orders.js                # /api/orders endpoints
│   │   ├── cart.js                  # /api/cart endpoints
│   │   ├── admin.js                 # /api/admin endpoints
│   │   └── users.js                 # /api/users endpoints
│   │
│   └── middleware/
│       └── auth.js                  # JWT verification
│
└── frontend/                        # React Application
    └── my-react-app/
        ├── vite.config.js           # Vite configuration
        ├── package.json             # Dependencies
        ├── index.html               # HTML entry point
        │
        └── src/
            ├── App.jsx              # ✨ Main component with routing
            ├── App.css              # Global styles
            ├── main.jsx             # Application bootstrap
            ├── index.css            # Base styles
            │
            ├── components/
            │   ├── Navbar.jsx       # Navigation component
            │   ├── ProductCard.jsx  # Product display
            │   └── CartItem.jsx     # Cart item component
            │
            ├── pages/
            │   ├── Home.jsx         # Home page
            │   ├── Menu.jsx         # Menu/browse page
            │   ├── Cart.jsx         # Shopping cart
            │   ├── Login.jsx        # Login page
            │   ├── Register.jsx     # Registration page
            │   ├── Orders.jsx       # Order history
            │   ├── Profile.jsx      # User profile
            │   └── AdminDashboard.jsx # Admin panel
            │
            ├── i18n/
            │   ├── config.js        # i18next setup
            │   └── locales/
            │       ├── en.json      # English translations
            │       └── ar.json      # Arabic translations
            │
            ├── store/
            │   └── useStore.js      # Zustand state management
            │
            ├── api/
            │   └── api.js           # Axios API client
            │
            └── styles/
                ├── Navbar.css
                ├── ProductCard.css
                ├── CartItem.css
                ├── Auth.css
                ├── Cart.css
                ├── Menu.css
                ├── Orders.css
                ├── Profile.css
                ├── AdminDashboard.css
                └── Home.css
```

---

## 🎯 File Purpose Quick Reference

### Essential First-Time Files
| File | Importance | Action |
|------|-----------|--------|
| QUICKSTART.md | ⭐⭐⭐ | Read first! |
| backend/.env | ⭐⭐⭐ | Create this! |
| backend/server.js | ⭐⭐⭐ | Run this! |
| frontend/main.jsx | ⭐⭐⭐ | Entry point |

### Configuration Files
| File | Purpose |
|------|---------|
| backend/.env | Environment variables (create yourself) |
| backend/package.json | Backend dependencies |
| frontend/package.json | Frontend dependencies |
| frontend/vite.config.js | Vite build configuration |

### Core Logic Files
| File | Responsibility |
|------|-----------------|
| backend/server.js | API initialization |
| backend/routes/*.js | API endpoints |
| backend/models/*.js | Database schemas |
| frontend/App.jsx | Routing & layout |
| frontend/store/useStore.js | Global state |

### Styling Files
| File | Scope |
|------|-------|
| frontend/App.css | Global app styles |
| frontend/index.css | Base styles |
| frontend/styles/*.css | Component styles |

---

## 💡 How to Use This Index

### Finding a specific feature?
1. Look up in the **Project Statistics** section
2. Check the **Directory Tree** for file location
3. Read the **File Purpose Reference** tables

### Adding a new feature?
1. Create backend route in `backend/routes/`
2. Create frontend page in `frontend/my-react-app/src/pages/`
3. Add API endpoint in `frontend/my-react-app/src/api/api.js`
4. Update translations in i18n files

### Debugging an issue?
1. Check **Backend Files** for API/database issues
2. Check **Frontend Files** for UI issues
3. Check documentation files for guidance

---

## 🔍 File Search Quick Tips

### By File Type
- **Routes**: `backend/routes/`
- **Database Models**: `backend/models/`
- **Pages**: `frontend/my-react-app/src/pages/`
- **Components**: `frontend/my-react-app/src/components/`
- **Styles**: `frontend/my-react-app/src/styles/`
- **Translations**: `frontend/my-react-app/src/i18n/locales/`

### By Feature
- **Authentication**: `backend/routes/auth.js`, `backend/middleware/auth.js`
- **Menu/Products**: `backend/routes/products.js`, `frontend/my-react-app/src/pages/Menu.jsx`
- **Cart**: `backend/routes/cart.js`, `frontend/my-react-app/src/pages/Cart.jsx`
- **Orders**: `backend/routes/orders.js`, `frontend/my-react-app/src/pages/Orders.jsx`
- **Admin**: `backend/routes/admin.js`, `frontend/my-react-app/src/pages/AdminDashboard.jsx`
- **Languages**: `frontend/my-react-app/src/i18n/`

---

## 📝 File Naming Conventions

- **React Components**: PascalCase (e.g., `Navbar.jsx`)
- **Pages**: PascalCase (e.g., `Home.jsx`)
- **Utilities**: camelCase (e.g., `useStore.js`)
- **Styles**: matches component name (e.g., `Navbar.css`)
- **Routes**: lowercase with .js (e.g., `auth.js`)
- **Models**: PascalCase (e.g., `User.js`)

---

## ⚡ Performance Tips

### Backend
- API routes are modular for easy updates
- Database models are optimized
- Middleware is efficient and ordered correctly

### Frontend
- Components are lazy-loadable
- Styles are component-specific for optimization
- State is centralized in Zustand
- API calls use axios with interceptors

---

## 🔐 Security-Related Files

| File | Security Feature |
|------|-----------------|
| backend/middleware/auth.js | JWT verification |
| backend/models/User.js | Password hashing |
| backend/routes/auth.js | Registration/Login |
| backend/.env | Secret storage |
| frontend/store/useStore.js | Token management |

---

## 📞 Quick Help

**Can't find a file?**
- Check the Directory Tree (above)
- Search in File Purpose Reference tables
- Refer to the database/frontend/backend sections

**Need to understand architecture?**
- Read IMPLEMENTATION_SUMMARY.md
- Check QUICKSTART.md for setup flow

**Want to customize?**
- Update styles in `frontend/my-react-app/src/styles/`
- Modify translations in i18n/locales/
- Add routes in `backend/routes/`

---

**Last Updated**: June 23, 2026  
**Total Files Referenced**: 65+  
**Status**: Complete ✅
