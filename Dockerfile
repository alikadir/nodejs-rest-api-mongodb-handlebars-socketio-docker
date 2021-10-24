FROM node:17.0.1-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm i --only=production && npm cache clean --force
COPY . /app
CMD node index.js
EXPOSE 8080
