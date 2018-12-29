const childProcess = require("child_process");
const fs = require("fs")
function mv(source,target){
	let command = `mv -f "${source}" "${target}"`
	if(process.platform==='win32'){
		command = `move "${source}" "${target}"`
	}
	childProcess.execSync(command);
}
class MvPlugin{
	constructor({source,target}){
		this.source=source;
		this.target=target;
	}
	apply(compiler){
		compiler.hooks.done.tapPromise('MvPlugin',()=>{
			return new Promise((res)=>{
				if(fs.existsSync(this.source)){
					mv(this.source,this.target)
				}
				res();
			})	
		})
	}
}
module.exports = MvPlugin