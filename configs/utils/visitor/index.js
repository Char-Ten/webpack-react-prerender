const path = require('path');
const fs = require('fs');
module.exports = function({ paths, onLoad, onFile, onDir, onEnd, onErr }) {
    function visitor(nodes) {
        if (nodes.length === 0) {
            typeof onEnd === 'function' && onEnd();
            return;
        }
        const node = nodes.shift();
        fs.readdir(node.path, (err, children) => {
            if (err) {
                typeof onErr === 'function' && onErr(err);
                return;
            }
            children.forEach(child => {
                let childPath = path.join(node.path, child);
                typeof onLoad === 'function' && onLoad(node, child);
                if (fs.statSync(childPath).isDirectory()) {
                    typeof onDir === 'function' &&
                        onDir(nodes, node, childPath, child);
                    return;
                }
                typeof onFile === 'function' &&
                    onFile(nodes, node, childPath, child);
            });
            visitor(nodes);
        });
    }
    visitor(paths);
};

