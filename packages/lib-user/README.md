# Zooniverse User and User Group Library

A standalone library for the Zooniverse user stats, user group stats, and home pages.

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

### Node/yarn
```sh
yarn dev
# yarn storybook
```

Starts a development server on port 8080 ~~and a Storybook on port 6006~~ by default.

Use `yarn dev` to run a small development environment app at `localhost:8080`.

- a staging user stats page can be loaded by query param: `localhost:8080?users=[login]/stats`
- a staging user group stats page can be loaded by query param: `localhost:8080?groups=[user group ID]`

<!-- ## Tests

`yarn test` to run mocha tests. -->

<!-- ## Contributing

Components should be added to the `src/components` folder and an export to `src/index.js`. Each component should be tested, documented readme, and have a storybook example added. -->

### Technologies

- @zooniverse/panoptes-js - Panoptes API javascript client
- @zooniverse/react-components - Zooniverse common React components
- @zooniverse/grommet-theme - Zooniverse brand Grommet theme
- [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
- [Grommet](https://v2.grommet.io/components) - React UI component library
- [styled-components](https://www.styled-components.com/) - CSS in JS styling library.
