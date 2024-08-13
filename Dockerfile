# Stage 1: Build the React frontend
FROM node:20-alpine as build

WORKDIR /app/client

# Copy the React app's package.json and package-lock.json files
COPY client/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the React app files
COPY client/ ./

# Build the React app
RUN npm run build

# Stage 2: Set up the backend with the built frontend
FROM node:20-alpine

WORKDIR /app

# Copy the backend's package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend files
COPY . .

# Copy the built frontend files from Stage 1 to the backend's public folder
COPY --from=build /app/client/dist ./client/dist

# Expose the backend port
EXPOSE 8080

# Start the backend server
CMD ["npm", "start"]
