# Zooniverse Viewers

Viewer components used throughout the Zooniverse.

## Getting Started

Install the package from NPM:

```
npm i @zooniverse/subject-viewers
```

and use it

```
import { ProtoViewer } from '@zooniverse/subject-viewers';
```

## Run

`yarn run storybook` to run the storybook locally on (https://localhost:6007).

## Tests

`yarn test` to run mocha tests.

## Contributing

Components should be added to the `src/components` folder and an export to `src/index.js`. Each component should be tested, documented readme, and have a storybook example added.

### Technologies and tools we use

All of our components are written using React, built on top of Grommet, a component UI library, and styled by our custom Grommet style theme (@zooniverse/grommet-theme) and styled-components.

- [Grommet](https://v2.grommet.io/components) - React UI component library
- [React.js](https://reactjs.org/) - Component, virtual DOM based javascript library

Testing is done by

- [Mocha](https://mochajs.org/) - test runner
- [Chai](https://www.chaijs.com/) - BDD/TDD assertion library
- [Sinon](https://sinonjs.org) - test spies, mocks, and stubs
