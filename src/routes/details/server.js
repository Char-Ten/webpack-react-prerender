/**
 * @file server.js
 * @desc 
 * 	In this JS file you must export a template function whitch can generator html string and the params for this function;
 */
import tpl from "src/pages/details/index.html";
import App from "src/pages/details/app.js";
export default {
	template:tpl,
	params:{
		title:'标题',
		app:App
	}
}