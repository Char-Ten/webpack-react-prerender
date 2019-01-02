module.exports=source=>{
	let result = source.split('exports.locals =');
	let target = '{}'
	if(result[1]){
		target =result[1]
	}
	return `module.exports=${target}`;
}