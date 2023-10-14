FROM node:alpine as build

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

