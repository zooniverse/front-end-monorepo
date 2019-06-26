FROM node:10

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node
ENV NODE_ENV production
RUN ./bin/bootstrap.sh
