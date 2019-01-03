#!/bin/bash

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks:
#   - Install top level dependencies
#   - Install dependencies for `@zooniverse/async-states` and build
#   - Install dependencies for `@zooniverse/panoptes-js`
#   - Install dependencies for `@zooniverse/grommet-theme` and build
#   - Install dependencies for `@zooniverse/react-components` and build
#   - Install dependencies for `@zooniverse/auth` and build
#   - Install dependencies for remaining packages

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
LERNA=$ROOT_DIR/node_modules/.bin/lerna

printf 'Bootstrapping the monorepo!\n\n'

printf 'Installing root dependencies...\n'
(cd $ROOT_DIR && npm install)
printf '\n'

printf 'Bootstrapping `lib-async-states`...\n'
$LERNA bootstrap --scope="@zooniverse/async-states"
printf '\n'

printf 'Bootstrapping `lib-panoptes-js`...\n'
$LERNA bootstrap --scope="@zooniverse/panoptes-js"
printf '\n'

printf 'Bootstrapping `lib-grommet-theme`...\n'
$LERNA bootstrap --scope="@zooniverse/grommet-theme"
$LERNA exec --scope="@zooniverse/grommet-theme" -- npm run build
printf '\n'

printf 'Bootstrapping `lib-react-components`...\n'
$LERNA bootstrap --scope="@zooniverse/react-components"
$LERNA exec --scope="@zooniverse/react-components" -- npm run build
printf '\n'

printf 'Bootstrapping `lib-auth`...\n'
$LERNA bootstrap --scope="@zooniverse/auth"
printf '\n'
$LERNA exec --scope="@zooniverse/auth" -- npm run build
printf '\n'

printf 'Bootstrapping remaining packages...\n'
printf '\n'
$LERNA bootstrap
