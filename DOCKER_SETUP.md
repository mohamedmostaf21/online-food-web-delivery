# 🐳 Docker Deployment Guide

## Project Structure for Docker

```
online_food_web_app/
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── server.js
│   └── ...
│
├── frontend/
│   ├── my-react-app/
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── ...
│
├── docker-compose.yml
└── README.md
```

## Prerequisites

Make sure you have installed:
- **Docker**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Usually included with Docker Desktop

## Quick Start

### 1️⃣ Build and Run with Docker Compose

Navigate to the project root directory and run:

```bash
docker-compose up --build
```

This command will:
- Build the backend Docker image from `backend/Dockerfile`
- Build the frontend Docker image from `frontend/my-react-app/Dockerfile`
- Start both services with networking enabled
- The backend service name becomes `backend` for internal communication
- The frontend service name becomes `frontend` for internal communication

### 2️⃣ Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Frontend to Backend Communication**: `http://backend:5000` (inside Docker network)

### 3️⃣ View Logs

To see logs from both services:

```bash
docker-compose logs -f
```

To see logs from a specific service:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 4️⃣ Stop Services

To stop all running containers:

```bash
docker-compose down
```

To stop and remove volumes:

```bash
docker-compose down -v
```

---

## 🔧 Service Configuration

### Backend Service
- **Container Name**: `online_food_backend`
- **Port**: 5000 (exposed from container to localhost)
- **Environment**: Development mode with hot-reload
- **Node Version**: 20-alpine (lightweight)
- **Volumes**: 
  - Code volume: `./backend:/usr/src/app` (for hot-reload)
  - Node modules: `/usr/src/app/node_modules` (to prevent overwriting)

### Frontend Service (React + Vite)
- **Container Name**: `online_food_frontend`
- **Port**: 5173 (Vite dev server port)
- **Environment**: Development mode with hot-reload
- **Node Version**: 20-alpine (lightweight)
- **Features**: 
  - CHOKIDAR_USEPOLLING enabled for Docker file watching
  - Vite `--host` flag to make dev server accessible from host
  - Depends on backend service (waits for backend to start)
- **Volumes**: 
  - Code volume: `./frontend/my-react-app:/usr/src/app`
  - Node modules: `/usr/src/app/node_modules`

### Network
- **Network Type**: Bridge network (`food_network`)
- **Benefits**: Services can communicate using service names
- **Example**: Frontend can reach backend at `http://backend:5000`

---

## 📝 Environment Variables

The services use the following environment variables:

**Backend** (`backend` service):
```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/online_food
```

**Frontend** (`frontend` service):
```env
CHOKIDAR_USEPOLLING=true
VITE_API_URL=http://backend:5000
```

To override these, create a `.env` file in the project root:

```bash
# .env file example
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/online_food
NODE_ENV=production
```

---

## 🔄 Hot Reloading

Both services support hot reloading during development:

- **Backend**: Node.js will restart automatically when you modify files in `./backend`
- **Frontend**: Vite will refresh the browser when you modify files in `./frontend/my-react-app/src`

Just save your changes, and the containers will automatically update!

---

## 🛑 Troubleshooting

### 1. Port Already in Use
If ports 5000 or 5173 are already in use, either:
- Stop the conflicting services
- Or modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "5001:5000"  # Maps your port 5001 to container 5000
  - "5174:5173"  # Maps your port 5174 to container 5173
```

### 2. Module Not Found
If you get module errors:
```bash
docker-compose down -v  # Remove containers and volumes
docker-compose up --build  # Rebuild from scratch
```

### 3. Can't Reach Backend from Frontend
Make sure the frontend is using the correct service name:
```
http://backend:5000  (inside Docker network)
```

Instead of:
```
http://localhost:5000  (this won't work inside container)
```

### 4. MongoDB Connection Issues
If using MongoDB in Docker, uncomment the `mongo` service in `docker-compose.yml`:

```yaml
mongo:
  image: mongo:7-alpine
  container_name: online_food_mongodb
  ports:
    - "27017:27017"
```

Then update `MONGO_URI` to `mongodb://mongo:27017/online_food`

---

## 📦 Docker Commands Reference

```bash
# Build images without starting
docker-compose build

# Start services in background
docker-compose up -d

# Build and start services
docker-compose up --build

# Stop services
docker-compose stop

# Remove stopped containers
docker-compose rm

# View running containers
docker-compose ps

# Access service shell
docker exec -it online_food_backend sh
docker exec -it online_food_frontend sh

# View service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Remove everything (containers, volumes, networks)
docker-compose down -v
```

---

## 🚀 Production Deployment

For production deployment, you may want to:

1. **Use multi-stage builds** for the frontend to reduce image size
2. **Use Nginx** instead of Vite dev server for the frontend
3. **Set NODE_ENV to production** in backend
4. **Use environment-specific docker-compose files**:

```bash
docker-compose -f docker-compose.prod.yml up
```

5. **Use Docker Hub or private registries** to push images

---

## ✅ Verification Checklist

- [ ] Docker Desktop is installed and running
- [ ] `docker --version` shows version info
- [ ] `docker-compose --version` shows version info
- [ ] Both backend and frontend services are running
- [ ] Frontend accessible at http://localhost:5173
- [ ] Backend API accessible at http://localhost:5000
- [ ] No port conflicts or errors in logs
- [ ] Hot reloading works when files are modified
- [ ] All features of the app work normally in Docker

---

Happy deploying! 🎉
