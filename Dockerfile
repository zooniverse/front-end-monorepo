FROM node:8

WORKDIR /usr/src/

ADD . /usr/src

RUN chown -R node:node .

USER node

RUN ./bin/bootstrap.sh
