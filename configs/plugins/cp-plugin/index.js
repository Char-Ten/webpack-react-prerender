const childProcess = require("child_process");
const fs = require("fs")
function cp(source,target){
	let command = `cp -f "${source}" "${target}"`;
    if (process.platform === 'win32') {
        command = `xcopy /Y /E /C "${source}" "${target}"`;
    }
    return childProcess.execSync(command);
}
function mkdir(path){
	let command = `mkdir -p "${path}"`;
    if (process.platform === 'win32') {
        command = `md "${path}"`;
    }
    return childProcess.execSync(command);
}
class CpPlugin{
	constructor({source,target}){
		this.source=source;
		this.target=target;
	}
	apply(compiler){
		compiler.hooks.done.tapPromise('CpPlugin',()=>{
			return new Promise((res)=>{
				if(!fs.existsSync(this.target)){
					mkdir(this.target);
				}
				if(fs.existsSync(this.source)){
					cp(this.source,this.target)
				}
				res();
			})	
		})
	}
}
module.exports = CpPlugin