#!/usr/bin/env bash
set -ev

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks in order:
#   - Install dependencies
#   - Build `@zooniverse/react-components`
#   - Build `@zooniverse/content`
#   - Build `@zooniverse/lib-user`
#   - Build `@zooniverse/lib-classifier`


ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
cd $ROOT_DIR

printf 'Building `lib-react-components`...\n'
yarn workspace @zooniverse/react-components install --frozen-lockfile
printf '\n'

printf 'Building `lib-content`...\n'
yarn workspace @zooniverse/content install --frozen-lockfile
printf '\n'

printf 'Building `lib-user`...\n'
yarn workspace @zooniverse/user install --frozen-lockfile
printf '\n'

printf 'Building `lib-classifier`...\n'
yarn workspace @zooniverse/classifier install --frozen-lockfile
printf '\n'

printf 'Building `fe-project`...\n'
yarn workspace @zooniverse/fe-project build
printf '\n'

printf 'Building `fe-content-pages`...\n'
yarn workspace @zooniverse/fe-content-pages build
printf '\n'

printf 'Building `fe-root`...\n'
yarn workspace @zooniverse/fe-root build
printf '\n'

echo 'Done!'
