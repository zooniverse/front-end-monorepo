# Zooniverse Front End - Project

A [Next.js](https://github.com/zeit/next.js) app for handling the project routes, including classification.

## Ops

- [Jenkins](https://jenkins.zooniverse.org/job/Zooniverse%20GitHub/job/front-end-monorepo/)
- [New Relic](https://rpm.newrelic.com/accounts/23619/applications/319037531)

## Getting started

This package should be cloned as part of the [front-end-monorepo](https://github.com/zooniverse/front-end-monorepo).

## Running in development

Starts a development server on port 3000 and a Storybook server on port 9001 by default. The package `devcert` sets up a local certificate authority to generate self-signed SSL certificates for the `local.zooniverse.org` and `localhost.zooniverse.org` sub-domains. When you run this for the first time on Mac OS, you will be prompted for sudo (Read more at: https://github.com/davewasmer/devcert#security-concerns). In addition, you must have one of those sub-domains [setup](https://stackoverflow.com/c/zooniverse/questions/109) to get past CORS errors when authenticating with Panoptes in your hosts file.

Once the local CA is created and you have the hosts file configured, you'll be able to use one of those subdomains to do local development for projects on and be able to authenticate with Panoptes, i.e. at `https://local.zooniverse.org:3000/projects/brooke/i-fancy-cats` or `https://localhost.zooniverse.org:3000/projects/brooke/i-fancy-cats`

### Docker

- `docker-compose up -d` to run a dev server, in the background, on http://localhost:3000 and the storybook on http://localhost:9001 using `yarn dev` and `yarn storybook` respectively. The `--build` flag can be used to build the container. This builds and runs a local image which matches the Jenkins build except for running behind a proxy. Note: `devcert` is not yet setup for our docker build for local development.
- `docker-compose down` to stop the dev containers.
- `docker-compose run --rm project test` to run the tests.

### Node
```sh
yarn dev
yarn storybook
```

If you want to run the app using a node inspect mode, run `yarn dev:inspect`. Then you can [connect your preferred debugger](https://nextjs.org/docs/advanced-features/debugging#step-2-connect-to-the-debugger) to be able to see the server logs and debug.

### Bundle Analyser
```sh
yarn analyse
```

Run a build with [`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer) enabled. It generates two reports on bundle sizes: the browser bundle and the server bundle.

## Running in production

Next.js [treats the build and serve tasks as separate steps](https://github.com/zeit/next.js/#production-deployment) when running in production.

The production server is started on port 3000 by default.

### Docker

- `docker-compose run --rm project start` to run a webpack production build on http://localhost:3000. The `--build` flag can be used to build the container. This builds and runs a local image which matches the Jenkins build except for running behind a proxy.

### Node
```sh
yarn build
yarn start
```

If you wish to run the app in a production environment with [`devcert`](#running-in-development), then run `yarn start:dev`.

### Tests

See [Testing](#testing) for more details.

#### Docker
Run the whole test suite in the container and exit
```
# run the tests in the docker container
docker-compose run --rm dev test
```
Interactively run the test suite from a bash shell in the container
```
# launch an interactive bash shell in the dev app
docker-compose run --rm --entrypoint="/bin/bash" dev

# change directory to the desired app (app-project)
cd packages/app-project/

# run the tests for this app
yarn test
```

#### Node/yarn
```sh
yarn test
```

## <a name="testing"></a> Testing

  Testing is done by

  - [Mocha](https://mochajs.org/) - test runner
  - [Chai](https://www.chaijs.com/) - BDD/TDD assertion library
  - [Sinon](https://sinonjs.org) - test spies, mocks, and stubs
  - [Enzyme](https://airbnb.io/enzyme/) - testing utility for React

## Technologies

  - @zooniverse/panoptes-js - Panoptes API javascript client
  - @zooniverse/classifier - Zooniverse's classifier
  - @zooniverse/react-components - Zooniverse common React components
  - @zooniverse/grommet-theme - Zooniverse brand Grommet theme
  - [Grommet](https://v2.grommet.io/components) - React UI component library
  - [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree/) - App state built on MobX
  - [mobx-react](https://github.com/mobxjs/mobx-react) - Mobx React bindings
  - [next.js](https://nextjs.org/) - Server-side rendering and routing framework
  - [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
  - [styled-components](https://www.styled-components.com/) - CSS in JS styling library.
