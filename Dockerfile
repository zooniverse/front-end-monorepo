# Dockerfile containerizes the Next.js apps.
# https://pnpm.io/docker#example-2-build-multiple-docker-images-in-a-monorepo

# alpine is a minimal build of Node. Here it's used to build the FEM libraries and then the Next.js apps.
FROM node:22-alpine AS base

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

# Get access to the commit id.
ARG COMMIT_ID
ENV COMMIT_ID=$COMMIT_ID
ENV SENTRY_RELEASE=$COMMIT_ID

# Get access to the branch name.
ARG GITHUB_REF_NAME
ENV GITHUB_REF_NAME=$GITHUB_REF_NAME

# Opt out of Next.js telemetry.
ENV NEXT_TELEMETRY_DISABLED=1

# Add tokens for Contentful and Sentry.
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_SPACE_ID
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_PROJECT_DSN

# Make the Sentry DSN available at build time (so Next.js client bundle can embed it)
ENV SENTRY_PROJECT_DSN=$SENTRY_PROJECT_DSN

# Set the working directory. -p will create all the necessary parent directories along the way.
RUN mkdir -p /usr/src
WORKDIR /usr/src/

# Add the root package.json.
COPY package.json /usr/src/

# Add the pnpm config.
COPY .npmrc /usr/src/
COPY pnpm-workspace.yaml /usr/src/

# Add the lock file.
COPY pnpm-lock.yaml /usr/src/

# Copy over the code in /packages.
COPY ./packages /usr/src/packages

# Build as `USER: node` instead of the default `root` user https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user.
RUN chown -R node:node .
USER node

# Use BuildKit cache mounts to share the pnpm store between builds.
# Include devDep in this step because Babel is needed to build the Zooniverse libraries.
# The prepare scripts in each package run now too.
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile

# Build the Next.js apps.
RUN echo $COMMIT_ID > /usr/src/packages/app-project/public/commit_id.txt
RUN pnpm --filter @zooniverse/fe-project build
RUN echo $COMMIT_ID > /usr/src/packages/app-root/public/commit_id.txt
RUN pnpm --filter @zooniverse/fe-root build

# `runner` is only the code files needed to run the Next.js apps in production.
FROM base AS runner

# Set env variables to production.
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG SENTRY_PROJECT_DSN
ENV SENTRY_PROJECT_DSN=$SENTRY_PROJECT_DSN

# Set the working directory. -p will create all the necessary parent directories along the way.
RUN mkdir -p /usr/src
WORKDIR /usr/src/

# `Instead of the default `root` user https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user.
RUN chown -R node:node .
USER node

# Copy over the root package.json.
COPY --from=builder /usr/src/package.json /usr/src/package.json

# Copy over the lock file.
COPY --from=builder /usr/src/pnpm-lock.yaml /usr/src/pnpm-lock.yaml

# Copy over the pnpm config.
COPY .npmrc /usr/src/
COPY pnpm-workspace.yaml /usr/src/

# Copy over the code in /packages.
COPY --from=builder /usr/src/packages ./packages

# Install prod deps in the cache and don't run the `prepare` scripts
RUN --mount=type=cache,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

# Delete the following files because they're not needed for runtime.
RUN rm -rf /usr/src/packages/lib-react-components/src
RUN rm -rf /usr/src/packages/lib-content/src
RUN rm -rf /usr/src/packages/lib-classifier/src
RUN rm -rf /usr/src/packages/lib-subject-viewers/src
RUN rm -rf /usr/src/packages/lib-user/src
RUN rm -rf /usr/src/packages/app-project/src
RUN rm -rf /usr/src/packages/app-project/stores
RUN rm -rf /usr/src/packages/app-root/src
