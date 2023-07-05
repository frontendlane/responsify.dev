# Responsify

Source code for https://responsify.dev.

## Tech stack

-   `nvm use` (make sure you're using the correct Node version, cannot be automated as part of package.json script)
-   VS Code (extensions, etc.)
-   Astro
-   Preact
    -   React Form Hook
    -   Zod
-   TypeScript
-   PostCSS (postcss language support vs code extension)
-   CSS modules
-   Axe
-   Percy
-   Cloudflare Registrar
-   Cloudflare Pages
-   Google Search Console

vanilla-extract to replace PostCSS and CSS modules at some point in the future

## Notes

-   move all astro components to Preact
-   astro file download bug: name needs to be supplied
-   astro plugin that appends <link> with all styles @media (scripting: none)
-   missing dependencies when pnpm install
-   improve typescript usage: https://docs.astro.build/en/guides/imports/#typescript
-   browserslist??
-   // TODO: ship source map in production as well https://www.ctrl.blog/entry/deploy-javascript-source-maps.html
-   hover over anchors shows tooltip
-   extract reusable components to ui folder and keep content-components in components

-   optimize the page for reader view
-   accessibility and privacy as separate pages??
-   disable astro telemetry
    `astro telemetry disable`
    `ASTRO_TELEMETRY_DISABLE=1`
-   I thought that video shouldn't go to the top of the page because there it would always visible and would distract repeat visitors. but, when i implement linkable sections then repeat visitors should bookmark the #form to avoid being distracted by the intro video. alternatively, index.html can become an iframe, and the landing page can become intro.html
-   postcss
    -   used in place of Sass/SCSS
    -   processes styles via `postcss-cli` because doing via webpack would create a dependency on JavaScript for styles to be loaded
-   `browserslist` added to package.json for clarity
-   form design
    -   no js: disabled attribute on all form controls in HTML
    -   js: store everything to localStorage and read from there
-   per https://github.com/browserslist/browserslist/issues/492#issuecomment-640254935, no need to update caniuse-lite database, rather update all dependencies before `yarn run build:prod`
-   put/use trailing slash in URLs
-   create development and production builds
    -   development build should have source maps
        -   postcss
            -   --map / --no-map
            -   --verbose to let you know when a build occurs
-   Naming pairs
    -   **shared - individual** (used in this project to distinguish between code that's reused and not)
    -   general - specific
    -   global - local
    -   public - private
    -   core - edge
    -   common - rare
    -   previous - next
    -   preceding - following

# extract out of this project to anki?? or somewhere else

-   radio and checkbox `<input>`s should be inside the `<label>` so the space between is clickable
-   constants.ts universal truths or front-end truths??
-   `border-radius` on `<video>` in Firefox changes video colors
-   submit button on iphone is bolded

## Todos

### move to astro

-   move to astro
    -   postcss.config.cjs + .brwoserslistrc + package.json(devDependencies + scripts) + shell-scripts
        -   cssnano-preset-default preset does only safe transforms
    -   cloudflare
        -   does nvm need to be installed??
        -   remove CNAME file
-   keep
    -   unorphan
    -   form initial values (necessary because user preference is stored in local/session storage)
    -   enable form controls
    -   event listeners
        -   submit
        -   reset
        -   copy email
        -   form change
-   remove
    -   restore users position seems unnecessary and buggy on top of that
    -   init.sh
    -   remoe zsh from shell scripts
-   todo
    -   .npmrc vs .nvmrc
    -   pnpm.io/npmrc
    -   for development I'm fine with using nvm because I'll continue using it in the future. for deployment it's unnecessary to have nvm, I can just install the node version I need, especially if it's being deployed in a CI/CD pipeline that discards the build environment after building the site. more research needed here
        -   nvm should be installed via homebrew

### this commit

-   pressing reset button after generating css code produces a bug
-   `:any-link` instead of `a` (this probably only needs fixing in reset.scss and globals.pcss)
-   fix sass function not being downloadable
-   .link::before: https://www.stefanjudis.com/today-i-learned/box-decoration-break-helps-to-define-how-elements-should-be-rendered-across/

-   dark theme
    -   https://twitter.com/__jakub_g/status/1478847423913107456
    -   https://web.dev/color-scheme/#background
    -   https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
-   move to 11ty

    -   https://www.aleksandrhovhannisyan.com/blog/eleventy-the-good-the-bad-and-the-possum/
    -   https://www.11ty.dev/docs/tutorials/
    -   https://www.11ty.dev/docs/samples/

    typescript https://github.com/c0derabbit/eleventy-starter-typescript/
    typescript, postcss https://github.com/cbergen/11ty-nostrils
    typescript, css modules https://github.com/cbergen/11ty-nostrils
    postcss https://github.com/philhawksworth/eleventyone
    cache busting https://github.com/deviousdodo/elevenpack
    11ty.js https://github.com/brycewray/eleventy_solo_starter_njk
    11ty.js https://gitlab.com/reubenlillie/eleventy-dot-js-blog#readme
    webp https://github.com/gregives/twelvety
    rss https://github.com/equinusocio/xity-starter
    rss https://github.com/Ewan-D/beginnersBase11ty
    eslint, prettier, postcss https://github.com/ixartz/Eleventy-Starter-Boilerplate/

-   unorphan: if either of the words surrounding the non-breaking space are longer than 1/4 of the parent's width then don't unorphan
    -   https://frontendfoc.us/link/129367/web
    -   https://cloudfour.com/thinks/responsive-headlines-are-about-to-get-awesome/
-   overflowing `<pre>` seem to need tabindex on safari for scrolling
-   https://modern-fluid-typography.vercel.app/
-   video

    -   narrate the video
    -   create a shell script that generates all the formats
    -   record only in dark theme
    -   avc (h.264) [containers: 3GP, MP4]
    -   HEVC (H.265) [containers: MP4]
    -   Theora [containers: Ogg]
    -   VP8 [containers: 3GP, Ogg, WebM]
    -   VP9 [containers: MP4, Ogg, WebM]
    -   av1 [containers: ISOBMFF, MPEG-TS, MP4, WebM]

    -   caniuse.com
    -   https://en.wikipedia.org/wiki/HTML5_video
    -   https://developer.android.com/guide/topics/media/media-formats
    -   https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs
    -   leave a bit of time waiting at the initial/lower viewport to avoid "skipping" loop
    -   https://www.iandevlin.com/blog/2012/12/html5/html5-video-for-retina-displays/
    -   264, 265, vp9??
    -   https://www.filamentgroup.com/lab/video-with-sizes/
    -   https://www.ctrl.blog/entry/html-responsive-video.html
    -   https://web.dev/lazy-loading-video/

    -   https://clubmate.fi/what-does-the-preload-attribute-in-the-video-element-do
    -   https://github.com/whatwg/html/issues/6363
    -   responsive poster image
        -   `poster="data:image/svg+xml,<svg><foreignObject><picture><source …/>…</picture></foreignObject></svg>"`
        -   ask utopia guys what breakpoints they use for responsive images. because those only work with specific resolutions what do they use?? an option for me is to have one at every 100px

-   https://zellwk.com/blog/publish-to-npm/
-   better comparison with css locks:
    -   https://chrisburnell.com/clamp-calculator/
        -   https://tbrown.org/notes/2012/02/03/molten-leading-or-fluid-line-height/ 3 February 2012
        -   https://css-tricks.com/viewport-sized-typography/ 30 April, 2012
        -   https://trentwalton.com/2012/06/19/fluid-type/ 19 June 2012
        -   https://www.madebymike.com.au/writing/precise-control-responsive-typography/ 17th March 2015
        -   https://eduardoboucas.com/blog/2015/06/18/viewport-sized-typography-with-minimum-and-maximum-sizes.html 18 June 2015
        -   https://css-tricks.com/molten-leading-css/ 2 June 2016
        -   https://blog.typekit.com/2016/08/17/flexible-typography-with-css-locks/ 17 August 2016
        -   https://fvsch.com/css-locks September 2016
        -   https://adrianroselli.com/2019/12/responsive-type-and-zoom.html 6 December 2019
        *   https://utopia.fyi/blog/clamp/
        *   https://utopia.fyi/type/calculator/
        *   https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ + check out all linked resources
        *   https://typetura.com/
        *   https://piperhaywood.com/fluid-type-sizes-and-spacing/
        *   https://twitter.com/hovhaDovah/status/1476677678044434435
    -   https://github.com/arielsalminen/Molten-Leading
    -   https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
    -   https://www.smashingmagazine.com/2022/08/fluid-sizing-multiple-media-queries/
    -   https://min-max-calculator.9elements.com/

### next commit

-   tabindex on `<pre>` for chrome
-   add postcss plugin that supports vi and vb units
-   https://css-tricks.com/how-do-you-remove-unused-css-from-a-site/
-   handle edge case when parent/viewport lower and upper bound are the same
-   edge case when it's the same percentage value e.g. width: calc(0px + 7.813vw); /_ https://responsify.dev - viewport lower bound: 320px; viewport upper bound: 1024px; element lower bound: 25px; element upper bound: 80px; _/
-   research vscode capabilities and options and add them to `.vscode` folder
    -   Sort HTML attributes rbalet.vscode-sorting-attrs
        -   class
        -   id
-   system font stack
-   :hover on interactives needs to be perceivable: box-shadow maybe??
    -   joshwcomeau.com/shadow-palette/
    -   hover on link isn't perceivable
-   input, select, checkbox border color is not standardized

### future commits

-   get types for classes imported from css modules: ts-css-modules-vite-plugin
-   extract styles into a classless css
    -   https://github.com/dbox/html5-kitchen-sink/
-   extract unorphan into a separate npm package
    -   WONTFIX: unorphaning `display: none;` elements
    -   WONTFIX: do this for CSS content as well
    -   there's a different way to unrphan and that's with `<br>`. replace penultimate whitespace with `<br>`, assign it an `id` possibly and style it with media queries
    -   https://mnater.github.io/Hyphenopoly/
-   Chrome and Safari differently/incorrectly handle 100% width on ::before pseudo-element
-   linter for http URLs (should be https)
-   automatically generate table of contents
    -   https://css-tricks.com/a-perfect-table-of-contents-with-html-css/
-   input[type="number"] doesn't support localized comma for decimal separator (investigate and look for possible solution in https://www.ctrl.blog/entry/html5-input-number-localization.html)
-   hotlink protection??
-   add csp?? https://www.ctrl.blog/entry/safari-csp-media-controls.html
-   break down each section into its own \*.specifics.pcss file
-   use leading underscore to indicate pcss partials that shouldn't be converted into `.css` e.g. `_examples.specifics.pcss`
-   `pages` script should only copy .html files
-   `assets-videos` script should only copy .mov files
-   go through pcss file and catalogue every color (move to CSS custom properties). colors in pcss should not be expressed in hex values
-   kbd styles can be improved
-   add diagonal colored background bars on .noscript and .js-error with infinite animation
-   every section heading should show you how to copy URl to that section, kinda like GitHub does it, but is it the most accessible solution??
-   if URL contains hash that points to form then focus the first input field
-   Self-hosted on a 2013 MacBook Pro. will it??
-   publish postcss as `responsify` or `@fel/responsify` package.json
    -   https://github.com/bramstein/postcss-scale
        -   contribute to the plugin by fixing issues
-   `<code>` font-size changes when `<details>`/`<summary>` is toggled??
-   update-all npm script: https://flaviocopes.com/update-npm-dependencies/
-   history of previously generated calc values
-   Safari doesn't support media attribute on `<source>` inside `<video>`
-   VoiceOver bug with "technique for implementing a completely fluid design": emoji is read first, then text
-   Chrome bug `<input for="datalist">` inside `<li>` inside `<ol>`
-   differentiate between soft and hard reload using service worker (response 200 vs 304)
    -   clear the form on hard reload
    -   state of details open vs close should be kept in sessionStorage??
-   focus restoration: restore window.document.activeElement if there is one. if not then focus the form
-   use jest for testing, and inside it use puppeteer, not jsdom
-   test aria-atomic
-   update `__responsify.scss` to support `ch`
-   add vh unit
-   add video closed captions
-   pre-commit hook that blocks commits if there's "TODO" anywhere in the repo
    -   TODO: make sure the path is correct i.e. figure out a way that only the public/ folder is published and that it is the root of the project
-   typescript error
    let num1: number | undefined;
    let num2: number | undefined;

    if (![num1, num2].includes(undefined)) {
    console.log(num1 / 50); // error 2532
    console.log(num2 / 50); // error 2532
    }

-   does html minification make much sense if i gzip .html file(s)?
-   compare and pick the smallest minified css out of the list: https://github.com/GoalSmashers/css-minification-benchmark
-   postcss
    -   https://github.com/eduardoboucas/postcss-cssential
    -   postcss-extract-media-query
        -   for each media query type there should be a separate css file that is linked to from index.html
            https://pepelsbey.dev/articles/conditionally-adaptive/
    -   postcss-assets (inlining background-images, cache busting, etc.)
    -   postcss-nested
    -   postcss-assets
        -   cachebusting for images
        -   inlines images
    -   stylelint (vs code extension)
        -   stylelint-order
    -   https://github.com/hail2u/node-css-mqpacker?? unsupported and deprecated, find alternative. does this make delived css smaller??
    -   postcss-pxtorem??
    -   postcss-line-height-px-to-unitless??
-   prettier
    -   css formatting?? turn off for `*.css` / `*.pcss` as that will be handled by stylelint?? but keep for `*.ts`
-   css-bug-webkit
-   eslint (vs code extension)
-   webpack by default introduces unnecessary boilerplate related to importing and exporting modules (right?) and is there a way to remove that and use plain import/export syntax??
-   build step
    -   restrict the width of the input to the length of the longest CSS property (puppeteer)
    -   dynamically pull list of CSS properties from official website and add the date of which the list is updated to the footer or some other place
        -   filter out properties that cannot accept a px value
-   favicon
-   why does webpack transform `while` loop to `for` loop when it shouldn't??
-   https://github.com/browserslist/browserslist
-   remove unnecessary package.json properties
-   graphical input: two-axis graph with x axis from 320 to maximum supported viewport with dropdown to select vw or %, left y axis from -100 to +100 with dropdown to select unit and right y axis with a different unit that spans the same distance as the left one (actually those two are in sync, if one changes the other changes as well). and you can add points, move them around. you can also select your target browser support list so that certain options are excluded from the generated code e.g. instead of clamp() @media query is used
-   code block: http://midasjs.com/
    -   https://shiki.matsu.io/
-   copy to clipboard and other notifications: https://codepen.io/jkantner/pen/XWzePgp
-   reset.pcss
    https://baymard.com/blog/line-length-readability
    https://blog.eleven-labs.com/en/responsive-accessible-typography/
    https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/
    https://www.thegoodlineheight.com/
    https://www.trysmudford.com/blog/a-good-reset/
    https://www.joshwcomeau.com/css/custom-css-reset/#digit-tweaking-line-height

# Technologies

## Node + nvm (via homebrew)

Version 19.8.1

## pnpm

Version 7.30.5

_Note: currently using npm instead of pnpm until this issue is resolved: https://github.com/pnpm/pnpm/issues/6759_

## Astro

## TypeScript

## Preact

Astro + Prettier doesn't handle whitespaces the same way (correct way) that it does in React/Preact components. Hence, only use Astro components for pages. Do not place any content in Astro components precisely because of the whitespace rendering issues. All content must originate from Preact components.

preact dev tools: https://preactjs.github.io/preact-devtools

## Netlify + Netlify Forms

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
