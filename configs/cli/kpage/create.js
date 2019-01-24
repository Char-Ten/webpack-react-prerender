const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const SRC = path.resolve(__dirname, '../../../src');
const TEMPLATE_HTML_PATH = path.resolve(
    __dirname,
    '../../defaults/template.html'
);
const APP_JS_PATH = path.resolve(__dirname, '../../defaults/app.js');
const SERVER_JS_PATH = path.resolve(__dirname, '../../defaults/server.js');
const CLIENT_JS_PATH = path.resolve(__dirname, '../../defaults/client.js');
const total = 7;
let step = 0;
let msgList = [];
function readSource(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log(err);
                process.exit();
            } else {
                res(data);
            }
        });
    });
}

function createFile(path, source) {
    return new Promise((res, rej) => {
        fs.writeFile(path, source, { encoding: 'utf-8' }, err => {
            if (err) {
                console.log(err);
                process.exit();
            } else {
                res(`文件:${path} 创建成功`);
            }
        });
    });
}

function renderUI(msg) {
    msgList.push({
        msg,
        step
    });
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    msgList.forEach(item => process.stdout.write(`* ${item.msg}\r\n`));
    // process.stdout.write(progressbar())
    step++;
}

function progressbar() {
    const PRECENT = step / total;
    const LOADED = Math.floor(PRECENT * 20);
    const UNLOAD = 20 - LOADED;
    return `${new Array(LOADED).fill('=').join('')}${new Array(UNLOAD)
        .fill('-')
        .join('')}|${(PRECENT * 100).toFixed(2)}%\r\n`;
}

function mkdir(path) {
    let command = 'mkdir -p "' + path + '"';
    if (process.platform === 'win32') {
        command = 'md "' + path + '"';
    }
    childProcess.execSync(command);
}

module.exports = pagePath => {
    step = 0;
    if (!fs.existsSync(SRC)) {
        console.log('错误:src目录不存在!!!');
        return;
    }
    renderUI('src目录检验成功');
    const PAGE_DIR_PATH = path.join(SRC, 'pages', pagePath);
    const PAGE_ROUTE_PATH = path.join(SRC, 'routes', pagePath);
    const TEMPLATE_HTML_TARGET_PATH = path.join(PAGE_DIR_PATH, 'index.html');
    const APP_JS_TARGET_PATH = path.join(PAGE_DIR_PATH, 'app.js');
    const SERVER_JS_TARGET_PATH = path.join(PAGE_ROUTE_PATH, 'server.js');
    const CLIENT_JS_TARGET_PATH = path.join(PAGE_ROUTE_PATH, 'client.js');

    [
        APP_JS_TARGET_PATH,
        SERVER_JS_TARGET_PATH,
        CLIENT_JS_TARGET_PATH,
        TEMPLATE_HTML_TARGET_PATH
    ].forEach(item => {
        if (fs.existsSync(item)) {
            console.log(`错误:路由${item}已经存在，请删除该路由后重新执行!`);
            process.exit();
        }
    });

    renderUI(
        `[路由目录] ${PAGE_ROUTE_PATH} \r\n[工程目录] ${PAGE_DIR_PATH} \r\n校验成功`
    );

    [PAGE_DIR_PATH, PAGE_ROUTE_PATH].forEach(item => {
        if (!fs.existsSync(item)) {
            mkdir(item);
        }
    });

    renderUI(
        `[路由目录] ${PAGE_ROUTE_PATH} \r\n[工程目录] ${PAGE_DIR_PATH} \r\n创建成功`
    );

    let i = 0;
    [
        [TEMPLATE_HTML_PATH, TEMPLATE_HTML_TARGET_PATH],
        [APP_JS_PATH, APP_JS_TARGET_PATH],
        [SERVER_JS_PATH, SERVER_JS_TARGET_PATH],
        [CLIENT_JS_PATH, CLIENT_JS_TARGET_PATH]
    ].forEach(item => {
        i++;
        readSource(item[0])
            .then(source =>
                createFile(
                    item[1],
                    source.replace(/\/\*\$\{route\}\*\//g, pagePath)
                )
            )
            .then(msg => {
                i--;
                renderUI(msg);
                if (i === 0) {
                    renderUI('路由创建完毕！请重启webpack');
                }
            });
    });
};
