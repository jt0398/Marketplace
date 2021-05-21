FROM node:12.18.0-alpine3.9

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]