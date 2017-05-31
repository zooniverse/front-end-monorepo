#!/usr/bin/env bash

# Convert grommet-core scss files to Stylus using http://sass2stylus.com

BASE_DIR="$(unset CDPATH && cd "$(pwd)/.." && pwd)"
GROMMET_DIR="$BASE_DIR/node_modules/grommet/scss/grommet-core"
STYLUS_DIR="$BASE_DIR/stylus"

SCSS_FILES=$(find $GROMMET_DIR -type f -name '*.scss')

CURL_ARGS="--silent --show-error --request POST"
URL="http://sass2stylus.com/api"

for f in $SCSS_FILES
do
  REL_PATH=`perl -e 'use File::Spec; print File::Spec->abs2rel(@ARGV) . "\n"' $f "$GROMMET_DIR"`
  DEST_FILE="$STYLUS_DIR/grommet-core/${REL_PATH%.*}.styl"
  
  echo "Converting grommet-core/$REL_PATH..."

  mkdir -p "$(dirname "$DEST_FILE")"
  curl $CURL_ARGS --form "file=@$f" $URL > $DEST_FILE
done

