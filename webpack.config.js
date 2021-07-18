const path = require('path');

module.exports = {
    entry: './src/scripts/index.ts',
    devtool: 'source-map',
    watch: true,
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
        filename: 'index.js',
        path: path.resolve(__dirname, 'public/scripts'),
    },
};
