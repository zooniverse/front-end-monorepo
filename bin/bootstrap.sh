#!/usr/bin/env bash
set -ev

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks in order:
#   - Install dependencies
#   - Build `@zooniverse/react-components`
#   - Build `@zooniverse/lib-classifier`


ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
cd $ROOT_DIR

printf 'Installing dependencies...\n'
yarn install
printf '\n'

printf 'Building `lib-react-components`...\n'
yarn workspace @zooniverse/react-components build
printf '\n'

printf 'Building `lib-classifier`...\n'
yarn workspace @zooniverse/classifier build
printf '\n'

echo 'Done!'
