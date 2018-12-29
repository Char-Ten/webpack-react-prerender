const ACTIONS = {
	'create':require('./create'),
	'list':require('./list'),
	'remove':require('./remove'),
}
const action = ACTIONS[process.argv[2]];
if(!action){
	process.exit();
}
action(process.argv[3]);