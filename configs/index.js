const PATH=require("path");
module.exports = {
    DLL: {
        name: 'reactDLL'
	},
	OUTPUT_PATH:PATH.join(__dirname,"../dist"),
	SERVER_RENDER_OUTPUT_PATH:PATH.join(__dirname,'../serverRender'),
	ALIAS:{
		src: PATH.join(__dirname, "../src"),
	}
};
