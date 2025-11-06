# Zooniverse React Components

Common React components used throughout the Zooniverse.

## Getting Started

Install the package from NPM:

```
npm i @zooniverse/react-components
```

and use it

ES5

```
var { ZooFooter } = require('@zooniverse/react-components');
```

ES6

```
import { ZooFooter } from '@zooniverse/react-components';
```

## Run

`pnpm start` to run the storybook locally on (https://localhost:6007).

## Tests

`pnpm test` to run Vitest tests.

`pnpm test ProjectCard.spec.jsx` to test one file at a time.

## Contributing

Components should be added to the `src/components` folder and an export to `src/index.js`. Each component should be tested, documented readme, and have a storybook example added.

### Technologies and tools we use

  All of our components are written using React, built on top of Grommet, a component UI library, and styled by our custom Grommet style theme (@zooniverse/grommet-theme) and styled-components.

  - [Grommet](https://v2.grommet.io/components) - React UI component library
  - [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
  - [styled-components](https://www.styled-components.com/) - CSS in JS for styling and theming
  - [react-i18next](https://react.i18next.com/) - Internationalization framework for React.

  Testing is done by

  - [Vitest](https://vitest.dev)
  - [React Testing Library](https://testing-library.com)
  - [Storybook](https://storybook.js.org)
