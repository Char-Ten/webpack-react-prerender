const vm = require('vm');
const reactRender = require('./renders/reactRender');
const createDefaultTemplate = require('./utils/defaultTemplate');
const defaultTemplate = createDefaultTemplate();
class HTMLRenderPlugin {
    constructor(props) {
        this.frameworkRenderStore = { react: 1 };
        this.framework = 'react';
        this.commonHTMLTemplatePath = './template.html';

        /**
         * @method render
         * @todo 渲染暴露的组件、拼合模板成为html字符串
         * @param {Function} template - 模板渲染函数
         * @return {String} html字符串
         */
        this.render = async (template, params) => {
            const html = await reactRender(template, params);
            return html;
        };

        if (!props) {
            return;
        }
        if (this.frameworkRenderStore[props.framework]) {
            this.framework = props.framework;
        }
        if (typeof props.render === 'function') {
            this.render = props.render;
        }
    }

    apply(compiler) {
        let callerCount = 0;
        compiler.hooks.emit.tapPromise('HTMLRenderPlugin', compilation => {
            return new Promise((res, rej) => {
                for (let filename in compilation.assets) {
                    if (!/\.js/.test(filename)) {
                        continue;
                    }

                    let source = compilation.assets[filename].source();
                    let path = filename.replace(/\.js$/, '');

                    let context = {};
                    vm.createContext(context);
                    try {
                        vm.runInContext(`var global={};${source}`, context);
                    } catch (error) {
                        console.log(`${filename}文件有错误，请检查：`);
                        rej(error);
                        continue;
                    }

                    if (!context.global.Runner) {
                        continue;
					}
					console.log(context.global)
                    let {
                        template,
                        params
					} = context.global.Runner.default;
					
					if(!typeof template==='function')template=defaultTemplate;
                    params.name = path;
                    callerCount++;
                    this.render(template, params).then(html => {
                        callerCount--;
                        compilation.assets[filename] = undefined;
                        compilation.assets[path + '.html'] = {
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
                    });
                }
            });
        });
    }
}

module.exports = HTMLRenderPlugin;
