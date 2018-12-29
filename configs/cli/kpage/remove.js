const path = require('path');
const childProcess = require("child_process");
const rl = require("readline")
const visitor = require('../../utils/visitor');
const SRC = path.resolve(__dirname, '../../../src');
const PAGE_ROUTE_PATH = path.join(SRC, 'routes');
const PAGE_PAGES_PATH = path.join(SRC, 'pages');
const a = [{ path: PAGE_ROUTE_PATH, str: '' }];
const question =
    '请选择你要删除的路由（↑/↓键切换，A全选，Y确认，Enter删除，Q退出）';
const TOP = Buffer.from([0x1b, 0x5b, 0x41]);
const BOTTOM = Buffer.from([0x1b, 0x5b, 0x42]);
const ENTER = Buffer.from([0x0d]);
const Q = Buffer.from([0x71]);
const A = Buffer.from([0x61]);
const Y = Buffer.from([0x79]);

function rm(paths=[]){
	let pathStr = paths.map(item=>`"${item}"`).join(' ')
	let command = `rm -rf ${pathStr}`;
	if(process.platform==='win32'){
		command = `rd /S /Q ${pathStr}`
	}
	return new Promise((res,rej)=>{
		childProcess.exec(command,e=>{
			if(e){
				rej(e)
			}else{
				res();
			}
		})
	});
}

module.exports = () => {
    let options = [];
	let index = 0;
	let isAllCheck = false;
	let events = {
		[Q]:onQ,
		[A]:onA,
		[Y]:onY,
		[TOP]:onTop,
		[BOTTOM]:onBottom,
		[ENTER]:onEnter,
	}
    visitor({
        paths: a,
        onEnd,
        onDir(nodes, parentNode, childPath, child) {
            nodes.push({
                path: childPath,
                str: `${parentNode.str}/${child}`
            });
        },
        onFile(nodes, node, childPath, child) {
            if (/server\.js$/.test(child)) {
                options.push({
                    route: node.str,
                    isCheck: false
                });
            }
        }
    });

    function onEnd() {
        process.stdin.setRawMode(true);
        process.stdin.on('data', onData);
        renderUI(question, options,index);
    }

    function onData(e) {
		typeof events[e]==='function'&&events[e]();
	}
	
	function onTop(){
		setIndex(index-1);
		renderUI(question, options,index);
	}

	function onBottom(){
		setIndex(index+1);
		renderUI(question, options,index);
	}

	function onEnter(){
		options[index].isCheck=!options[index].isCheck;
		renderUI(question, options,index);
	}

	function onQ(){
		process.exit();
	}

	function onY(){
		let willRemoveRoutes = options.reduce((a,item)=>{
			if(item.isCheck){
				a.push(
					path.join(PAGE_PAGES_PATH,item.route),
					path.join(PAGE_ROUTE_PATH,item.route)
				)
			}
			return a
		},[]);
		rm(willRemoveRoutes).then(res=>{
			console.log(willRemoveRoutes.join('\r\n'));
			console.log('被删除');
			onQ();
		}).catch(err=>{
			console.log(err)
		});
	}

	function onA(){
		isAllCheck=!isAllCheck
		options.forEach(item=>item.isCheck=isAllCheck);
		renderUI(question, options,index);
	}

	function setIndex(i){
		if(i>=options.length){
			i-=options.length;
		}

		if(i<0){
			i+=options.length;
		}

		index = i
	}

    function renderUI(question, options, i) {
        process.stdout.cursorTo(0, 0);
        process.stdout.clearScreenDown();
        process.stdout.write(question + '\r\n');
        process.stdout.write(
            options.reduce((str, item, index) => {
                let { isCheck, route } = item;
                let selectArrow = index === i ? '→' : ' ';
                let checkbox = isCheck ? '[√]' : '[ ]';
                str += ` ${selectArrow} ${checkbox} ${route}\r\n`;
                return str;
            }, '')
        );
    }
};
