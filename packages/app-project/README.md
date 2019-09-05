# Zooniverse Front End - Project

A [Next.js](https://github.com/zeit/next.js) app for handling the project routes, including classification.

## Ops

- [Jenkins](https://jenkins.zooniverse.org/job/Zooniverse%20GitHub/job/front-end-monorepo/)
- [New Relic](https://rpm.newrelic.com/accounts/23619/applications/319037531)

## Getting started

This package should be cloned as part of the [front-end-monorepo](https://github.com/zooniverse/front-end-monorepo).

### Running in development

Starts a development server on port 3000 and a Storybook server on port 9001 by default.

#### Docker
- `docker-compose up` to run a dev server on http://localhost:3000 and the storybook on http://localhost:9001.
- `docker-compose down` to stop the container.
- `docker-compose run --rm dev test` to run the tests.

#### Node/yarn
```sh
yarn dev
yarn storybook
```
### Running in production

Next.js [treats the build and serve tasks as separate steps](https://github.com/zeit/next.js/#production-deployment) when running in production.

The production server is started on port 3000 by default.

#### Docker
```sh
docker-compose run --rm dev build
docker-compose run --rm --service-ports dev start
````

#### Node/yarn
```sh
yarn build
yarn start
```

### Tests

See [Testing](#testing) for more details.

#### Docker
`docker-compose run --rm dev test`.

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
