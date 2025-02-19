# Panoptes.js API

All of the following examples will be using ES6.

The client has a base set of request functions built on top of superagent for HTTP GET, POST, PUT, and DELETE. Each function returns a promise that returns the request response. The client does not do error handling and that is up to the consuming script or app either by using a catch on the promise or wrapping async/await in a try/catch statement. The function will error, though, if an argument is an incorrect type or if a parameter is missing that is necessary to the request.

## Request Environment and Host

The environment used cascades from the environment set via query param, then node process environment variable, then to a default of `'staging'`. Depending on the environment, an appropriate Panoptes host is used. For the environments of `'test'`, `'development'`, `'staging'`, the host `'https://panoptes-staging.zooniverse.org/api'` is used. For `'production'`, the host `'https://www.zooniverse.org/api'` is used. 

Each of the request functions will take a query param for `env` which then will return the correctly matched host and use that as the destination to make the HTTP request. The `env` param then gets deleted from the param object before it is then passed along as params to the request itself.

The currently set environment is available from the config file exported as `env`.

### Setting the environment via URL parameter

If you're running the client in the browser, you can use the `env` URL parameter to override the current environment, like this:

```
// Default to staging
http://localhost:3000

// Switch to production
http://localhost:3000?env=production
```

If you're running an app using hash history, you'll need to add `?env=` before the `#`, like this:

```
http://localhost:3000?env=production#/classify
```

Then in your app, you'll have to retrieve the environment set in the window.location.search string and pass the environment into the request in the query params argument. A package like `query-string` is helpful for parsing the search string.


``` javascript
import panoptes from '@zoonivere/panoptes-js';
import queryString from 'query-string';

const { env } = queryString.parse(window.location.search);
const response = panoptes.get('/projects', { env })
```

### Setting the environment via `PANOPTES_ENV`

This lets you choose a Panoptes environment in isolation from your Node environment, so you can use the production Panoptes API in development, for example.

```
PANOPTES_ENV=production npm run dev
```

This supersedes the `NODE_ENV` environment variable.

### Setting the environment via `NODE_ENV`

This is usually used for build processes before deployment.

```
NODE_ENV=production npm run build
```

### API host configurations

The available host configurations are:

``` javascript
{
  test: {
    host: 'https://panoptes-staging.zooniverse.org/api',
    oauth: 'https://panoptes-staging.zooniverse.org'
  },
  development: {
    host: 'https://panoptes-staging.zooniverse.org/api',
    oauth: 'https://panoptes-staging.zooniverse.org'
  },
  staging: {
    host: 'https://panoptes-staging.zooniverse.org/api',
    oauth: 'https://panoptes-staging.zooniverse.org'
  },
  production: {
    host: 'https://www.zooniverse.org/api',
    oauth: 'https://panoptes.zooniverse.org'
  }
}
```

## Base helpers

A base set of HTTP request functions are available from the `panoptes.js` file that set a standard set of headers and build the request URL for you. All of the request functions are preset with the following request headers:

- `Content-Type: application/json`
- `Accept: application/vnd.api+json; version=1`

All of the base helpers will take an `authorization` string parameter that will set as the `Authorization` header. This string should include the type and token, i.e. `Bearer 12345abcde`. See the docs for the specific helper you want to use for exact usage. The resource specific helpers may or may not take an `authorization` parameter depending on if it should or could be an authenticated request.

Request functions available:

- [GET](#get)
- [POST](#post)
- [PUT](#put)
- [DELETE](#delete)

This library also provides a set of helper functions per Panoptes resource, so it is unlikely you will need to use these base helpers directly unless you need to make a request that isn't already defined by the already existing helper functions. See the [resource helpers](#resource-helpers) section for more information.

### GET

**Function**

``` javascript
panoptes.get(endpoint, query, authorization, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- query _(object)_ - an object of request query parameters. Optional.
- authorization _(string)_ - a string of the authorization type and token, i.e. `'Bearer 12345abcde'`. Optional.
- host _(string)_ - available to specifiy a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Get next page of projects:

``` javascript
panoptes.get('/projects', { page: 2 }).then((response) => {
  // Do something with the response
});
```

Get a single project:

``` javascript
panoptes.get('/projects/1104', { include: 'avatar,background,owners' }).then((response) => {
  // Do something with the response
});
```

### POST

**Function**

``` javascript
panoptes.post(endpoint, data, authorization, query, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- data _(object)_ - an object of data to send with the request. Optional.
- authorization _(string)_ - a string of the authorization type and token, i.e. `'Bearer 12345abcde'`. Optional.
- query _(object)_ - an object of query parameters to send with the request. Optional.
- host _(string)_ - available to specify a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Create a project:

``` javascript
panoptes.post('/projects', { private: true }).then((response) => {
  // Do something with the response
});
```

### PUT

**Function**

``` javascript
panoptes.put(endpoint, data, authorization, query, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- data _(object)_ - an object of data to send with the request. Required.
- authorization _(string)_ - a string of the authorization type and token, i.e. `'Bearer 12345abcde'`. Optional.
- query _(object)_ - an object of query parameters to send with the request. Optional.
- host _(string)_ - available to specify a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Update a project:

``` javascript
panoptes.put('/projects/1104', { projects: { display_name: 'Super Zoo' }}, { authorization: 'Bearer 12345' }).then((response) => {
  // Do something with the response
});
```

### DELETE

**Function**

``` javascript
panoptes.del(endpoint, authorization, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- authorization _(string)_ - a string of the authorization type and token, i.e. `'Bearer 12345abcde'`. Optional.
- host _(string)_ - available to specify a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Delete a project:

``` javascript
panoptes.del('/projects/1104').then((response) => {
  // Do something with the response
});
```

## Resource helpers

Using helper functions for a defined Panoptes resource in a React component. These resources have functions defined:

- Collections
- Projects
- Subjects
- Tutorials

A readme on specific use is available in the folder for each resource type.

The API for resource helpers will include:

- **get** `projects.get()`
- **create** `projects.create()`
- **update** `project.update()`
- **delete** `projects.delete()`
- **endpoint** - a constant of the resource REST endpoint
- **mocks** - mocks or factories used for tests, usually including:
  - **responses** - constants for typical API responses
  - **resources** - constants for typical API resources
- Any additional common requests or helper functions. See specific documentation for that resource.

An example in a React component:

``` javascript
import React from 'react';
import { projects } from '@zooniverse/panoptes-js';

class MyComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      project: {}
    };
  }

  componentDidMount() {
    projects.get({ id: '1104' }).then((response) => {
      this.setState({ project: response.body.projects[0] });
    }).catch((error) => {
      if (error.statusCode === 404) return null; // If you don't care about catching a 404
    });
  }

  render() {
    if (Object.keys(this.state.project).length === 0) {
      return (<p>Loading...</p>);
    }

    return (
      <div>
        <h1>{this.state.project.display_name}</h1>
      </div>
    )
  }
}
```