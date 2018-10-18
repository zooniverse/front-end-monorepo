FROM node:8

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node

RUN npm install
RUN ./node_modules/.bin/lerna link
RUN ./node_modules/.bin/lerna bootstrap --no-ci --loglevel verbose
