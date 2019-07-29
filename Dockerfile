FROM node:10 as bootstrap

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node

RUN yarn bootstrap

FROM bootstrap as production
RUN yarn build
