const webpack = require("webpack");
const path = require("path");
const CONFIG=require("./index").DLL
module.exports = {
	mode:"production",
    entry: {
        dll: [
			"react",
            "react-dom",
        ]
	},
	output:{
		filename:`${CONFIG.name}/index.js`,
		path:path.join(__dirname,'../lib'),
		library:CONFIG.name
	},
	plugins:[
		new webpack.DllPlugin({
			context:__dirname,
			path:path.join(__dirname,`../lib/${CONFIG.name}/manifest.json`),
			name: CONFIG.name
		})
	]
};
