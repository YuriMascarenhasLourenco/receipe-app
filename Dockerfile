FROM node:20.18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "build" ]