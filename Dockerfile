# A three-stage docker build, based on
# https://calvinf.com/blog/2023/11/10/node-js-20-yarn-4-and-next-js-on-docker/

############################
# Stage 1: Base Node Alpine image for both the builder and runner stages
FROM node:20-alpine AS base

# Latest Git commit hash
ARG COMMIT_ID
ENV COMMIT_ID=$COMMIT_ID
ENV SENTRY_RELEASE=$COMMIT_ID

# GitHub branch name
ARG GITHUB_REF_NAME
ENV GITHUB_REF_NAME=$GITHUB_REF_NAME

# Panoptes API: staging | production (default)
ARG PANOPTES_ENV=production
ENV PANOPTES_ENV=$PANOPTES_ENV

# Webpack build mode: development | production (default)
# https://webpack.js.org/configuration/mode/
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# container deployment environment: development | branch | staging | production (default)
ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

# disable Next.js telemetry
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Install everything into /usr/src.
RUN mkdir -p /usr/src

WORKDIR /usr/src/

# Change the user and group from root to node.
RUN chown -R node:node .

# Copy the package file, lock file, Yarn config, and lerna config
# into any image built from this image.
ONBUILD COPY --chown=node:node package.json yarn.lock lerna.json .yarnrc /usr/src/

# Copy the .yarn directory into any image built from this image.
ONBUILD COPY --chown=node:node .yarn /usr/src/.yarn

# Run all commands as the node user, in any image built from this image.
ONBUILD USER node

#########################
# Stage 2: Builder stage
FROM base AS builder

# Add build secrets.
# NB. GitHub warns that ARG should not be used for sensitive data.
ARG CONTENTFUL_ACCESS_TOKEN

ARG CONTENTFUL_SPACE_ID

ARG SENTRY_AUTH_TOKEN

# Copy the source packages into the image.
COPY --chown=node:node ./packages /usr/src/packages

# Install dependencies and bootstrap the Next.js apps.
# The monorepo packages depend on each other,
# so must be built in a specific order.
# Set YARN_CACHE_FOLDER=/home/node/.yarn.
# Cache the Yarn cache as fem-builder-yarn across builds.
# (Why is this repeated for every layer?)
# https://classic.yarnpkg.com/lang/en/docs/cli/cache/#toc-change-the-cache-path-for-yarn
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

#########################
# Stage 3: Runner stage
# This image is deployed to Kubernetes.
FROM base AS runner

# Copy the built packages into the image.
COPY --from=builder --chown=node:node /usr/src/packages ./packages

# Install only production dependencies.
# Cache the Yarn cache as fem-runner-yarn across builds.
RUN --mount=type=cache,id=fem-runner-yarn,uid=1000,gid=1000,target=/home/node/.yarn YARN_CACHE_FOLDER=/home/node/.yarn yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

# Remove all the source code.
# Any other files that aren't needed to run the Next.js apps
# should be removed here too.
RUN rm -rf /usr/src/packages/lib-react-components/src
RUN rm -rf /usr/src/packages/lib-content/src
RUN rm -rf /usr/src/packages/lib-classifier/src
RUN rm -rf /usr/src/packages/lib-subject-viewers/src
RUN rm -rf /usr/src/packages/lib-user/src
RUN rm -rf /usr/src/packages/app-project/src
RUN rm -rf /usr/src/packages/app-project/stores
RUN rm -rf /usr/src/packages/app-root/src
