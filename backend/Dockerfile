# backend/Dockerfile
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install only required dependencies
RUN npm install

# Copy the rest of your backend source code
COPY . .

# Expose the port your Node app listens on
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "start"]
