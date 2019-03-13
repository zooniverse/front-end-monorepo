#!/bin/bash
set -ev

relpath() { python -c "import os.path; print os.path.relpath('$1','${2:-$PWD}')" ; }

# Script for copying the source code for lib-react-components and lib-classifier
# into app-project, to avoid https://github.com/zooniverse/front-end-monorepo/issues/327

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
NEW_CLASSIFIER_DIR=$ROOT_DIR/packages/app-project/src/lib/lib-classifier
NEW_COMPONENTS_DIR=$ROOT_DIR/packages/app-project/src/lib/lib-react-components

mkdir -p $NEW_CLASSIFIER_DIR $NEW_COMPONENTS_DIR

rsync -razvh $ROOT_DIR/packages/lib-classifier/src/ $NEW_CLASSIFIER_DIR
rsync -razvh $ROOT_DIR/packages/lib-react-components/src/ $NEW_COMPONENTS_DIR

# Replace imports in lib-classifier - there are only a few components in app-project, and I've replaced the imports there manually.
PKG=@zooniverse/react-components

find $NEW_CLASSIFIER_DIR -type f -name "*.js" | while read fname; do
  if grep -q $PKG $fname
  then
    DIR=$(dirname "${fname}")
    DIFF=$(relpath "$NEW_COMPONENTS_DIR" "$DIR")
    sed -i -e "s|${PKG}|${DIFF}|g" "$fname"

    # Maybe something's funky with my sed syntax, but it backs up the original
    # as example.js-e, which we don't need.
    rm "${fname}-e"
  fi
done
