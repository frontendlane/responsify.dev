# Responsify

Source code for https://responsify.dev.

## Todos

-   eslint ban `:root` css selector and enforce html is used
    -   html has lower specificity (easier to override)
    -   :root _could_ apply to SVG elements (more explicit that we are targeting root "html" element)
    -   css variables declared on both are inherited
-   testing
    -   go through https://testing-library.com/docs/react-testing-library/intro/
    -   https://vitest.dev/guide/browser/
        -   youtube "lwj: use vitest with browser mode" @31:45
        -   seems like I can get rid of the testing library as a dependency in this case because vitest (or its preview provider dependencies) will provide me with the building blocks to test the ui
-   sparkes
    -   allow `<Sparkles />` to accept position="background" or position="foreground" prop that would determine zIndex
    -   Sparkles are only generated when the element's on-screen, using the IntersectionObserver API.
    -   https://github.com/kmjennison/react-sparkle?tab=readme-ov-file
-   https://codepen.io/jh3y/pen/LYJMPBL
-   format on postinstall
-   eslint
    -   @typescript-eslint all rules
-   pressing reset button after generating css code produces a bug in firefox (bug is in the intersection of following things: my laptop, firefox/safari, and <pre> being inside <output>, preact? vs react?)
-   tabindex on `<pre>` for chrome
-   overflowing `<pre>` seem to need tabindex on safari for scrolling
-   https://shkspr.mobi/blog/2024/10/using-a-css-cursor-to-show-the-external-links-favicon/
-   Chrome and Safari differently/incorrectly handle 100% width on ::before pseudo-element
-   Chrome bug `<input for="datalist">` inside `<li>` inside `<ol>`
-   replace `<input type="number">` with `<input inputMode="numeric">`??
-   fix sass function zip including "public" folder
-   flip the order in the table, put Responsify first. Change the table caption to Responsify vs CSS locks
-   `:any-link` instead of `a` (this probably only needs fixing in reset.scss and globals.pcss)
-   :hover on interactives needs to be perceivable: box-shadow maybe??
    -   joshwcomeau.com/shadow-palette/
    -   hover on link isn't perceivable
-   handle edge case when parent/viewport lower and upper bound are the same
-   edge case when it's the same percentage value e.g. width: calc(0px + 7.813vw); /_ https://responsify.dev - viewport lower bound: 320px; viewport upper bound: 1024px; element lower bound: 25px; element upper bound: 80px; _/
-   skip link to the form
-   skip to top of the page (should focus the generic "skip to content" link, in this case "skip to form" link)
-   link hover path: .link::before: https://www.stefanjudis.com/today-i-learned/box-decoration-break-helps-to-define-how-elements-should-be-rendered-across/
-   add diagonal colored background bars on .noscript and .js-error with infinite animation
-   every section heading should show you how to copy URl to that section, kinda like GitHub does it, but is it the most accessible solution??
-   if URL contains hash that points to form then focus the first input field??
-   instead of the code comment, create a custom URL which can be used to extract form values from the URL. that way you only have to save the url as the comment (see `generate.ts`)
    -   https://aurorascharff.no/posts/managing-advanced-search-param-filtering-next-app-router/
-   emoji
    -   https://fullystacked.net/using-emoji-on-the-web/
-   https://www.erikkroes.nl/blog/the-universal-focus-state/#show-me-how
    -   https://daverupert.com/2024/01/focus-visible-love/
    -   https://benmyers.dev/blog/whcm-outlines/
    -   https://medienbaecker.com/articles/focus-outlines
-   help filling out the form (both of these features are called autofill in chrome)
    -   autocomplete: browser offers to complete the form once user starts typing into one of the fields
    -   autofill: browser pre-populating the login form on page load
    -   https://github.com/matteobad/detect-autofill + https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
-   input[type="number"] doesn't support localized comma for decimal separator (investigate and look for possible solution in https://www.ctrl.blog/entry/html5-input-number-localization.html)
-   update `__responsify.scss` to support `ch`
    -   https://techhub.iodigital.com/articles/going-beyond-pixels-and-rems-in-css/relative-length-units-based-on-font
-   add vh unit in the form
-   copy to clipboard and other notifications: https://codepen.io/jkantner/pen/XWzePgp
-   history of previously generated calc values
-   custom eslint rule for http URLs (should be https)
-   https://flaviocopes.com/update-npm-dependencies/
-   code block: http://midasjs.com/
    -   https://shiki.matsu.io/
    -   prism.js
    -   https://github.com/williamtroup/Syntax.js
    -   https://github.com/MarketingPipeline/Termino.js
    -   https://expressive-code.com/
-   reset.pcss
    -   https://github.com/dbox/html5-kitchen-sink/
    -   https://baymard.com/blog/line-length-readability
    -   https://blog.eleven-labs.com/en/responsive-accessible-typography/
    -   https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/
    -   https://www.thegoodlineheight.com/
    -   https://www.trysmudford.com/blog/a-good-reset/
    -   https://www.joshwcomeau.com/css/custom-css-reset/#digit-tweaking-line-height
    -   https://jakelazaroff.com/words/my-modern-css-reset/
-   video
    -   https://scottjehl.com/posts/using-responsive-video/ + https://scottjehl.com/posts/rwd-video/
    -   https://jakearchibald.com/2024/video-with-transparency/
    -   https://fullystacked.net/av1/
    -   https://web.dev/articles/lazy-loading-video
    -   narrate the video?
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
    -   Safari doesn't support media attribute on `<source>` inside `<video>`
    -   add video closed captions
-   meta tags
-   favicon
-   color schemes:
    -   input, select, checkbox border color is not standardized
    -   accent: https://fullystacked.net/posts/accentcolor/
    -   https://twitter.com/__jakub_g/status/1478847423913107456
    -   https://web.dev/color-scheme/#background
    -   https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
    -   https://css-tricks.com/come-to-the-light-dark-side/
-   font optimizations
    -   system font stack: https://news.ycombinator.com/item?id=35150345
    -   https://web.dev/articles/adapting-typography-to-user-preferences-with-css
    -   https://modern-fluid-typography.vercel.app/
-   breakpoints
    -   https://www.freecodecamp.org/news/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862/
-   browserslist??
    -   per https://github.com/browserslist/browserslist/issues/492#issuecomment-640254935, no need to update caniuse-lite database, rather update all dependencies before `yarn run build:prod`
-   datalist from https://www.w3.org/Style/CSS/all-properties.en.json
    -   const propertyNames = new Set(response.map(property => property.property));
    -   restrict the width of the input to the length of the longest CSS property (playwright??)
    -   dynamically pull list of CSS properties from official website and add the date of which the list is updated to the footer or some other place
    -   filter out properties that cannot accept a px value
-   https://cloudfour.com/thinks/responsive-headlines-are-about-to-get-awesome/
-   hyphenation
    -   https://github.com/mnater/Hyphenopoly
    -   https://frontendfoc.us/link/129367/web
    -   https://github.com/ytiurin/hyphen
-   differentiate between soft and hard reload using service worker (response 200 vs 304)
    -   clear the form on hard reload
    -   state of details open vs close should be kept in sessionStorage??
-   put/use trailing slash in URLs
-   disable next.js telemetry
-   deploying Next.js: https://www.youtube.com/watch?v=sIVL4JMqRfc&pp=ygUgc3RhbmRhbG9uZSBuZXh0LmpzIHJvYiBkZXBsb3lpbmc%3D + https://nextjs.org/docs/pages/building-your-application/deploying + https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
-   // TODO: ship source map in production as well https://www.ctrl.blog/entry/deploy-javascript-source-maps.html
-   caching: https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/set-browser-ttl/
-   make www.responsify.dev canonical
-   optimize what google uses as the snippet: https://www.gsqi.com/marketing-blog/how-to-use-data-nosnippet/
-   prevent link rot: https://remysharp.com/2023/12/04/unrot-that-link
-   investigate how to ensure hotlink protection
-   https://www.sjoerdlangkemper.nl/2024/11/27/avoid-hotlinking-images-with-corp-cross-origin-resource-policy/
-   add csp?? https://www.ctrl.blog/entry/safari-csp-media-controls.html
-   content: https://documentation.divio.com/
    -   better comparison with css locks:
        -   add a note that responsify can't work with properties that accept non-number values (also, remove these values from the CSS property form input)
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
            -   https://news.ycombinator.com/item?id=39682871
            -   https://news.ycombinator.com/item?id=43205968
        -   https://github.com/arielsalminen/Molten-Leading
        -   https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
        -   https://www.smashingmagazine.com/2022/08/fluid-sizing-multiple-media-queries/
        -   https://min-max-calculator.9elements.com/
        -   https://tobiasahlin.com/blog/responsive-fluid-css-type-scales/
        -   https://css-tricks.com/fluid-everything-else/
        -   landin.gs
        -   royalfig.github.io/fluid-typography-calculator
        -   fluid-type-scale.com
        -   https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/
        -   fluid.style
        -   https://typeculator.alexpaul.me/
        -   https://wearerequired.github.io/fluidity/
-   graphical input: two-axis graph with x axis from 320 to maximum supported viewport with dropdown to select vw or %, left y axis from -100 to +100 with dropdown to select unit and right y axis with a different unit that spans the same distance as the left one (actually those two are in sync, if one changes the other changes as well). and you can add points, move them around. you can also select your target browser support list so that certain options are excluded from the generated code e.g. instead of clamp() @media query is used
-   accessibility and privacy as separate pages??
-   automatically generate table of contents
    -   https://css-tricks.com/a-perfect-table-of-contents-with-html-css/
-   optimize the page for reader view
-   email obfuscation: https://news.ycombinator.com/item?id=38379397: just don't obfuscate and instead use a catch all email domain especially with all the AI that could be used to harvest email addresses
-   compare and pick the smallest minified css out of the list: https://github.com/GoalSmashers/css-minification-benchmark
-   https://css-tricks.com/how-do-you-remove-unused-css-from-a-site/
-   publish postcss as `responsify` or `@fel/responsify` package.json
    -   https://github.com/bramstein/postcss-scale
        -   contribute to the plugin by fixing issues
-   plugin that appends `<link>` element with all styles @media (scripting: none)
-   `<code>` font-size changes when `<details>`/`<summary>` is toggled??
-   webpack by default introduces unnecessary boilerplate related to importing and exporting modules (right?) and is there a way to remove that and use plain import/export syntax??
-   stylelint
    -   https://github.com/eslint/css/pull/2
    -   https://github.com/CSSLint/csslint/wiki/Rules
    -   only allow some shorthand properties?? https://www.havardbrynjulfsen.design/writing/thoughts/my-issues-with-shorthand-properties/
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
-   vanilla-extract to replace PostCSS and CSS modules at some point in the future
    -   how does it work?
    -   how well can you use css features I like e.g. range for media queries?
-   didn't have a need for `.gitattributes`, maybe if I were using windows i would have discovered a use case, but for now I'm gonna leave it out
-   managing a personal project: https://news.ycombinator.com/item?id=38689869

## notes

-   `babel-plugin-react-compiler` needed to be able to use react-compiler (opts out of next.js' rust-based compiler)

## Technologies

-   PostCSS (postcss language support vs code extension)
    -   `cssnano-preset-default` only does safe transforms

### npm

Another reason why not using pnpm: https://github.com/pnpm/pnpm/issues/6759

### EditorConfig

EditorConfig sets [some formatting rules](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties) for your code editor, such as starting new files with tab indentation. While Prettier can handle most of these rules, using EditorConfig on new files helps avoid unnecessary reformatting by Prettier.

### TypeScript

### 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
