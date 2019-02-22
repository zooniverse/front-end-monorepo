# !/usr/bin/env sh

# Trashes all build folders and `node_modules`

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"

rm -rf $ROOT_DIR/node_modules

rm -rf $ROOT_DIR/packages/app-project/.next
rm -rf $ROOT_DIR/packages/app-project/node_modules

rm -rf $ROOT_DIR/packages/lib-async-states/dist
rm -rf $ROOT_DIR/packages/lib-async-states/node_modules

rm -rf $ROOT_DIR/packages/lib-classifier/dist
rm -rf $ROOT_DIR/packages/lib-classifier/node_modules

rm -rf $ROOT_DIR/packages/lib-grommet-theme/dist
rm -rf $ROOT_DIR/packages/lib-grommet-theme/node_modules

rm -rf $ROOT_DIR/packages/lib-panoptes-js/node_modules

rm -rf $ROOT_DIR/packages/lib-react-components/node_modules
rm -rf $ROOT_DIR/packages/lib-react-components/dist
