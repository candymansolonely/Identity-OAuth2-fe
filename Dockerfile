# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json & cài dependencies
COPY package*.json ./
RUN npm install --force

# Copy toàn bộ source code
COPY . .

# Build Angular app (output: dist/)
RUN npm run build identity-fe -- --configuration production

# Stage 2: Nginx serve
FROM nginx:1.27-alpine

# Copy file build ra nginx
COPY --from=build /app/dist/identity-fe/browser/ /usr/share/nginx/html

# Copy file cấu hình nginx nếu cần (ví dụ SPA router fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
