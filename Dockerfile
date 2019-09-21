FROM node:10-alpine

RUN apk add git

WORKDIR /usr/src/app


COPY . /usr/src/app/

RUN npm install -g yarn
RUN yarn version

COPY package.json ./

CMD ["yarn","serve:dist"] 


