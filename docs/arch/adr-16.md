# ADR 16: Monorepo Tooling

Created: July 3, 2019

## Context

When we first started the rebuild, @rogerhutchings set it up as a monorepo. The idea being that there are benefits to separating our code between multiple apps and packages:

  - We can reuse code more easily
  - Error boundaries are built-in (if we break one thing, we don't necessarily break everything)
  - To make changes to one thing, we don't need to recompile and rebuild _everything_ in development, at least

Working across multiple repos can be pretty tedious: adding a feature which requires changes to more than one package requires multiple pull requests to different repos, for example, and publishing updated packages in the correct order. So Roger set this project up as a monorepo using Lerna. This started out fine, but we hit some issues in the development of Planet Hunters TESS:

  - `styled-components` wasn't collect styling from symlinked dependencies, causing a FOUC on initial render: https://github.com/zooniverse/front-end-monorepo/issues/327
  - Adding the `@zooniverse/standard` package broke the build because Lerna wasn't correctly linking it up: https://github.com/zooniverse/front-end-monorepo/pull/958
  - `npm audit` doesn't work with symlinked dependencies

In the course of investigating these issues, we learned:

  - Symlinking packages has side effects that need to be worked around: https://github.com/styled-components/styled-components/issues/2322
  - Lerna is aimed at publishing multiple packages from a repository, **nothing more**, including managing local packages for development (https://github.com/lerna/lerna/issues/1243#issuecomment-401396850). We're currently using it solely for local development. 😢 It's also reasonable to suppose that future major versions of Lerna _could_ modify the API to further that aim, and deprecate features that we're currently (incorrectly) relying on.

So @rogerhutchings started investigating alternatives to a pure Lerna setup.

- [`bazel`](https://bazel.build/), [`buck`](https://buck.build/), [`pants`](https://www.pantsbuild.org/index.html), [`please`](https://please.build/) etc support multiple langauges, but not Javascript out of the box, and we'd need some additional tooling to get them to work in the way we want.
- [`rushjs`](https://rushjs.io/) looked promising, but at time of writing is limited to `npm` v.4.5.0, which is pretty old.
- [`yarn`](https://yarnpkg.com/) has a monorepo feature called Workspaces, and has some other features like `audit`, hoisting etc. Lerna will use `yarn` workspaces under the hood where available.

## Decision

We're going to switch the monorepo tooling from Lerna to Yarn and Lerna. Yarn will be used for managing dependencies across the monorepo and running commands against packages. Lerna will be used to run commands across multiple packages, which is what it's designed to do.

## Status

Accepted

## Consequences

- We'll need to help devs get `yarn` installed, and how to work with the monorepo using the new tooling - updated documentation will be needed. There's also the possibility of creating a dev Docker image with `yarn` and some other local tools (like a build watcher/compiler) built in for people to use.
- Yarn is quite noisy, and will complain about missing `peerDependencies`_a lot_ (see https://github.com/yarnpkg/yarn/issues/5347#issuecomment-386288470). This is a conscious decision by the maintainers.
