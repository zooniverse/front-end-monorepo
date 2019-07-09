FROM zooniverse/front-end-monorepo:latest

WORKDIR /usr/src/packages/app-project/

RUN yarn build

ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "start" ]
