FROM node:12 AS bootstrap

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ /usr/src
RUN chown -R node:node .

USER node

RUN yarn install

RUN yarn bootstrap

