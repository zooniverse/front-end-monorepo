FROM node:8-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install

COPY . /usr/src
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
