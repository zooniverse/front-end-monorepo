#!/usr/bin/env bash

# Lists all folders starting with `app-` in the `./packages` directory as a
# comma-separated list of absolute paths.

find "./packages" -maxdepth 1 -type d -print0 |
while IFS= read -r -d '' folder; do
  if [[ $folder =~ "app-" && $folder != *\@* ]]; then
    ABSOLUTE_PATH=$(cd "$(dirname "$0")/../$folder"; pwd)
    printf '%s,' "$ABSOLUTE_PATH"
  fi
done
