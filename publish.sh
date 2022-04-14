#!/bin/bash

VERSION=`grep -o '"version": "[^"]*' package.json | grep -o '[^"]*$'`
CDATE=`date +"%Y-%m-%d %T"`
COMMENT='v: '$VERSION' from '$CDATE

echo
echo 'git commit message:'
echo '"'$COMMENT'"'
echo

vue-cli-service build

git checkout gh-pages

rm -r dist/
cp -r ../ssw_dist ./dist

git add .
git commit -m "$COMMENT"
git push
git checkout main
