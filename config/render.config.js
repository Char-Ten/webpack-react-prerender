const ExtractHTMLPlugin = require("./plugins/extract-html/index");
const commonConfig = require("./common.config")({'render':1});
commonConfig.target="node";
commonConfig.output.filename='[name].js';
commonConfig.output.libraryTarget="umd"
commonConfig.plugins.push(
    new ExtractHTMLPlugin()
)
module.exports = commonConfig
