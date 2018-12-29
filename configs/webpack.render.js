const configs = require("./webpack.config");
const CONFIG = require("./index");
const PATH = require("path")
const HTMLRenderPlugin = require('./plugins/html-render-plugin');
const EntriesCreatePlugin = require('./plugins/entries-create-plugin')

module.exports =Object.assign({},configs,{
	mode:"development",
	target: 'node',
	entry:{
		'index':PATH.join(__dirname,'../src/routes/index/server.js')
	},
	module: {
        rules: [
			{
				test:/\.html$/,
				use:['babel-loader',PATH.join(__dirname,'/loaders/html2str-loader')]
			},
            {
                test: /\.js$/,
                use: 'babel-loader'
			},
			{
				exclude:/\.(js|html)$/,
				use:'url-loader'
			}
        ]
	},
	
	output:{
		path: CONFIG.OUTPUT_PATH,
		library:'Runner',
		libraryTarget:"umd"
	},
    plugins: [new HTMLRenderPlugin({
		framework:'react',// react / vue
	}),new EntriesCreatePlugin()]
});
