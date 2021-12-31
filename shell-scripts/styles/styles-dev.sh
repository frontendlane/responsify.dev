#!/bin/zsh
zsh ./shell-scripts/styles/styles-cleanup.sh
# transform .pcss files at ./src/pages into .css files at ./public/pages | --base preserves folder structure | --verbose logs the result of each transformation, useful when watching
yarn postcss ./src/pages/**/*.pcss --dir ./public/pages --ext css --base ./src/pages --watch --verbose --env dev
