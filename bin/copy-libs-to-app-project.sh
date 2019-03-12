#!/usr/bin/env sh
set -ev

# Script for copying the source code for lib-react-components and lib-classifier
# into app-project, to avoid https://github.com/zooniverse/front-end-monorepo/issues/327

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"

mkdir -p $ROOT_DIR/packages/app-project/src/lib/lib-classifier

rsync -razvh $ROOT_DIR/packages/lib-classifier/src/ $ROOT_DIR/packages/app-project/src/lib/lib-classifier

mkdir -p $ROOT_DIR/packages/app-project/src/lib/lib-react-components

rsync -razvh $ROOT_DIR/packages/lib-react-components/src/ $ROOT_DIR/packages/app-project/src/lib/lib-react-components
