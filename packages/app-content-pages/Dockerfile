FROM zooniverse/front-end-monorepo:latest

WORKDIR /usr/src/packages/app-content-pages/

RUN npm run build

ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "start" ]
