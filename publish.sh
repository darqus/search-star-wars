#!/bin/bash

VERSION=`grep -o '"version": "[^"]*' package.json | grep -o '[^"]*$'`

CDATE=`date +"%Y-%m-%d %T"`

COMMENT='dateTime: '$CDATE', v: '$VERSION
echo 'commit name: '$COMMENT

vue-cli-service build

git checkout gh-pages

rm -r dist/

cp -r ../ssw_dist ./dist

git add .

git commit -m "$COMMENT"

git push

git checkout main
