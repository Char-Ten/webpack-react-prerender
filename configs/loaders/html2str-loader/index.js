module.exports = function(source){
	const rxg = /\$\{([a-zA-Z]\w*)\}/g;
	let result = [];
	let params = [];

	while((result=rxg.exec(source))!==null){
		params.push(result[1]);
	}

	return `export default function(options){
		${params.map(item=>`var ${item}=options.${item}||'';`).join('')}
		return \`${source}\`
	}`

}