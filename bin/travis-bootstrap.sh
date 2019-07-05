#!/usr/bin/env bash
set -ev

# Script for bootstrapping the monorepo into a working state for Travis.
#
# Runs the following tasks in order:
#   - Install top level dependencies

(cd $TRAVIS_BUILD_DIR && yarn install)

