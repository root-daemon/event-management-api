FROM node:21

WORKDIR /usr/src/app

COPY ./src .

COPY . .

EXPOSE 3000 

RUN npm install

CMD ["npm", "run", "start:dev"]
