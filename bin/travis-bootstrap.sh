#!/usr/bin/env sh
set -ev

# Script for bootstrapping the monorepo into a working state for Travis.
#
# Runs the following tasks in order:
#   - Install top level dependencies
#   - Install package dependencies and symlink them together
#   - Build `@zooniverse/async-states`
#   - Build `@zooniverse/grommet-theme`
#   - Build `@zooniverse/react-components`
#   - Build `@zooniverse/lib-classifier`

LERNA=$TRAVIS_BUILD_DIR/node_modules/.bin/lerna

(cd $TRAVIS_BUILD_DIR && npm install)

$LERNA bootstrap

$LERNA run --scope="@zooniverse/async-states" build

$LERNA run --scope="@zooniverse/grommet-theme" build

$LERNA run --scope="@zooniverse/react-components" build

$LERNA run --scope="@zooniverse/classifier" build
