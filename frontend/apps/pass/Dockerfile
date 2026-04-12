FROM node:24-alpine AS build

RUN corepack enable pnpm

WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY packages/ packages/
COPY apps/pass/ apps/pass/

RUN pnpm install --frozen-lockfile

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm turbo build --filter=ruftech-pass

FROM nginx:stable-alpine

COPY apps/pass/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/pass/dist /usr/share/nginx/html

EXPOSE 80
