FROM zooniverse/front-end-monorepo:latest

WORKDIR /usr/src/packages/app-content-pages/

RUN yarn build

ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "start" ]
