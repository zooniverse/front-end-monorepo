# Zooniverse User and User Group Library

A library for the Zooniverse user stats, user group stats, and home pages. The components in this library are intended to be imported into app-root as part of `zooniverse.org/users` and `zooniverse.org/groups`. For example, the UserStats component from this library will be imported into the app-root page at `zooniverse.org/users/[login]/stats`.

<!-- ## Getting Started

Install the package from NPM:

```sh
npm i @zooniverse/user
```

and use it

```sh
import { UserStats } from '@zooniverse/user';
``` -->

## Run

### Node
```sh
pnpm dev
pnpm storybook
```

Starts a development server on port 8080 and a Storybook on port 6008 by default.

Use `pnpm dev` to run a small development environment app at `localhost:8080`.

- a staging user stats page can be loaded by query param: `https://localhost:8080?users=[login]/stats`
- a staging user group stats page can be loaded by query param: `https://localhost:8080?groups=[user group ID]`

Note: query params are used for local development work, but are not used in production. The production urls related to this library are:

- `https://www.zooniverse.org/users/[login]/stats`
- `https://www.zooniverse.org/users/[login]/stats/certificate`
- `https://www.zooniverse.org/groups/[user group ID]`

## Build

`pnpm build` to bundle the components.

## Tests

`pnpm test` to run Vitest tests.

`pnpm test MainContent.spec.jsx` to test one file at a time.

<!-- ## Contributing

Components should be added to the `src/components` folder and an export to `src/index.js`. Each component should be tested, documented readme, and have a storybook example added. -->

### Technologies

- @zooniverse/panoptes-js - Panoptes API javascript client
- @zooniverse/react-components - Zooniverse common React components
- @zooniverse/grommet-theme - Zooniverse brand Grommet theme
- [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
- [Grommet](https://v2.grommet.io/components) - React UI component library
- [styled-components](https://www.styled-components.com/) - CSS in JS styling library.
