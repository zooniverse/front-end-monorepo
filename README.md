# Zooniverse Front-End Monorepo

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

[![pullreminders](https://pullreminders.com/badge.svg)](https://pullreminders.com?ref=badge)

[![Coverage Status](https://coveralls.io/repos/github/zooniverse/front-end-monorepo/badge.svg?branch=master)](https://coveralls.io/github/zooniverse/front-end-monorepo?branch=master)

## Requirements

[Browser support](docs/arch/adr-3.md)

## Monowhat?

This monorepo is managed with [Lerna](https://github.com/lerna/lerna).

Lerna allows us to maintain package modularity for javascript projects that have interdependency. Organizationally, it allows us to track issues, pull requests, and progress for all related packages in one place.

## Getting started

```sh
git clone git@github.com:zooniverse/front-end-monorepo.git
cd front-end-monorepo
./bin/bootstrap.sh
```

The `bootstrap.sh` script will install the top-level dependencies, build any packages used as dependencies, and finally bootstrap the remaining packages.

## Helpful Guides

- [Lerna docs](https://github.com/lerna/lerna)
- [Troubleshooting guide](docs/troubleshooting-guide.md) for developers encountering issues installing or running the Front-End Monorepo.

## Packages

A list of packages and their main dependencies

- **@zooniverse/fe-project** - Server-side rendered application for a project (anything at `/projects/owner/display_name`)
  - @zooniverse/panoptes-js - Panoptes API javascript client
  - [Grommet](https://v2.grommet.io/components) - React UI component library
  - [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree/) - App state built on MobX
  - [next.js](https://nextjs.org/) - Server-side rendering and routing framework
  - [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
  - [styled-components](https://www.styled-components.com/) - CSS in JS styling library. Used from Grommet theming.
- **@zooniverse/classifier** - Classifier view components and state which can be exported modularly or altogether as a working classifier
  - @zooniverse/grommet-theme - Zooniverse's Grommet theme
  - @zooniverse/panoptes-js - Panoptes API javascript client
  - [Grommet](https://v2.grommet.io/components) - React UI component library
  - [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree/) - App state built on MobX
  - [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library
  - [styled-components](https://www.styled-components.com/) - CSS in JS styling library. Used from Grommet theming.
- **@zooniverse/grommet-theme** - The style definitions for a Zooniverse theme to use with Grommet
  - [Grommet](https://v2.grommet.io/components) - React UI component library
- **@zooniverse/panoptes-js** - Panoptes API javascript client. Functional HTTP request helpers built on top of superagent
  - [Superagent](http://visionmedia.github.io/superagent/) - AJAX API that works in the browser or node
- **@zooniverse/react-components** - A set of Zooniverse specific React components
  - [Grommet](https://v2.grommet.io/components) - React UI component library
  - [React.js](https://reactjs.org/)  - Component, virtual DOM based javascript library

## Helpers

If you have [`plop`](https://plopjs.com/) installed globally, you can use it to quickly scaffold new apps and components. You can use the following generators:

- `App` - creates a new app in the `packages` folder, based on a simple Next.js 7 build, with Styled Components and Mocha included.
- `Component` - creates a new component in the current folder, including tests and an optional container.

## Conventions

### NPM

All packages built from this monorepo should be _scoped_ to `zooniverse`, e.g. `grommet-theme` becomes `@zooniverse/grommet-theme`.

### Packages directory

Libraries for publishing to NPM should have their directory names prefixed with `lib-`, e.g. `/grommet-theme` becomes `/lib-grommet-theme`.

Apps should have their directory names prefixed with `app-`, e.g. `/project` becomes `/app-project`.

---

## License

Copyright 2018 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
