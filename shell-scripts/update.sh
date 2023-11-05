#!/bin/zsh
# update nvm
echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | zsh"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | zsh
echo "nvm install node"
nvm install node
echo "nvm use node"
nvm use node
echo "npm install yarn -g"
npm install yarn -g
echo "yarn set version stable"
yarn set version stable
echo "yarn install"
yarn install
echo "yarn yarn-upgrade-all"
yarn yarn-upgrade-all
# alternative to yarn-upgrade-all: https://www.npmjs.com/package/npm-check-updates: updates dependencies to latest *major* version
