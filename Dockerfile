FROM node:16-alpine as builder

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

RUN mkdir -p /usr/src

WORKDIR /usr/src/

ADD package.json /usr/src/

ADD yarn.lock /usr/src/

COPY .yarn /usr/src/.yarn

ADD .yarnrc /usr/src/

ADD lerna.json /usr/src/

COPY ./packages /usr/src/packages

RUN chown -R node:node .

USER node

RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn install --production=false --frozen-lockfile
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/react-components build
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/classifier build
RUN echo $COMMIT_ID > /usr/src/packages/app-content-pages/public/commit_id.txt
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/fe-content-pages build
RUN echo $COMMIT_ID > /usr/src/packages/app-project/public/commit_id.txt
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/fe-project build

FROM node:16-alpine as runner

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

COPY --from=builder /usr/src/packages ./packages

RUN --mount=type=cache,id=fem-runner-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

RUN rm -rf /usr/src/packages/lib-react-components/src
RUN rm -rf /usr/src/packages/lib-classifier/src
RUN rm -rf /usr/src/packages/app-content-pages/src
RUN rm -rf /usr/src/packages/app-project/src
RUN rm -rf /usr/src/packages/app-project/stores
