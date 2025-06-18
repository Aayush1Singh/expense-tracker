# Use official Node.js image
FROM node:20.16.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Install serve to serve the build
RUN npm install -g serve

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]