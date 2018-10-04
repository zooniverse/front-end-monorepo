FROM node:8

RUN npm i -g lerna

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY package*.json lerna.json ./

COPY packages/app-project/package*.json ./packages/app-project/
COPY packages/lib-async-states/package*.json ./packages/lib-async-states/
COPY packages/lib-auth/package*.json ./packages/lib-auth/
COPY packages/lib-classifier/package*.json ./packages/lib-classifier/
COPY packages/lib-grommet-theme/package*.json ./packages/lib-grommet-theme/
COPY packages/lib-panoptes-js/package*.json ./packages/lib-panoptes-js/
COPY packages/lib-react-components/package*.json ./packages/lib-react-components/

RUN lerna link
RUN lerna bootstrap

COPY ./ .
