#!/bin/zsh
# find and delete all 'scripts' folders from ./public/pages
find ./public/pages -type d -name 'scripts' -exec rm -rf '{}' +
