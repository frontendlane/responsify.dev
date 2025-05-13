-   https://github.com/davidmerfield/Typeset
-   unorphan
-   the real solution is to create <Unorphan> component that would wrap whatever content and would wrap the last x works in a span with a class. that span will get white-space: nowrap; and will work with SSG/SSR because it will go through `children` and operate that way, and if the component is set to render in the client as well then it can (optionally) make sure that the last line is not too long (see `areUnorphanedWordsShorterThanHalfParentContentWidth`)
-   https://cloudfour.com/thinks/responsive-headlines-are-about-to-get-awesome/ + comments
-   extract unorphan into a separate npm package
    -   WONTFIX: unorphaning `display: none;` elements on the client
    -   WONTFIX: do this for CSS content as well
    -   there's a different way to unrphan and that's with `<br>`. replace penultimate whitespace with `<br>`, assign it an `id` possibly and style it with media queries
    -   https://mnater.github.io/Hyphenopoly/
    -   https://zellwk.com/blog/publish-to-npm/

https://www.npmjs.com/package/jquery-unorphanize
https://www.npmjs.com/package/@threespot/unorphanize
https://www.npmjs.com/package/unorphan

-   july 9 2023 i learned i rediscovered unorphan
-   https://www.npmjs.com/package/typemate/v/0.7.1
-   handle this as well??
    -   https://en.wikipedia.org/wiki/Soft_hyphen
-   https://www.ctrl.blog/entry/text-wrap-balance.html + https://www.ctrl.blog/entry/text-wrap-balance.html
-   text-wrap: pretty; (currently only in chrome beta)
