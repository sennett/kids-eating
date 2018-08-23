#!/bin/bash
echo not complete - for now, build using build.js, manually stage and commit files in /docs for now, then push to origin master
exit 1
set -e

cp -r build/* docs
git checkout master
cd docs
git add $(git rev-parse --show-toplevel)
git commit -m 'release'
git push -u origin master