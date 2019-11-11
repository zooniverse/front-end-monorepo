FROM node:10 AS bootstrap

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ /usr/src
RUN chown -R node:node .

USER node

RUN yarn install

RUN yarn bootstrap

FROM node:10 AS production-apps

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY --from=bootstrap /usr/src /usr/src

RUN yarn workspace @zooniverse/fe-project build

RUN yarn workspace @zooniverse/fe-content-pages build
