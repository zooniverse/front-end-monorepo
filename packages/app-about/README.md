# Zooniverse Front End - About

A [Next.js](https://github.com/zeit/next.js) app for handling the about routes

## Getting started

This package should be cloned as part of the [front-end-monorepo](https://github.com/zooniverse/front-end-monorepo).

You'll need to create a `.env` file containing the secrets for Contentful:

```sh
cp env-default .env
```

...and add the secrets from Passbolt.

### Running in development

```sh
npm run dev
```

Starts a development server on port 3000 by default.

### Running in Storybook

```sh
npm run storybook
```

Starts a Storybook server on port 9001 by default.

### Running in production

```sh
npm run build
npm run start
```

Next.js [treats the build and serve tasks as separate steps](https://github.com/zeit/next.js/#production-deployment) when running in production.

The production server is started on port 3000 by default.

### Tests

```sh
npm run test
```

See [Testing](#testing) for more details.

## <a name="testing"></a> Testing

Tests are run by [Mocha](https://mochajs.org/), using the [BDD](https://mochajs.org/#bdd) interface.

Assertions are provided by the [Chai](http://www.chaijs.com/) assertion library.
