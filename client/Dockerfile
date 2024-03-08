# Development stage
FROM node:18-alpine AS development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
