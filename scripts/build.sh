#!/bin/sh

# prevent the rest of the shell script from executing if an error occurs
set -e

npm run type-check # must happen before `next build` because `next build` depends on generated-cmk types to do its own type-checking
npx next build --turbopack
