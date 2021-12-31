#!/bin/zsh
# TODO: make this more robust for future pages by (1) ignoring non-html files (2) making an exception for index.html (3) maintaining folder structure
# copy index.html from ./src/pages/index to root folder
echo "cp ./src/pages/index/index.html ./index.html"
cp ./src/pages/index/index.html ./index.html
