FROM node:20-alpine AS builder

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

ARG CONTENTFUL_ACCESS_TOKEN

ARG CONTENTFUL_SPACE_ID

ARG SENTRY_AUTH_TOKEN

RUN mkdir -p /usr/src

WORKDIR /usr/src/

ADD package.json /usr/src/

COPY .yarn /usr/src/.yarn

ADD .yarnrc /usr/src/

ADD lerna.json /usr/src/

COPY ./packages /usr/src/packages

ADD yarn.lock /usr/src/

RUN chown -R node:node .

USER node

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

FROM node:20.18-alpine AS runner

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN mkdir -p /usr/src

WORKDIR /usr/src/

RUN chown -R node:node .

USER node

COPY --from=builder /usr/src/package.json /usr/src/package.json

COPY --from=builder /usr/src/.yarn /usr/src/.yarn

COPY --from=builder /usr/src/.yarnrc /usr/src/.yarnrc

COPY --from=builder /usr/src/packages ./packages

COPY --from=builder /usr/src/yarn.lock /usr/src/yarn.lock

RUN --mount=type=cache,id=fem-runner-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

RUN rm -rf /usr/src/packages/lib-react-components/src
RUN rm -rf /usr/src/packages/lib-content/src
RUN rm -rf /usr/src/packages/lib-classifier/src
RUN rm -rf /usr/src/packages/lib-subject-viewers/src
RUN rm -rf /usr/src/packages/lib-user/src
RUN rm -rf /usr/src/packages/app-project/src
RUN rm -rf /usr/src/packages/app-project/stores
RUN rm -rf /usr/src/packages/app-root/src
