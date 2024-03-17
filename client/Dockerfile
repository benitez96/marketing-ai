# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable pnpm && pnpm i

COPY . .
