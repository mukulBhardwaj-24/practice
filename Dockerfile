FROM node:24-alpine
LABEL org.opencontainers.image.source=https://github.com/mukulBhardwaj-24/practice

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY public ./public

ENV NODE_ENV=production
ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION
EXPOSE 3000
USER node

CMD ["node", "src/server.js"]