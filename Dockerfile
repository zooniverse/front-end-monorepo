FROM node:8

RUN npm i -g lerna

RUN mkdir -p /usr/src
WORKDIR /usr/src/
COPY . /usr/src/

RUN lerna link
RUN lerna bootstrap
