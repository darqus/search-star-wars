#!/bin/bash

CDATE=`date +"%Y-%m-%d %T"`
echo $CDATE

sed -i "s/^VUE_APP_BUILD_DATA.*/VUE_APP_BUILD_DATA=$CDATE/g" .env.local
