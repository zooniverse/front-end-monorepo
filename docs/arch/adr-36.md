# ADR 36: NextJS App base paths

15 November 2021

## Context

When we launched the NextJS apps, a single domain could only host one NextJS app. We gave each app its own subdomain: `fe-content-pages.zooniverse.org` and `fe-projects.zooniverse.org` then proxied URLs from `www.zooniverse.org` to those domains. Next data requests, on the `/_next` URL, are proxied from `www.zooniverse.org/_next` to `fe-project.zooniverse.org/_next`. We deliberately broke the content pages app, in favour of supporting projects.

[Next 9.5](https://nextjs.org/blog/next-9-5), in July 2020, added support for multiple apps running on the same domain via the [`basePath`](https://nextjs.org/blog/next-9-5#customizable-base-path) config setting.

## Decision

Set base paths of `/about` and `/projects` to the content pages app and project app respectively.
https://github.com/zooniverse/front-end-monorepo/pull/2519

## Consequences

- Static assets and compiled JS can be served via `www.zooniverse.org/about/_next` and `www.zooniverse.org/projects/_next`, taking advantage of our CDN.
- `/about` and `/projects` are removed from the page routes in the NextJS apps, so internal links and redirects have had to be updated throughout the code.
- Our nginx routing has to be configured to pass the `/_next` URLs through to the individual apps, running on kubernetes.


## Status

In progress
