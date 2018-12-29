const ReactDOM = require('react-dom/server');
const React = require("react")
module.exports =  (template,params)=>{
	const {app,...props} = params;
	return template({
		...props,
		app:ReactDOM.renderToString(React.createElement(app,{},[]))
	})
}