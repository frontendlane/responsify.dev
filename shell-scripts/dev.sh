#!/bin/sh

npx concurrently "npx next dev --turbopack" "npx hcm 'src/**/*.module.css' --arbitraryExtensions --watch" # --turbopack source map URLs are invalid in Firefox and you can't find them in DevTools 👎 not exact issue, but related: https://github.com/vercel/next.js/issues/9471
