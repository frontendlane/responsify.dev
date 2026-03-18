#!/bin/sh

# prevent the rest of the shell script from executing if an error occurs
set -e

rm -rf .next/ # deletes typescript definitions for routes
npx next typegen # generates typescript definitions for routes https://nextjs.org/blog/next-15-5#typed-routes-stable
npx cmk --pretty --clean # generates typescript definitions for css modules
npx tsc "$@" # "$@" enables --watch being passed as an argument when executing this script
