# Panoptes.js API

All of the following examples will be using ES6.

## Configuring your environment

There are currently options for running the client against the staging and production environments, which determine which endpoints are used for requests handled by the module. There are a few different ways to set which you want to use - **staging is the default environment**.

Note: There is a test environment specified in the config file, but it is set to use the same API hosts as staging. The test environment is specifically for automated test running.

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

TODO: Add doc about Authentication header.

Request functions available:

- [GET](#get)
- [POST](#post)
- [PUT](#put)
- [DELETE](#delete)

This library also provides a set of helper functions per Panoptes resource, so it is unlikely you will need to use these base helpers directly unless you need to make a request that isn't already defined by the already existing helper functions. See the [resource helpers](#resource-helpers) section for more information.

### GET

**Function**

``` javascript
panoptes.get(endpoint, query, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- query _(object)_ - an object of request query parameters. Optional.
- host _(string)_ - available to specifiy a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Get many projects:

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
panoptes.post(endpoint, data, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- data _(object)_ - an object of data to send with the request. Optional.
- host _(string)_ - available to specify a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Create a project:

``` javascript
panoptes.get('/projects', { private: true }).then((response) => {
  // Do something with the response
});
```

### PUT

**Function**

``` javascript
panoptes.post(endpoint, data, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
- data _(object)_ - an object of data to send with the request. Optional.
- host _(string)_ - available to specify a different API host. Defaults to the hosts defined in the `config.js` file. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

Update a project:

``` javascript
panoptes.put('/projects/1104', { display_name: 'Super Zoo' }).then((response) => {
  // Do something with the response
});
```

### DELETE

**Function**

``` javascript
panoptes.del(endpoint, host)
```

**Arguments**

- endpoint _(string)_ - the API endpoint for the request. Required.
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

- [Projects](projects.md)

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
