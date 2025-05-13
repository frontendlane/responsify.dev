#!/bin/sh

npx concurrently "npx astro dev" "npx hcm 'src/**/*.module.css' --arbitraryExtensions --watch"
