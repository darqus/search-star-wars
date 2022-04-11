#!/bin/bash

vue-cli-service build

git checkout gh-pages

git add .

data=$Y$M$D$H$M$S
echo $data
echo 'upload'

git commit -m "upload $data"

git push

git checkout main
