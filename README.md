# Online Food Web Delivery 🍕

A full-stack food ordering experience with English and Arabic support, a working cart and checkout flow, admin management, and a responsive storefront.

## What this project includes

- Customer-facing menu, cart, orders, profile, contact, and offers pages
- Authenticated user flows with JWT-based login and registration
- Admin dashboard access for stats, orders, users, and product management
- Multi-language UI with RTL support for Arabic
- A Node/Express backend and a React/Vite frontend

## Live demo

- https://online-food-ordering.up.railway.app/

## Project structure

```text
online-food-web-delivery/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seedDatabase.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── i18n/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── docker-compose.yml
```

## Tech stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- CORS + dotenv

### Frontend
- React 19
- Vite
- React Router
- Zustand
- Axios
- i18next
- Lucide icons

## Prerequisites

- Node.js 18+ recommended
- npm 9+
- MongoDB running locally or a reachable MongoDB URI

## Backend setup

1. Install dependencies

```bash
cd backend
npm install
```

2. Create a backend environment file

```bash
cp .env.example .env
```

If there is no .env.example file, create .env manually with:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/food-ordering
JWT_SECRET=change-this-secret
```

3. Start MongoDB locally

```bash
mongod
```

If you use Docker, you can also run the included stack from the repository root:

```bash
docker compose up --build
```

4. Run the backend

```bash
npm run dev
```

The API will be available at http://localhost:5001.

## Frontend setup

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run the development server

```bash
npm run dev
```

The frontend will be available at http://localhost:5173.

3. Build for production

```bash
npm run build
```

## Seed sample data

The repository includes a seed script that populates products and creates an admin user.

```bash
cd backend
npm run seed
```

Default admin credentials created by the seed script:

- Email: admin@foodordering.com
- Password: Admin@123456

## API highlights

- Auth: POST /api/auth/register, POST /api/auth/login
- Products: GET /api/products, POST /api/products
- Orders: POST /api/orders, GET /api/orders/user/my-orders
- Admin: GET /api/admin/stats, GET /api/admin/orders, GET /api/admin/users
- Contact: POST /api/contact

## Testing

Run the available checks from the repository root:

```bash
./run-tests.sh
```

For a pre-demo validation pass:

```bash
./pre-demo-check.sh
```

## Notes

- The frontend uses VITE_API_URL to target the backend. If you run the services separately, set it in the frontend environment before starting Vite.
- The backend listens on port 5001 by default, while the frontend dev server uses Vite on 5173.
- For Docker-based development, the compose file wires the frontend and backend together automatically.
