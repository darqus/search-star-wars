#!/bin/bash

CDATE=`date +"%Y-%m-%d %T"`
echo $CDATE

sed -i "s/^VUE_APP_BUILD_DATE.*/VUE_APP_BUILD_DATE=$CDATE/g" .env.local

prop="version"
VERSION="$(node -e "console.log(require('./package.json')['$prop'])")"
echo "$prop: '$VERSION'"

sed -i "s/^VUE_APP_VERSION.*/VUE_APP_VERSION=$VERSION/g" .env.local
