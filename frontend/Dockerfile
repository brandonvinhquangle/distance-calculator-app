FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
