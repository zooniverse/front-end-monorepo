FROM node:8-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install

COPY . /usr/src
RUN npm run build

ENV PORT=80
EXPOSE 80
CMD [ "npm", "start" ]
