const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("../package.json");
const entries = pkg.entries;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const stringRegex = /\.(html|txt|glsl)$/;
const moduleCssLoader = {
	loader: "css-loader",
	options: {
		modules: true
	}
};
const resolve = url => path.join(__dirname, url);
module.exports = function(env) {
	const styleLoader = env.production
		? MiniCssExtractPlugin.loader
		: env.render
		? resolve("./loaders/node-style")
		: "style-loader";

	const babelLoader = {
		loader: "babel-loader",
		options: {
			plugins: [
				[
					"babel-plugin-label-switch",
					{
						map: {
							IS_RENDER: env.render,
							IS_RUNTIME: !env.render,
							IS_PROD: env.production,
							IS_DEV: !env.production
						}
					}
				]
			]
		}
	};
	return {
		mode: env.production ? "production" : "development",
		context: path.join(__dirname, "../"),
		entry: entries.reduce((o, item) => {
			o[item.name] = item.path;
			return o;
		}, {}),
		output: {
			publicPath: ".",
			path: path.join(__dirname, "../dist"),
			filename: "src/[name]/script/index.js",
			chunkFilename: "src/[name]/script/[id].js"
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						name: "commons",
						chunks: "initial",
						minChunks: 2
					}
				}
			}
		},
		resolve: {
			alias: {
				src: path.join(__dirname, "../src")
			},
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					include: path.join(__dirname, "../src"),
					use: babelLoader
				},
				{
					test: /\.tsx?$/,
					include: path.join(__dirname, "../src"),
					use: babelLoader
				},
				{
					test: cssRegex,
					include: path.join(__dirname, "../src"),
					exclude: cssModuleRegex,
					use: [styleLoader, "css-loader", "postcss-loader"]
				},
				{
					test: lessRegex,
					include: path.join(__dirname, "../src"),
					exclude: lessModuleRegex,
					use: [
						styleLoader,
						"css-loader",
						"postcss-loader",
						"less-loader"
					]
				},
				{
					test: cssModuleRegex,
					include: path.join(__dirname, "../src"),
					use: [styleLoader, moduleCssLoader, "postcss-loader"]
				},
				{
					test: lessModuleRegex,
					include: path.join(__dirname, "../src"),
					use: [
						styleLoader,
						moduleCssLoader,
						"postcss-loader",
						"less-loader"
					]
				},
				{
					test: stringRegex,
					use: resolve("./loaders/js-string/index")
				},
				{
					test: /\.(jpe?g|png|svg|bmp|gif)$/,
					include: path.join(__dirname, "../src"),
					use: {
						loader: "url-loader",
						options: {
							limit: 5000,
							name(file) {
								return "/index/[name].[ext]";
							}
						}
					}
				}
			]
        },
        
		plugins: [
			new ForkTsCheckerWebpackPlugin(),
			...(!env.render && !env.production
				? pkg.entries.map(
						item =>
							new HtmlWebpackPlugin({
								filename: `${
									item.name === "/" ? "" : item.name
								}/index.html`,
								template: path.join(__dirname, "../index.html")
							})
				  )
				: []),
			!env.production && new webpack.HotModuleReplacementPlugin(),
			env.production &&
				new MiniCssExtractPlugin({
					filename: "src/styles/[name].[contenthash:8].css",
					chunkFilename: "src/styles/[name].[contenthash:8].chunk.css"
				}),
		].filter(Boolean),
		devtool: env.production ? "none" : "cheap-eval-source-map"
	};
};
