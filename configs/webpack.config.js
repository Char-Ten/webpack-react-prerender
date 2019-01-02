const webpack = require('webpack');
const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EntriesCreatePlugin = require('./plugins/entries-create-plugin');
const CONFIG = require('./index');
const entry = new EntriesCreatePlugin({
    target: /client\.js/
}).entries;
const moduleCssLoader = {
    loader: 'css-loader',
    options: {
        modules: true
    }
};
module.exports = {
    mode: 'development',
    entry,
    output: {
        filename: 'src/[name]/index.js',
        chunkFilename: 'src/[name]/index.js',
        publicPath: '/',
        path: CONFIG.OUTPUT_PATH,
        library: 'Runner'
    },
    resolve: {
        alias: CONFIG.ALIAS
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: [
                    'babel-loader',
                    PATH.join(__dirname, '/loaders/html2str-loader')
                ]
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.module\.css$/,
                use: ['style-loader', moduleCssLoader, 'postcss-loader']
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.module\.less$/,
                use: [
                    'style-loader',
                    moduleCssLoader,
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        port: 9000,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
			'module.IS_DEV': true,
			'module.IS_RENDER':false
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../lib/reactDLL/manifest.json'),
            name: CONFIG.DLL.name
        }),
        new webpack.HotModuleReplacementPlugin(),
        ...Object.keys(entry).map(
            item =>
                new HtmlWebpackPlugin({
                    template: PATH.resolve('./index.html'),
                    filename: item + '.html',
                    chunks: [item]
                })
        )
    ]
};
