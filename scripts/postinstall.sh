#!/bin/sh

# prevents the rest of the shell script from executing if an error occurs
set -e

npx next telemetry disable
npm run types
npm run lint
npm run test -- --watch=false

