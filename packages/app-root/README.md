# app-root

A [Next.js](https://nextjs.org/) app for handling all routes, including `/projects`, `/user`, `/about`, `/groups`.

## Getting started

This package should be cloned as part of the [front-end-monorepo](https://github.com/zooniverse/front-end-monorepo).

## Running in development

Starts a development server on port 3000.

### Node
```sh
yarn dev
```
or

```sh
yarn build
yarn start
```

### Analyze bundle sizes

This app has `@next/bundle-analyzer` as a dev dependency. To use it, run `ANALYZE=true yarn build`.

## Technologies

  - @zooniverse/panoptes-js - Panoptes API javascript client
  - @zooniverse/react-components - Zooniverse common React components
  - @zooniverse/grommet-theme - Zooniverse brand Grommet theme
  - [Grommet](https://v2.grommet.io/components) - React UI component library
  - [next.js](https://nextjs.org/) - Server-side rendering and routing framework
  - [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
  - [styled-components](https://www.styled-components.com/) - CSS in JS styling library.
