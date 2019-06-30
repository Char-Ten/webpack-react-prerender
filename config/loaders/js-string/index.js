const { getOptions } = require("loader-utils");
module.exports=source=>{
    const options = getOptions(this)||{};
    let name = options.name||'param';
    return `module.exports = (${name}={})=>\`${source}\``
}