## Build the Typescript
FROM node:14 AS build

WORKDIR /usr/src/app

# Install the dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Compile the source
COPY . ./
RUN npm run build

## Run the server
FROM node:14 AS server

WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

# Copy the code
COPY --from=build /usr/src/app/dist/ ./dist/
COPY views/ ./views/

EXPOSE 3141
ENTRYPOINT ["node", "dist/index.js"]
