#!/bin/bash

VERSION=`grep -o '"version": "[^"]*' package.json | grep -o '[^"]*$'`
CDATE=`date +"%Y-%m-%d %T"`

sed -i "s/^VUE_APP_BUILD_DATE.*/VUE_APP_BUILD_DATE=$CDATE/g" .env.local

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

# Store current branch
CURRENT_BRANCH=$(git branch --show-current)

# Temporarily store the dist folder
cp -r dist ../temp_dist_$(date +%s)
TEMP_DIR="../temp_dist_$(date +%s)"

git checkout gh-pages

# Clean and copy the new build files
rm -rf dist/
mkdir -p dist/
cp -r ../temp_dist_*/* dist/

# Clean up temporary folder
rm -rf ../temp_dist_*

git add .
git commit -m "$COMMENT"
git push

# Return to original branch
git checkout $CURRENT_BRANCH
