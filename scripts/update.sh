#!/bin/sh

# prevents the rest of the shell script from executing if an error occurs
set -e

npm install
npx npm-check-updates -u
rm -rf node_modules
rm package-lock.json
npm install
