const path = require('path');
const fs = require('fs');
const SRC = path.resolve(__dirname, '../../../src');
const PAGE_ROUTE_PATH = path.join(SRC, 'routes');
const ROUTES = [];
const a = [{ path: PAGE_ROUTE_PATH, str: '' }];
let n = 0;
function visitor(nodes) {
    if (nodes.length === 0) {
        log();
        return;
    }
    const node = nodes.shift();
    fs.readdir(node.path, (err, children) => {
        children.forEach(child => {
            let childNode = path.join(node.path, child);
            if (fs.statSync(childNode).isDirectory()) {
                a.push({ path: childNode, str: node.str + '/' + child });
                return;
            }
            if (/server\.js/.test(childNode)) {
                n++;
                ROUTES.push(node.str);
            }
            if (a.length === 0) {
            }
        });
        visitor(a);
    });
}
function log() {
    console.log(`路由数量${n}:`);
    ROUTES.forEach((item, index) => console.log(`${index + 1}、${item}`));
}
module.exports = () => {
    visitor(a);
};
