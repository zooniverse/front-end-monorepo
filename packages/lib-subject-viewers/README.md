# Zooniverse Viewers

Viewer components used throughout the Zooniverse.

## Getting Started

Install the package from NPM:

```
npm i @zooniverse/subject-viewers
```

and use it

```
import VolumetricViewer from '@zooniverse/subject-viewers/VolumetricViewer/VolumetricFull'
```

## Run

`yarn run storybook` to run the storybook locally on (https://localhost:6007).

## Tests

`yarn test` to run Vitest tests.

`yarn test ModelTool.spec.jsx` to test one file at a time.

## Contributing

Components should be added to the `src/components` folder and an export to `src/index.js`. Each component should be tested, documented readme, and have a storybook example added.

## Technologies and tools we use

All of our components are written using React, built on top of Grommet, a component UI library, and styled by our custom Grommet style theme (@zooniverse/grommet-theme) and styled-components.

- [Grommet](https://v2.grommet.io/components) - React UI component library
- [React.js](https://reactjs.org/) - Component, virtual DOM based javascript library

Testing is done by

  - [Vitest](https://vitest.dev)
  - [React Testing Library](https://testing-library.com)
  - [Storybook](https://storybook.js.org)

## Troubleshooting

The VolumetricViewer component uses `canvas`. If your Mac has a M1 or M2 chip, you'll likely need to do some manual `brew install` commands in order to bootstrap FEM: https://github.com/Automattic/node-canvas/issues/1511.
