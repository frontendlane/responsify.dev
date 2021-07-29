# Responsify
Responsify generates a CSS `calc()` value that gradually changes an element's `width`, `padding`, `font-size`, etc. between two viewport sizes. Unlike `%` or `vw`, generated `calc()` value can change at nonproportional and negative rate. A common use case is to transform adaptive design based on @media queries into fluid design.

## Notes
- in place of `npx` type `yarn`
- postcss
    - used in place of Sass/SCSS
    - processes styles via `postcss-cli` because doing otherwise would create a depencencu on JavaScript for styles to be loaded
- `browserslist` added to package.json for clarity
- radio and checkbox `<input>`s should be inside the `<label>` so the space between is clickable
- form design
    - no js: disabled attribute on all form controls in HTML
    - js: store everything to localstorage and read from there
- doge px size is optimized even if the users has 72px default font-size (including width and height attributes)
- constants.ts universal truths or front-end truths

## Todos
- example div rainbow colors when calc is in use
- input, select, checkbox border color is not standardized
- history of previous generated calc values
- some of the examples are not realistic e.g. clamp on 300px
- example 5: A mobile breakpoint + max() + ch(if it can be supported in _responsify.scss)
- taller screen recording
    - instead of `<img>` use `<div>`
    - div initial width should be 90%
    - dark and light variants
    - localhost in URL
    - leave a bit of time waiting at the initial/lower viewport to avoid "skipping" loop
- Safari doesn't support media attribute on `<source>` inside `<video>`
- VoiceOver bug with "technique for implementing a completely fluid design": emoji is read first, then text
- Chrome bug `<input for="datalist">` inside `<li>` inside `<ol>`
- state of details open vs close should be kept in sessionStorage
- increase padding on non .section-details (and make sure to update the responsified transition from mobile to desktop)
- opening details shifts it a bit
- differentiate between soft and hard reload using service worker (response 200 vs 304)
- focus restoration: restore window.document.activeElement if there is one. if not then focus the form
- test aria-atomic
- update `__responsify.scss` to support `ch`
- add vh unit
- add video closed captions
- add to .vscode/settings.json public folder
- pre-commit hook that blocks commits if there's "TODO" anywhere in the repo
    - TODO: make sure the path is correct i.e. figure out a way that only the public/ folder is published and that it is the root of the project
- typescript error
    let num1: number | undefined;
    let num2: number | undefined;

    if (![num1, num2].includes(undefined)) {
        console.log(num1 / 50); // error 2532
        console.log(num2 / 50); // error 2532
    }
- does html minification make much sense if i gzip .html file(s)?
- go through pcss file and catalogue every color (move to CSS custom properties). colors in pcss should not be expressed in hex values
- kbd styles can be improved
- add diagonal colored backgorund bars on .noscript and .js-error with infinite animation
- system font stack
- Sort HTML attributes rbalet.vscode-sorting-attrs
    - class
    - id
- postcss
    - postcss-assets (inlining background-images, cache busting, etc.)
    - postcss-hocus
        - actually i want to have different styles for hover and focus, so i can hover while focusing :D
    - cssnano
    - postcss-nested
    - postcss-assets
        - cachebusting for images
        - inlines images
    - stylelint
        - stylelint-order
    - postcss-import?? does this combine multiple stylesheets into one file iin order to limit to one http request??
    - https://github.com/hail2u/node-css-mqpacker?? does this make delived css smaller??
    - postcss-pxtorem??
    - postcss-line-height-px-to-unitless??
- prettier
    - css formatting?? turn off for `*.css` / `*.pcss` as that will be handled by stylelint?? but keep for `*.ts`
- webkit bug
- eslint
- webpack-dev-server
- build step
    - description that gets pushed everywhere
    - dynamically pull list of CSS properties from official website
    - restrict the width of the input to the length of the longest CSS property
- favicon
- why does webpack transform `while` loop to `for` loop when it shouldn't
- improve animated border
    - does this provide any optimization
        https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/
        https://developpaper.com/hardware-acceleration-of-css-animation/
        https://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css
        https://www.smashingmagazine.com/2012/06/play-with-hardware-accelerated-css/
        https://stackoverflow.com/questions/10014461/why-does-enabling-hardware-acceleration-in-css3-slow-down-performance
        https://blog.novanet.no/improve-rendering-performance-with-css3-enabled-hardware-acceleration/
        https://news.ycombinator.com/item?id=26207635
        https://www.protechtraining.com/blog/post/viewing-hardware-acceleration-in-css-619
        https://developer.chrome.com/blog/hardware-accelerated-animations/
        https://speakerdeck.com/ariya/tweaking-css3-for-hardware-acceleration
        https://www.tomshardware.com/news/google-chrome-browser-gpu-acceleration,14384.html
        https://dev.opera.com/articles/css-will-change-property/
        https://arstechnica.com/information-technology/2012/06/css-filter-effects-get-gpu-accelerated-in-chrome/
        https://stackoverflow.com/questions/8783973/does-animating-the-value-of-a-css3-transform-with-javascript-rule-out-hardware-a
        https://developer.mozilla.org/en-US/docs/Web/Performance/Fundamentals
        https://www.joshwcomeau.com/animation/css-transitions/ -->
        will-change: transform;
    - does translate3d optimize better than translateX
- https://github.com/browserslist/browserslist
- remove unnecessary package.json properties
