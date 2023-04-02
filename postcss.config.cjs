module.exports = (cliArguments) => {
    let isDev, isProd;

    switch (cliArguments.env) {
        case 'dev':
            isDev = true;
            break;
        case 'prod':
            isProd = true;
            break;
        default:
            throw new Error('specify either "dev" or "prod" for --env');
    }

    const cssNanoConfig = {
        cssDeclarationSorter: true, /** sorts properties so that gzipped is smaller */
        calc: true, /** removes calc() where possible, removes white space inside calc() where possible */
        colormin: true, /** converts to shortest color value */
        convertValues: true, /** removes unnecessary character, e.g. 0.1 --> .1 */
        discardComments: true, /** removes comments, some white spaces */
        // TODO: check every once in a while if any of false values should be changed to true
        discardDuplicates: false,
        discardEmpty: false, /** removes empty rules, media queries, and rules with empty selectors */
        discardOverridden: false,
        mergeLonghand: false,
        mergeRules: false,
        minifyFontValues: true, /** removes quotes in font-name, but some versions of IE won't load font whose name contains white space and is not not in quotes  */
        minifyGradients: false,
        minifyParams: true, /** removes white spaces in @media query params */
        minifySelectors: true, /** removes newline characters from multiline selectors */
        normalizeCharset: true, /** sets charset to UTF-8 */
        normalizeDisplayValues: false,
        normalizePositions: false,
        normalizeRepeatStyle: false,
        normalizeString: false,
        normalizeTimingFunctions: false,
        normalizeUnicode: false,
        normalizeUrl: false,
        normalizeWhitespace: true, /** removes white spaces */
        orderedValues: false,
        reduceInitial: false,
        reduceTransforms: false,
        svgo: false,
        uniqueSelectors: false,
    };

    return {
        map: isDev,
        plugins: {
			'postcss-media-minmax': {},
            'postcss-focus-visible': {},
            'postcss-import': {},
            'autoprefixer': {},
            'cssnano': isProd && { preset: [ 'cssnano-preset-default', cssNanoConfig ] }
        }
    };
};
