const vm = require("vm");
class ExtractHtmlPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapPromise("ExtractHtmlPlugin", compilation => {
			let callerCount = 0;
			return new Promise((res, rej) => {
				for (let filename in compilation.assets) {
					if (!/\.js/.test(filename)) {
						continue;
					}
					let source = compilation.assets[filename].source();
					let path = filename.replace(/\.js$/, "");
					let context = {
						global: {}
					};
					vm.createContext(context);
					try {
						vm.runInContext(source, context);
					} catch (error) {
						console.log(`${filename}无法执行！`);
						rej(error);
						continue;
					}

					if (typeof context.global.renderHTML !== 'function') {
						continue;
					}
                    callerCount++;
                    console.log(context.global)
					context.global.renderHTML(path).then(html => {
						callerCount--;
						compilation.assets[filename] = undefined;
						compilation.assets[path + ".html"] = {
							source() {
								return html;
							},
							size() {
								return html.length;
							}
						};
						try {
							delete compilation.assets[filename];
						} catch (error) {}

						if (callerCount === 0) {
							res();
						}
					},()=>{
                        callerCount--;
                        if (callerCount === 0) {
							res();
						}
                    });
                }
                if(callerCount===0){
                    res()
                }
			});
		});
	}
}
module.exports=ExtractHtmlPlugin;