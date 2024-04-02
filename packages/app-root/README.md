# Zooniverse Front End - Root

A [Next.js](https://nextjs.org/) app for handling all routes, including `/projects`, `/users`, `/about`, `/groups`.

## Getting started

This package should be cloned as part of the [front-end-monorepo](https://github.com/zooniverse/front-end-monorepo).

## Running in development

Starts a development server on port 3000.

In addition, you must have the local sub-domain [setup](https://stackoverflow.com/c/zooniverse/questions/109) to get past CORS errors when authenticating with Panoptes in your hosts file.

Once you have the hosts file configured, you'll be able to use one of those subdomains to do local development for projects on and be able to authenticate with Panoptes, i.e. at `https://local.zooniverse.org:3000/users` or `https://localhost.zooniverse.org:3000/users`.

### Docker

- `docker-compose up -d` to run a dev server, in the background, on http://localhost:3000 using `yarn dev`. The `--build` flag can be used to build the container. This builds and runs a local image which matches the GitHub Action build except for running behind a proxy. Note: `devcert` is not yet setup for our docker build for local development.
- `docker-compose down` to stop the dev containers.
<!-- - `docker-compose run --rm root test` to run the tests. -->

### Node

```sh
yarn dev
```

## Running in production

[NextJS Production Checklist](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist)

The production server is started on port 3000 by default.

### Docker

- `docker-compose run --rm root start` to run a webpack production build on http://localhost:3000. The `--build` flag can be used to build the container. This builds and runs a local image which matches the GitHub Action build except for running behind a proxy.

### Node

```sh
yarn build
yarn start
```

### Analyze bundle sizes

This app has `@next/bundle-analyzer` as a dev dependency. To use it, run `ANALYZE=true yarn build`.

## Technologies

- @zooniverse/panoptes-js - Panoptes API javascript client
- @zooniverse/react-components - Zooniverse common React components
- @zooniverse/grommet-theme - Zooniverse brand Grommet theme
- [Grommet](https://v2.grommet.io/components) - React UI component library
- [next.js](https://nextjs.org/) - Server-side rendering and routing framework
- [React.js](https://reactjs.org/) - Component, virtual DOM based javascript library
- [styled-components](https://www.styled-components.com/) - CSS in JS styling library.
