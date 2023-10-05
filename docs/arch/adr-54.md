# app-root

## Context
Upon the release of Next.js 13, we've decided to build app-root with the App Router - utilizing Next.js 13's ability to modularize the Zooniverse website. For instance, when a volunteer visits an /about page, the Javascript bundle their browser downloads should not contain /projects or any other unrelated route's code. This decision is also related to the addition and development of `/users` stats pages and `/groups` stats pages (ADRs 51 - 53).

## Decision
app-root includes
- The Zooniverse homepage components
- User auth (client-side)
- Layout with ZooHeader and ZooFooter
- App Router file structure for `/`, `/projects`, `/about`, `/users`, `/groups`, and more in the future.

## Consequences

FEM currently consists of two deployed apps: app-project and app-content-pages. Introducing app-root will put FEM on the path of a refactor app-project --> lib-project and app-content-pages --> lib-content-pages. Rather than each Zooniverse route existing as its own app, app-root will pull in code from the appropriate libraries (such as lib-user or lib-project). app-root will handle traffic for the domain root, https://zooniverse.org, so that it can serve the homepage.

User auth: In app-root we’re going to build a logged out homepage on the server, and then do client-side auth with the existing lib-panoptes-js to show user-specific content.

Common libraries used in FEM are Grommet, styled-components, mobx, storybook, mocha, and next-i18next. app-root is the first FEM app to use the Next.js App Router, and Next.js has become very opinionated about defaulting to React Server Components (RSC). Experimentation with the above mentioned libraries, App Router, and RSC is needed during development of app-root. In the scenario where one of these libraries is completely incompatible with App Router or RSC, further decisions will be made on whether to temporarily revert app-root to the Next.js Pages Router, or find a replacement for the incompatible library.

## Status
Accepted
