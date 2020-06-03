FROM node:14-stretch

WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

# Copy the code
COPY dist/ ./dist/
COPY views/ ./views/
COPY data/ ./data/

# Ensure that sourcemaps work correctly
ENV NODE_OPTIONS=--enable-source-maps
ENV NODE_ENV=production

ENTRYPOINT ["node", "dist/index.js"]
