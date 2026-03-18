#!/bin/sh

npm run zip
npx next dev --turbopack
# TODO: ensures typescript definition files for css modules are generated on the fly during development
