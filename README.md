# Zooniverse Front-End Monorepo

[![Build Status](https://travis-ci.com/zooniverse/front-end-monorepo.svg?branch=master)](https://travis-ci.com/zooniverse/front-end-monorepo)
[![Coverage Status](https://coveralls.io/repos/github/zooniverse/front-end-monorepo/badge.svg?branch=master)](https://coveralls.io/github/zooniverse/front-end-monorepo?branch=master)
[![pullreminders](https://pullreminders.com/badge.svg)](https://pullreminders.com?ref=badge)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Licensed under Apache 2.0](https://img.shields.io/github/license/zooniverse/front-end-monorepo.svg)](https://github.com/zooniverse/front-end-monorepo/blob/master/LICENSE.md)
![Contributors](https://img.shields.io/github/contributors/zooniverse/front-end-monorepo.svg)

️Take a look at [our roadmap](https://trello.com/b/yg0r4dG5/front-end-rebuild-roadmap)! 🛣️

---

**Table of Contents**

- [Requirements](#requirements)
- [Monowhat?](#monowhat)
- [Getting started](#getting-started)
- [Helpful Guides](#helpful-guides)
- [Packages](#packages)
- [Helpers](#helpers)
- [Conventions](#conventions)
 - [NPM](#npm)
 - [Packages directory](#packages-directory)
- [Production deployment](#production-deployment)
- [License](#license)

## Requirements

- [Browser support](docs/arch/adr-3.md)
- Node 10
- Git
- Yarn

Node, git, and yarn can be installed through [homebrew](https://brew.sh/) on MacOS. If you need to support more than one version of node at the same time, you can consider installing it though [nvm](https://github.com/nvm-sh/nvm) instead of homebrew

## Monowhat?

This monorepo is managed with [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Yarn Workspaces allow us to maintain package modularity for javascript projects that have interdependency. Organizationally, they allows us to track issues, pull requests, and progress for all related packages in one place.

## Getting started

### Docker
You can run the code locally in Docker, which avoids needing to install Node or yarn.

```sh
git clone git@github.com:zooniverse/front-end-monorepo.git
cd front-end-monorepo
docker-compose build
```

`docker-compose up` runs production builds of the project app at http://localhost:3000 and the content pages app at http://localhost:3001

`docker-compose down` stops the running container.

`docker-compose run --rm test` runs the tests.

Development environments for individual packages can be run from the package directories. For example:
```sh
cd packages/app-project
docker-compose up
````
to run a develeopment server for the project app.

### With Node and yarn
Alternatively, you can install Node 10 and yarn and build the monorepo packages.

```sh
git clone git@github.com:zooniverse/front-end-monorepo.git
cd front-end-monorepo
yarn bootstrap
```

The `bootstrap` script will install the dependencies and build any local packages used as dependencies.

## Helpful Guides

- [Yarn docs](https://yarnpkg.com/en/docs)

## Packages

See each package's folder for more specific documentation.

| package name | folder | description |
|---|---|---|
| **@zooniverse/async-states** | `packages/lib-async-states` | Frozen object of async states to use in data stores |
| **@zooniverse/classifier** | `packages/lib-classifier` | Classifier view components and state which can be exported modularly or altogether as a working classifier |
| **@zooniverse/fe-content-pages** | `packages/app-content-pages` | Server-side rendered application for documentation / info pages, such as Publications. |
| **@zooniverse/fe-project** | `packages/app-project` | Server-side rendered application for a project (anything at `/projects/owner/display_name`) |
| **@zooniverse/grommet-theme** | `packages/lib-grommet-theme` | The style definitions for a Zooniverse theme to use with Grommet |
| **@zooniverse/panoptes-js** | `packages/lib-panoptes-js` | Panoptes API javascript client. Functional HTTP request helpers built on top of superagent |
| **@zooniverse/react-components** | `packages/lib-react-components` | A set of Zooniverse-specific React components, built using Grommet |

## Helpers

If you have [`plop`](https://plopjs.com/) installed globally (`npm i -g plop`), you can use it to quickly scaffold new apps and components. The following generators are available:

- `App` - creates a new app in the folder, based on a simple Next.js 7 build, with Styled Components and Mocha included.
- `Component` - creates a new component in the current folder, including tests and an optional container.

## Conventions

### NPM

All packages built from this monorepo should be _scoped_ to `zooniverse`, e.g. `grommet-theme` becomes `@zooniverse/grommet-theme`.

### `packages` directory

Libraries for publishing to NPM should have their directory names prefixed with `lib-`, e.g. `/grommet-theme` becomes `/lib-grommet-theme`.

Apps should have their directory names prefixed with `app-`, e.g. `/project` becomes `/app-project`.

## Deployment

Deploys to production and staging are handled by [Jenkins](https://jenkins.zooniverse.org/job/Zooniverse%20GitHub/job/front-end-monorepo/) using Docker images (descriptions found below). 

Merges to master deploy to a staging Kubernetes instance that uses Panoptes production. This is used for manual end to end behavior testing for new code and design reviews. `https://frontend.preview.zooniverse.org/projects/:project-owner/:project-name/` proxy redirects to the new NextJS app while the rest of sub-domain redirects to PFE. Staging projects can be loaded by adding this query param to the URL: `?env=staging`.

Deployments to a production Kubernetes instance are triggered by committing a `production-release` git tag on master. This can either be done using the git CLI or using the lita deploy command on slack. `https://www.zooniverse.org/projects/:project-owner/:project-name/classify` proxy redirects to the new NextJS app while the rest of the domain redirects to PFE. Currently the only project that is configured to do this is Planet Hunters TESS. Eventually more projects will migrate when they migrate to the new classifier.

More information is available in [ADR 12](docs/arch/adr-12.md) and [ADR 17](docs/arch/adr-17.md)

### Environment variables

- `PANOPTES_ENV`: sets which Panoptes API endpoint to use. 
  - `production` will use `https://www.zooniverse.org/api` 
  - `staging` will use `https://panoptes-staging.zooniverse.org/api`.

The yarn build scripts default to production for libraries if `PANOPTES_ENV` is not specified. The apps are always built to the production API.
- `NODE_ENV`: sets the environment for library builds.

### Docker images

- `zooniverse/front-end-monorepo`: Built from the Dockerfile in the root directory. It runs `yarn install` and `yarn build` for the `lib-` packages and static (production) apps.
- `zooniverse/fe-content-pages`: Built from the Dockerfile in `packages/app-content-pages`. Runs `yarn start` in `packages/app-content-pages` from `zooniverse/front-end-monorepo:latest`.
- `zooniverse/fe-project`: Runs production (static) builds of the NextJS app and are then deployed to Kubernetes. Built from the Dockerfile in `packages/app-project`. Runs `yarn start`.


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
