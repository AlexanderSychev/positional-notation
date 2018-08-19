'use strict';

const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'dist', 'index.js'),
    output: {
        filename: 'positional-notation.min.js',
        path: path.join(__dirname, 'lib'),
        library: 'PositionalNotation'
    },
};
