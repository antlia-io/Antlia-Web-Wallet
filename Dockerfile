FROM node:10-alpine

WORKDIR /usr/src/app


COPY . /usr/src/app/

RUN npm install -g yarn
RUN yarn version

COPY package.json ./
RUN npm install
CMD [ "yarn", "serve" ]
