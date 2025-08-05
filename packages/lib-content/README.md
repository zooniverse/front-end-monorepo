# Zooniverse Content Pages Library

A library for components used in content pages such as About Zooniverse, Get Involved, Policies, and signed-out Homepage. The components in this library are intended to be imported into app-root.

## Run

```sh
yarn storybook
```

Starts a dev storybook on port 6005.

## Build

`yarn build` to bundle the components.

## Tests

`yarn test` to run Vitest tests.

`yarn test AboutHeader.spec.jsx` to test one file at a time.

### Technologies

- @zooniverse/panoptes-js - Panoptes API javascript client
- @zooniverse/react-components - Zooniverse common React components
- @zooniverse/grommet-theme - Zooniverse brand Grommet theme
- [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
- [Grommet](https://v2.grommet.io/components) - React UI component library
- [styled-components](https://www.styled-components.com/) - CSS in JS styling library.
- [react-i18next](https://react.i18next.com/) - Internationalization framework for React.
- [Vitest](https://vitest.dev/) - Testing for React components.
