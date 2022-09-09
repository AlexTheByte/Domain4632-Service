FROM node:12

COPY . /home/node/app

RUN npm install

CMD [ "npm run start" ]