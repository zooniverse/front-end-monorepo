# Bash scripts

## `bootstrap.sh`

This script gets the monorepo into a working state by doing the following:

1. Install the top-level dependencies for the repo
1. Install the remaining dependencies for each package, and symlink them together
1. Build `@zooniverse/async-states`
1. Build `@zooniverse/grommet-theme`
1. Build `@zooniverse/react-components`
1. Build `@zooniverse/lib-classifier`

## `get-app-folders.sh`

Returns a comma-separated list of absolute paths to apps in the package folder, for use in build scripts.

## `panic-button.sh`

Trashes `node_modules` and all build artifacts in the monorepo.

## `travis-bootstrap.sh`

Version of `bootstrap.sh` for use in running the tests on Travis CI.

## `travis-test.sh`

Runs tests for every package on Travis CI.
