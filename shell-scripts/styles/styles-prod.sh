#!/bin/zsh
# transform .pcss files at ./src/pages into .css files at ./public/pages | --base preserves folder structure
echo "yarn postcss ./src/pages/**/*.pcss --dir ./public/pages --ext css --base ./src/pages --env prod"
yarn postcss ./src/pages/**/*.pcss --dir ./public/pages --ext css --base ./src/pages --env prod
