#!/bin/sh

# prevents the rest of the shell script from executing if an error occurs
set -e

npx next telemetry disable
npm run type-check
npm run script-lint-check
npm run style-lint-check
npm run test -- --watch=false
npm run format-check
