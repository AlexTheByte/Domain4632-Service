FROM node:12

WORKDIR /usr/src/app

VOLUME . .

CMD [ "node", "dist/main.js" ]