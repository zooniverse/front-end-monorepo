FROM node:8

RUN mkdir -p /usr/src
WORKDIR /usr/src/
COPY . /usr/src/

RUN npm i -g lerna
RUN lerna link
RUN lerna bootstrap
