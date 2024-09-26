FROM node:21

WORKDIR /usr/src/app

COPY ./src .

COPY . .

RUN npm install

 CMD ["npm", "run", "start:dev"]