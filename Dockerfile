FROM node:20-alpine AS base

ARG COMMIT_ID
ENV COMMIT_ID=$COMMIT_ID
ENV SENTRY_RELEASE=$COMMIT_ID

ARG GITHUB_REF_NAME
ENV GITHUB_REF_NAME=$GITHUB_REF_NAME

ARG PANOPTES_ENV=production
ENV PANOPTES_ENV=$PANOPTES_ENV

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir -p /usr/src

WORKDIR /usr/src/

RUN chown -R node:node .

ONBUILD COPY --chown=node:node package.json yarn.lock lerna.json .yarnrc /usr/src/

ONBUILD COPY --chown=node:node .yarn /usr/src/.yarn

ONBUILD USER node

FROM base AS builder

ARG CONTENTFUL_ACCESS_TOKEN

ARG CONTENTFUL_SPACE_ID

ARG SENTRY_AUTH_TOKEN

COPY --chown=node:node ./packages /usr/src/packages

RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn install --production=false --frozen-lockfile --ignore-scripts
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/react-components build:es6
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/subject-viewers build:es6
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/content build:es6
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/classifier build:es6
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/user build:es6
RUN echo $COMMIT_ID > /usr/src/packages/app-project/public/commit_id.txt
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/fe-project build
RUN echo $COMMIT_ID > /usr/src/packages/app-root/public/commit_id.txt
RUN --mount=type=cache,id=fem-builder-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn workspace @zooniverse/fe-root build

FROM base AS runner

COPY --from=builder --chown=node:node /usr/src/packages ./packages

RUN --mount=type=cache,id=fem-runner-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

RUN rm -rf /usr/src/packages/lib-react-components/src
RUN rm -rf /usr/src/packages/lib-content/src
RUN rm -rf /usr/src/packages/lib-classifier/src
RUN rm -rf /usr/src/packages/lib-subject-viewers/src
RUN rm -rf /usr/src/packages/lib-user/src
RUN rm -rf /usr/src/packages/app-project/src
RUN rm -rf /usr/src/packages/app-project/stores
RUN rm -rf /usr/src/packages/app-root/src
