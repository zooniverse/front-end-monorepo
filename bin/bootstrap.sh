#!/bin/bash

# Installs top level dependencies, installs package dependencies for
# `lib-react-components` and builds the library, then bootstraps the remaining
# packages.

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
LERNA=$ROOT_DIR/node_modules/.bin/lerna

printf 'Installing root dependencies...'
(cd $ROOT_DIR && npm install)

printf 'Bootstrapping `lib-grommet-theme`...'
$LERNA bootstrap --scope="@zooniverse/grommet-theme"
printf '\n'
$LERNA exec --scope="@zooniverse/grommet-theme" -- npm run build
printf '\n'

printf 'Bootstrapping `lib-react-components`...'
$LERNA bootstrap --scope="@zooniverse/react-components"
printf '\n'
$LERNA exec --scope="@zooniverse/react-components" -- npm run build
printf '\n'

printf 'Bootstrapping `lib-auth`...'
$LERNA bootstrap --scope="@zooniverse/auth"
printf '\n'
$LERNA exec --scope="@zooniverse/auth" -- npm run build
printf '\n'

printf 'Bootstrapping remaining packages...'
$LERNA bootstrap
