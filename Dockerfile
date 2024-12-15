# Etapa de desenvolvimento
FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


# Etapa de produção
FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
