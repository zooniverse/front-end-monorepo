# Bash scripts

## `bootstrap.sh`

This script gets the monorepo into a working state by doing the following:

1. Install the top-level dependencies for the repo
1. Install the remaining dependencies for each package, and symlink them together
1. Build `@zooniverse/async-states`
1. Build `@zooniverse/grommet-theme`
1. Build `@zooniverse/react-components`
1. Build `@zooniverse/lib-classifier`

## `panic-button.sh`

Trashes `node_modules` and all build artifacts in the monorepo.
