# Responsify
Responsify generates a CSS `calc()` value that smoothens the "jump" in element's `width`, `height`, `padding`, `top` etc. caused by a @media query.

## Notes
- in place of `npx` type `yarn`

## Todos
- safari: probably due to the fact that safari doesn't support inline-xxx and block-xxx values
    - indenting inputs??
    - landscape on actual mobile
- why does webpack transform `while` loop to `for` loop when it shouldn't
- add *.scss
    - replace generics with @mixins
    - font stack
- prettier
- eslint
- build step
    - description that gets pushed everywhere
    - dynamically pull list of CSS properties from official website
    - restrict the width of the input to the length of the longest CSS property
- video recording needs to show viewport width in the browser
    - video ratio 3.25
    - full page bleed
- favicon
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
