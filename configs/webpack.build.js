const PATH = require('path');
const webpack = require('webpack');
const webpackConfigs = require('./webpack.config');
const CONFIG = require('./index');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CpPlugin = require('./plugins/cp-plugin');
const extactTextWebpackPlugin = new ExtractTextWebpackPlugin(
    'src/[name]/index.css'
);

module.exports = Object.assign({}, webpackConfigs, {
    mode: 'production',
    output: {
        filename: 'src/[name]/index.js',
        chunkFilename: 'src/[name]/index.js',
        publicPath: '/',
        path: CONFIG.OUTPUT_PATH
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'babel-loader',
                    PATH.join(__dirname, '/loaders/html2str-loader')
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: extactTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.less$/,
                use: extactTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        extactTextWebpackPlugin,
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../lib/reactDLL/manifest.json'),
            name: CONFIG.DLL.name
        }),
        new CpPlugin({
            source: PATH.join(__dirname, '../lib'),
            target: PATH.join(__dirname, '../dist/lib')
        })
    ]
});
