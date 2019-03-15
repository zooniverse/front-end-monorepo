FROM zooniverse/front-end-monorepo:latest

WORKDIR /usr/src/packages/app-project/

RUN npm run build

ENV PORT=80
EXPOSE 80
CMD [ "npm", "start" ]
