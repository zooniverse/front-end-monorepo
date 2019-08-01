FROM node:10 AS bootstrap

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node

RUN yarn bootstrap

FROM bootstrap AS production
RUN yarn build
