#!/bin/zsh
echo "nvm install node"
nvm install node
echo "node -v > .nvmrc"
node -v > .nvmrc
echo "nvm use"
nvm use
echo "npm install yarn -g"
npm install yarn -g
echo "yarn set version stable"
yarn set version stable
echo "yarn add yarn-upgrade-all"
yarn add yarn-upgrade-all
