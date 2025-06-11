FROM node:22-alpine AS builder

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3
RUN npm install --quiet node-gyp -g

WORKDIR /app
COPY package.json .
COPY .npmrc .

COPY . .
RUN corepack enable
RUN corepack prepare pnpm@10.6.0 --activate

RUN pnpm install
RUN pnpm build

# => Run container
FROM nginx:1.25.5-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
COPY deployment/cert.pem /etc/nginx/certs/cert.pem
COPY deployment/key.pem /etc/nginx/certs/key.pem
COPY --from=builder /app/build/client /usr/share/nginx/html/

# Default port exposure
EXPOSE 443

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]