FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

RUN npm run build

WORKDIR /app

EXPOSE 3000

CMD [ "node", "index.js" ]