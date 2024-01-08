# ADR 57: build @zooniverse/classifier and @zooniverse/react-components as ES modules

## Status
Accepted

## Context
The classifier and React components libraries were originally built with Webpack. Each was built as a single large UMD `main.js` file.

Since the monorepo was first started, ES modules have become the standard for JS packages. Recent versions of Webpack can [tree-shake ESM](https://webpack.js.org/guides/tree-shaking/) to remove unused code. CommonJS is used for legacy package support, and increasingly deprecated for newer packages. All modern browsers, and NodeJS, support `import/export`.

## Decision
Since [PR 3900](https://github.com/zooniverse/front-end-monorepo/pull/3900), each package is published as ESM, using Babel to transform the JSX source files to JS. A Babel CJS build, transforming `import/export` to `require`, is kept for legacy purposes.

## Consequences
- Each library has a `build:es6` script and a `build:cjs` script. Over time, the CJS build can be deprecated and removed.
- Each library has two entrypoints: `dist/esm` for ESM, and `dist/cjs` for CommonJS.
- Production builds and deploys only need the `build:es6` script.
- Older libraries (`@zooniverse/async-states`, `@zooniverse/panoptes-js`, `@zooniverse/grommet-theme`) are still published as CommonJS.