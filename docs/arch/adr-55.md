# ADR 55: lib-user

October 2023

## Context

We've decided to build a user stats page ([ADR 52](adr-52.md)), a user group stats page ([ADR 51](adr-51.md)), and a logged-in user homepage ([ADR 53](adr-53.md)). The components for these pages will be built in a new "user library" - `lib-user`. This is in accordance with the decision to build app-root ([ADR 54](adr-54.md)). The app-root will serve the homepage and handle traffic for the domain root, https://zooniverse.org, including `/users` stats pages and `/groups` stats pages, utilizing Next.js 13's App Router and by importing components from `lib-user`.

## Decision

Create a new library `lib-user` to house the components for the user stats page, user group stats page, and logged-in user homepage. The components will be based on the [related Figma designs](https://www.figma.com/file/qbqbmR3t5XV6eKcpuRj7mG/Group-Stats) and will utilize the Zooniverse stats service [ERAS](https://github.com/zooniverse/eras) (Enhanced Running Average Stats Service) and [Panoptes](https://github.com/zooniverse/panoptes) resources.

Initially, the components created in `lib-user` will be related to the user stats page, user group stats page, and logged-in user homepage. Subsequently, additional user related components can be added to `lib-user` as needed (for user profile, collections, settings, etc.).

## Status

Proposed

## Consequences

Create `lib-user` and components noted.
