#!/bin/bash

VERSION=`grep -o '"version": "[^"]*' package.json | grep -o '[^"]*$'`
CDATE=`date +"%Y-%m-%d %T"`

sed -i "s/^VUE_APP_BUILD_DATA.*/VUE_APP_BUILD_DATA=$CDATE/g" .env.local

prop="version"
VERSION="$(node -e "console.log(require('./package.json')['$prop'])")"
echo "$prop: '$VERSION'"
sed -i "s/^VUE_APP_VERSION.*/VUE_APP_VERSION=$VERSION/g" .env.local

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
