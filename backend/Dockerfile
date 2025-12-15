# Use official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
