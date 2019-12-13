# @zooniverse/auth

An authentication library for the Panoptes API which provides tokens for making authenticated requests.

## Example

```js
import createClient from '@zooniverse/auth

const client = createClient({
  clientAppID: 'someClientAppID',
  hostUrl: 'http://enterprise.com'
})

async function login () {
  const user = {
    login: 'jean-luc@picard.com'
    password: 'TeaEarlGreyHot'
  }
  return client.signIn(user)
}

// Use this to make an authenticated request, like getting the user object!
const accessToken = await login()
```

## Testing

Tests are kept in the `/test` directory, which allows us to keep all test-related code in one place, rather than having unit tests with the code and functional tests in another directory.

### Unit tests

The unit tests test individual methods, and are kept in the `/test/unit` directory.

```sh
yarn test:unit
```

### Functional tests

The functional (or end-to-end) tests treat the client as a black box, and are kept in the `/test/functional` directory. There are two types of functional testing available:

#### Isolation

The test suite is run against the client in isolation, with requests to the API mocked by `nock`.

```sh
yarn test:functional:node
```

#### Staging

Performs the same functional test suite as `isolation`, but against the live staging API.

```sh
yarn test:functional:node:staging
```
