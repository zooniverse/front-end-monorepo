# ADR 21: Auth Client

Created: December 5, 2019

## Context

Authentication is currently handled by the existing auth client, which is bundled up as part of [panoptes-javascript-client](https://github.com/zooniverse/panoptes-javascript-client/).

While working on [#1306](https://github.com/zooniverse/front-end-monorepo/issues/1306), I ran into a few issues with it:

- Environment variables (env vars) aren't available on the client side. Next.js does have a method for sharing config on both the server and client, but it's academic since:
- The only way to configure `panoptes-javascript-client` is _directly_ via env vars, or by passing in query parameters to the URL. We can't get env vars on the client, so that's out, and query parameters become unwieldy very quickly.

This hasn't been an issue when working with Single Page Apps, since env vars are baked in at transpilation time by the build tools. At the moment, we just avoid the problem by having the staging build of the project use the production API.

However, for the Next.js-based apps we're building right now, we need a different approach, and being able to configure the auth client from a single source of truth is required. Ideally, this would be source-agnostic: the client should be able to be configured from a config file, [env vars](https://12factor.net/config), or whatever you want, but that's up to the consuming app to decide.

## Decision

Rewrite the existing auth client as a separate package. The new client will follow a pattern that's well established in the wider ecosystem: the package exposes a function which accepts a config object as an argument and returns a configured client.

The client is purely for authentication, and will expose the methods for registration, sign in, sign out, and getting bearer tokens.

The [existing config](https://github.com/zooniverse/panoptes-javascript-client/blob/master/lib/config.js) will be turned into a separate package. Config settings can be imported wholesale from that for convenience.

For use in the rebuild apps, we would create a `ConfigStore` which we populate with the relevant config settings. The `ConfigStore` snapshot is then used to rehydrate the client, so we get a single source of truth on both client and server.

## Status

Proposed

## Consequences

- I'm not planning to add in query param support to the client. This can be added in to the consuming app if required.
- There are a few methods, such as `unsubscribeEmail`, which I don't think are being used. These can be added in later if required.
