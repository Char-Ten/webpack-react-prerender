const PATH = require('path');
const webpack = require('webpack');
const webpackConfigs = require('./webpack.config');
const CONFIG = require('./index');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CpPlugin = require('./plugins/cp-plugin');
const extactTextWebpackPlugin = new ExtractTextWebpackPlugin(
    'src/[name]/index.css'
);
const moduleCssLoader = {
    loader: 'css-loader',
    options: {
        modules: true
    }
};
module.exports = Object.assign({}, webpackConfigs, {
    mode: 'production',
    output: {
        filename: 'src/[name]/index.js',
		chunkFilename: 'src/[name]/index.js',
		sourceMapFilename:'map/[name]/[file].map',
        publicPath: './',
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
				exclude: /\.module\.css$/,
                use: extactTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
				test: /\.less$/,
				exclude: /\.module\.less$/,
                use: extactTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
			},
			{
                test: /\.module\.css$/,
                use: extactTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [moduleCssLoader, 'postcss-loader', 'less-loader']
                })
			},
			{
                test: /\.module\.less$/,
                use: extactTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [moduleCssLoader, 'postcss-loader', 'less-loader']
                })
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 5000,
					name: '[path][name].[ext]'
				}
			},
        ]
    },
    plugins: [
		extactTextWebpackPlugin,
		new webpack.DefinePlugin({
			'module.IS_DEV':false,
			'module.IS_RENDER':false
		}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../lib/reactDLL/manifest.json'),
            name: CONFIG.DLL.name
        }),
        new CpPlugin({
            source: PATH.join(__dirname, '../lib'),
            target: PATH.join(__dirname, '../dist/lib')
		}),
		new CpPlugin({
            source: PATH.join(__dirname, '../static'),
            target: PATH.join(__dirname, '../dist/src')
        })
    ]
});
