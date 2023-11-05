#!/bin/zsh
# delete index.html file in the root folder
rm ./index.html
# find and delete all .html files at ./public/pages
find ./public/pages -type f -name '*.html' -delete
