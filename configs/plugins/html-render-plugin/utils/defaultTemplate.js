const fs = require('fs');
const path = require('path');
const vm = require('vm');
function createTemplateFunction(){
	const rxg = /\$\{([a-zA-Z]\w*)\}/g;
	const source = fs.readFileSync(
		path.join(__dirname,'../../../defaults/template.html'),
		{
			encoding:'utf-8'
		}
	);
	let result = [];
	let params = [];

	while((result=rxg.exec(source))!==null){
		params.push(result[1]);
	}

	const context = {}
	vm.createContext(context);

	vm.runInContext(`
		function template(options){
			${params.map(item=>`var ${item}=options.${item}||'';`).join('')}
			return \`${source}\`
		}
	`,context);
	return context.template;

}
module.exports=createTemplateFunction;