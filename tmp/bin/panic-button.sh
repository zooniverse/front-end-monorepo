#!/usr/bin/env bash

# Trashes all build folders and `node_modules`

printf 'Trashing `node_modules` folders and build artifacts...\n'

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"

printf "Cleaning \`$ROOT_DIR\`..."
rm -rf $ROOT_DIR/node_modules
printf " done!\n"

for DIR in $(find $ROOT_DIR/packages -mindepth 1 -maxdepth 1 -type d) ; do
  printf "Cleaning \`$DIR\`..."
  rm -rf $DIR/node_modules $DIR/.next $DIR/dist
  printf " done!\n"
done

echo "Finished!"
