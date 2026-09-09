# ----- Builder -----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines VITE_* at build time
ARG VITE_DEFAULT_USER_ID=
ENV VITE_DEFAULT_USER_ID=${VITE_DEFAULT_USER_ID}
ENV VITE_GRAPHQL_ENDPOINT=/graphql

RUN npm run build

# ----- Serve -----
FROM nginx:1.27-alpine AS runtime
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
