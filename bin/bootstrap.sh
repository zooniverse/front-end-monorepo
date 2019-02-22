#!/usr/bin/env sh
set -ev

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks in order:
#   - Install top level dependencies
#   - Install package dependencies and symlink them together
#   - Build `@zooniverse/async-states`
#   - Build `@zooniverse/grommet-theme`
#   - Build `@zooniverse/react-components`
#   - Build `@zooniverse/lib-classifier`


ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
LERNA=$ROOT_DIR/node_modules/.bin/lerna

printf 'Installing root dependencies...\n'
(cd $ROOT_DIR && npm install)
printf '\n'

printf 'Bootstrapping the monorepo!\n\n'
$LERNA bootstrap

printf 'Building `lib-async-states`...\n'
$LERNA exec --scope="@zooniverse/async-states" -- npm run build
printf '\n'

printf 'Building `lib-grommet-theme`...\n'
$LERNA exec --scope="@zooniverse/grommet-theme" -- npm run build
printf '\n'

printf 'Building `lib-react-components`...\n'
$LERNA exec --scope="@zooniverse/react-components" -- npm run build
printf '\n'

printf 'Building `lib-classifier`...\n'
$LERNA exec --scope="@zooniverse/classifier" -- npm run build
printf '\n'
