'use strict';

const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'dist', 'test.js'),
    output: {
        filename: 'test.js',
        path: path.join(__dirname, 'lib')
    },
    externals: {
        './index': 'PositionalNotation'
    }
};
