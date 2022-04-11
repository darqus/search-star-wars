#!/bin/bash

cdate=`date +"%Y-%m-%d %T"`

coment='upload '$cdate
echo $coment

vue-cli-service build

git checkout gh-pages

cp -r ../ssw_dist /dist

git add /dist

git commit -m "$coment"

git push

git checkout main
