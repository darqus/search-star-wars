#!/bin/bash

cdate=`date +"%Y-%m-%d %T"`

coment='upload '$cdate
echo $coment

vue-cli-service build

git checkout gh-pages

git add /dist

git commit -m "$coment"

git push

git checkout main
