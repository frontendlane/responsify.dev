#!/bin/sh

# prevents the rest of the shell script from executing if an error occurs
set -e

npx next telemetry disable
npm run type-check
npm run lint
npm run test -- --watch=false

