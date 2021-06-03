FROM node:14-alpine

ARG COMMIT_ID
ENV COMMIT_ID=$COMMIT_ID

ARG PANOPTES_ENV=production
ENV PANOPTES_ENV=$PANOPTES_ENV

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

ENV NEXT_TELEMETRY_DISABLED=1

ARG CONTENTFUL_ACCESS_TOKEN

ARG CONTENTFUL_SPACE_ID

ARG CONTENT_ASSET_PREFIX
ENV CONTENT_ASSET_PREFIX=$CONTENT_ASSET_PREFIX

ARG SENTRY_CONTENT_DSN
ENV SENTRY_CONTENT_DSN=$SENTRY_CONTENT_DSN

ARG SENTRY_PROJECT_DSN
ENV SENTRY_PROJECT_DSN=$SENTRY_PROJECT_DSN

ARG PROJECT_ASSET_PREFIX
ENV PROJECT_ASSET_PREFIX=$PROJECT_ASSET_PREFIX

RUN mkdir -p /usr/src

WORKDIR /usr/src/

ADD package.json /usr/src/

ADD yarn.lock /usr/src/

COPY .yarn /usr/src/.yarn

ADD .yarnrc /usr/src/

COPY ./packages /usr/src/packages

RUN chown -R node:node .

USER node

RUN yarn install --production=false --frozen-lockfile

RUN yarn workspace @zooniverse/react-components build

RUN yarn workspace @zooniverse/classifier build

RUN yarn workspace @zooniverse/fe-content-pages build

RUN yarn workspace @zooniverse/fe-project build
