# Stage 1: Build

FROM node:18-alpine AS builder

ARG VITE_GRAPHQL_URL
ENV VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable

COPY index.html tsconfig.node.json tsconfig.json tsconfig.app.json vite.config.ts ./

COPY src ./src

RUN yarn build

# Stage 2: Serve app with nginx

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]