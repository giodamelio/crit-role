FROM node:14

WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

# Copy the code
COPY src/ ./src/
COPY views/ ./views/

EXPOSE 3141
ENTRYPOINT ["node", "src/index.js"]
