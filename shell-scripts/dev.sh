#!/bin/sh

npx concurrently "npx next dev --turbopack" "npx hcm 'src/**/*.module.css' --arbitraryExtensions --watch"
