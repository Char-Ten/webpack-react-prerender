const webpack = require("webpack")
const configs = require('./webpack.config');
const CONFIG = require('./index');
const PATH = require('path');
const HTMLRenderPlugin = require('./plugins/html-render-plugin');
const EntriesCreatePlugin = require('./plugins/entries-create-plugin');
const moduleCssLoader = {
    loader: 'css-loader',
    options: {
        modules: true
    }
};
module.exports = Object.assign({}, configs, {
    mode: 'development',
    target: 'node',
    entry: {
        index: PATH.join(__dirname, '../src/routes/index/server.js')
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
                test: /\.module\.css$/,
                use: [
                    PATH.join(__dirname, '/loaders/node-style-loader'),
                    moduleCssLoader
                ]
            },
            {
                test: /\.module\.less$/,
                use: [
                    PATH.join(__dirname, '/loaders/node-style-loader'),
                    moduleCssLoader,
                    'less-loader'
                ]
            },
            {
                exclude: /\.(js|html|module\.(css|less))$/,
                use: 'url-loader'
            }
        ]
	},
	devtool:'eval',

    output: {
        path: CONFIG.OUTPUT_PATH,
        library: 'Runner',
        libraryTarget: 'umd'
    },
    plugins: [
		new webpack.DefinePlugin({
			'module.IS_DEV':true,
			'module.IS_RENDER':true
		}),
        new HTMLRenderPlugin({
            framework: 'react' // react / vue
        }),
        new EntriesCreatePlugin()
    ]
});
