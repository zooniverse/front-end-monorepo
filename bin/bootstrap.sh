#!/usr/bin/env bash

# The script will immediately exit upon any command failure (-e).
# You will be able to see exactly what commands are being executed before they run (-v).
set -ev

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks in order:
#   - Install dependencies
#   - Build `@zooniverse/react-components`
#   - Build `@zooniverse/content`
#   - Build `@zooniverse/lib-user`
#   - Build `@zooniverse/lib-subject-viewers`
#   - Build `@zooniverse/lib-classifier`
#   - Build `@zooniverse/fe-project`
#   - Build `@zooniverse/fe-root`


ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
cd $ROOT_DIR

printf 'Installing dependencies...\n'
# All `prepare` scripts are run in this step.
pnpm install --frozen-lockfile

# Then build the apps:
pnpm --filter @zooniverse/fe-project build
pnpm --filter @zooniverse/fe-root build

echo 'Done!'
