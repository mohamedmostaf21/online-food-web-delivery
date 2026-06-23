# frontend/my-react-app/Dockerfile
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your React app source code
COPY . .

# Expose the standard Vite development server port
EXPOSE 5173

# Start the Vite React app
CMD ["npm", "run", "dev", "--", "--host"]
