#!/usr/bin/env bash

# Trashes all `node_modules` folders and runs `yarn install --frozen-lockfile` to give you
# a clean version of the project, similar to `npm ci`

printf 'Removing installed `node_modules`.\n'

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"

printf "Cleaning \`$ROOT_DIR\`..."
rm -rf $ROOT_DIR/node_modules
printf " done!\n"

for DIR in $(find $ROOT_DIR/packages -mindepth 1 -maxdepth 1 -type d) ; do
  printf "Cleaning \`$DIR\`..."
  rm -rf $DIR/node_modules
  printf " done!\n"
done

yarn install --frozen-lockfile
echo "Finished!"