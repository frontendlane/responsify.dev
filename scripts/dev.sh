#!/bin/sh

# ensures typescript definition files for css modules are generated on the fly during development
npx concurrently "npx next dev" "npx hcm 'src/**/*.module.css' --arbitraryExtensions --watch" # --turbopack source map URLs are invalid in Firefox and you can't find them in DevTools 👎 not exact issue, but related: https://github.com/vercel/next.js/issues/9471
