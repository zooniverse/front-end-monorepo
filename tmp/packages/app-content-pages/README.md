# Zooniverse Front End - Content Pages

A [Next.js](https://github.com/zeit/next.js) app for handling the content pages.

## Ops

- [Jenkins](https://jenkins.zooniverse.org/job/Zooniverse%20GitHub/job/front-end-monorepo/)
- [New Relic](https://rpm.newrelic.com/accounts/23619/applications/319037799)

## Getting started

This package should be cloned as part of the [front-end-monorepo](https://github.com/zooniverse/front-end-monorepo).

You'll need to create a `.env` file containing the space ID and access token for Contentful:

```sh
cp env-default .env
```

To get the credentials, go to https://app.contentful.com/spaces/jt90kyhvp0qv/api/keys (login credentials are in Passbolt), and copy the Space ID and Content Delivery API token from "Testing".

### Running in development

```sh
npm run dev
```

Starts a development server on port 3000 by default.

**Note:** `PANOPTES_ENV` is set to `production` when running `npm run dev`. This is so the project avatars for publications can be fetched from the production API. If `PANOPTES_ENV` is set to anything else, the fallback image will show.


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

### Configuration

The following environment variables are available:

- `DEFAULT_MAX_AGE` (int, default: 60) - default max age for asset caching in seconds
- `ENABLE_CACHE_CONTROL` (boolean, default: false) - toggle setting of the `cache-control` `max-age` header
- `JS_MAX_AGE` (int, default: 31536000) - default max age for `.js` asset caching in seconds
