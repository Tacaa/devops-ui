# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Run stage
FROM nginx:alpine
# Overwrite default site config with our SPA config:
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy Angular build artifacts
COPY --from=build /app/dist/devops-ui /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
