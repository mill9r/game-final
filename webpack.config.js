'use strict';

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "build.js",
        library: 'index'
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 300
    },
    devtool: 'source-map'
};