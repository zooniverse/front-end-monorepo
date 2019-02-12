#!/bin/bash
set -e

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks:
#   - Install top level dependencies
#   - Install dependencies for `@zooniverse/async-states` and build
#   - Install dependencies for `@zooniverse/panoptes-js`
#   - Install dependencies for `@zooniverse/grommet-theme` and build
#   - Install dependencies for `@zooniverse/react-components` and build
#   - Install dependencies for `@zooniverse/auth` and build
#   - Install dependencies for `@zooniverse/lib-classifier` and build
#   - Install dependencies for remaining packages

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"

printf 'Installing root dependencies...\n'
(cd $ROOT_DIR && npm install)
printf '\n'

printf 'Bootstrapping the monorepo!\n\n'
npx lerna bootstrap

printf 'Building `lib-grommet-theme`...\n'
npx lerna exec --scope="@zooniverse/grommet-theme" -- npm run build
printf '\n'

printf 'Building `lib-react-components`...\n'
npx lerna exec --scope="@zooniverse/react-components" -- npm run build
printf '\n'

printf 'Building `lib-auth`...\n'
npx lerna exec --scope="@zooniverse/auth" -- npm run build
printf '\n'

printf 'Building `lib-classifier`...\n'
npx lerna exec --scope="@zooniverse/classifier" -- npm run build
printf '\n'
