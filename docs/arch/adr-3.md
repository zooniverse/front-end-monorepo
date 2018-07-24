# ADR 3: Designing a new auth client

July 24, 2018

## Context

As part of the development of Panoptes.js, we came across the issue of authentication. Currently, the auth library is part of [panoptes-javascript-client](https://github.com/zooniverse/panoptes-javascript-client), and provides support for first-party login and OAuth2 (for custom front ends).

However, the current client has the following drawbacks:

- It only provides the relevant API methods and no front end components, which need to be written by the library consumer.
- As a result, the login experience is slightly different across each project.
- The OAuth client has been buggy in the past.

## Decision

To write a separate auth library. This will expose:

- the API helpers for the auth process, if the consumer wants/needs to use them.
- a standalone React app, which will provide a consistent set of login, registration, forgotten password and account deletion forms.
- an observable for getting the user object

The library will reuse the existing first-party login code, and wrap another package to provide OAuth support, such as [js-client-oauth2](https://github.com/mulesoft/js-client-oauth2)


## Status

Proposed

## Consequences

- As a standalone React app, consumers won't be tied in to using React in order to use the front end components.
- As a separate package, it allows us to keep Panoptes.js as a pure set of functions. However, Panoptes.js does need to perform authenticated requests, which will be implemented as accepting an auth parameter for each one. To simplify that, we'll write a wrapper for Panoptes.js to maintain the auth state and provide it to each request as required.
