FROM node:8

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node

RUN ./bin/bootstrap.sh
