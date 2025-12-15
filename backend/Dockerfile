# Use official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install Chromium and dependencies for Selenium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer/Selenium where to find Chrome
ENV CHROME_BIN=/usr/bin/chromium-browser

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
