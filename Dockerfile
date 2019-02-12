FROM node:8

WORKDIR /usr/src/

ADD . /usr/src

RUN chown -R node:node .

USER node

RUN npm config set unsafe-perm true
RUN ./bin/bootstrap.sh
