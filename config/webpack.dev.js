var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');

// common config
var common = require('./webpack.common');

// constants
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

var webpackConfig = {

    output: {
        path: path.resolve(__dirname, './../dev'),
    },

    devtool: 'inline-source-map', 

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]

};

module.exports = webpackMerge(common.config, webpackConfig);