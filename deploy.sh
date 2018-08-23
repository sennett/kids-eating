#!/bin/bash
echo not complete
exit 1
set -e

cp -r build/* docs
git checkout master
cd docs
git add $(git rev-parse --show-toplevel)
git commit -m 'release'
git push -u origin master