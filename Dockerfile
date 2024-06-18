# Stage 1: Build the React app
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with a Node.js server
FROM node:14

# Set working directory
WORKDIR /app

# Copy the build output to the server directory
COPY --from=build /app/build /app/build

# Install a simple Node.js server
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Node.js server to serve the static files
CMD ["serve", "-s", "build"]
