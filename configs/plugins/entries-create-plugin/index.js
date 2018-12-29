const path = require('path');
const fs = require('fs');
class EntriesCreatePlugin {
    constructor(props) {
        props = props || {};
        this.target = props.target || /server\.js/;
        this.routePath =
            props.root || path.join(__dirname, '../../../src/routes');
		this.entries = {};
		const dirs = [{
			path:this.routePath,
			name:''
		}];
		while(dirs.length>0){
			let node = dirs.shift();
			let children = fs.readdirSync(node.path);
			children.forEach(child=>{
				let childPath = path.join(node.path, child);
				if (fs.statSync(childPath).isDirectory()) {
					dirs.push({
						path:childPath,
						name:node.name+'/'+child
					})
                    return;
				}
				if(this.target.test(child)){
					this.entries[node.name.replace(/^\/?/,'')]=childPath
				}
			});
		}
    }
    apply(compiler) {
		compiler.options.entry=this.entries;
    }
}
module.exports = EntriesCreatePlugin;
