FROM zooniverse/front-end-monorepo:latest

ARG ASSET_PREFIX
ENV ASSET_PREFIX=$ASSET_PREFIX

ARG SENTRY_DSN
ENV SENTRY_DSN=$SENTRY_DSN

ENV NODE_ENV production
ENV PANOPTES_ENV production
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_ENV production

WORKDIR /usr/src/packages/app-content-pages/

ENV PORT 3000
EXPOSE 3000

CMD [ "yarn", "start" ]