# Build stage
FROM node:18 as build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code and build the app
COPY . .
RUN npm run build --prod

# Serve the Angular app using nginx
FROM nginx:alpine
COPY --from=build /app/dist/devops-ui /usr/share/nginx/html
EXPOSE 80
