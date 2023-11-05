const path = require('path');

module.exports = {
    entry: {
        'index/scripts/index': './src/pages/index/scripts/index.ts',
    },
    // TODO: ship source map in production as well https://www.ctrl.blog/entry/deploy-javascript-source-maps.html
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/pages'),
    },
};
