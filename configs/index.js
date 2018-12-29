const PATH=require("path");
module.exports = {
	/**@name dll包名称 */
    DLL: {
        name: 'reactDLL'
	},

	/**@name 项目输出路径 */
	OUTPUT_PATH:PATH.join(__dirname,"../dist"),

	/**@name webpack别名配置 */
	ALIAS:{
		src: PATH.join(__dirname, "../src"),
	}
};
