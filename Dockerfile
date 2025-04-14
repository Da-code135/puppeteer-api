# Use official Node.js image
FROM node:20-slim

# Install dependencies required by Chromium
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  libgbm-dev \
  libgconf-2-4 \
  libglib2.0-0 \
  libgtk-3-0 \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set Puppeteer to skip Chromium download and use system Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Run the app
CMD ["npm", "start"]
