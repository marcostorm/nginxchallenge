FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

ENV DOCKERIZE_VERSION v0.8.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

CMD ["node", "server.js"]
