#!/bin/bash

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks:
#   - Install top level dependencies
#   - Install dependencies for `@zooniverse/async-states` and build
#   - Install dependencies for `@zooniverse/panoptes-js`
#   - Install dependencies for `@zooniverse/grommet-theme` and build
#   - Install dependencies for `@zooniverse/react-components` and build
#   - Install dependencies for `@zooniverse/lib-classifier` and build
#   - Install dependencies for remaining packages

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
LERNA=$ROOT_DIR/node_modules/.bin/lerna


printf 'Installing root dependencies...\n'
(cd $ROOT_DIR && npm install)
printf '\n'

printf 'Bootstrapping the monorepo!\n\n'
$LERNA bootstrap

printf 'Building `lib-grommet-theme`...\n'
$LERNA exec --scope="@zooniverse/grommet-theme" -- npm run build
printf '\n'

printf 'Building `lib-react-components`...\n'
$LERNA exec --scope="@zooniverse/react-components" -- npm run build
printf '\n'

printf 'Building `lib-classifier`...\n'
$LERNA exec --scope="@zooniverse/classifier" -- npm run build
printf '\n'
