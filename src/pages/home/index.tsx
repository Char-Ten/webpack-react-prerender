import * as React from "react";
import * as IReactDOM from "react-dom";
import * as IReactDOMServer from "react-dom/server";
import App from './app'
case$_IS_RENDER: {
	const ReactDOMServer: typeof IReactDOMServer = require("react-dom/server.browser.js");
    const template:GlobalTextTemplateFunction = require("src/index.html");
    global['template']=template;
	global.renderHTML = function(name:string): Promise<string> {
		return new Promise((res, rej) => {
            const str: string = ReactDOMServer.renderToString(
                <div id="app">
                    <App/>
                </div>
            );
            
			res(
				template({
                    name,
					version: "1.0.0",
					html: str
				})
			);
		});
	};
}
case$_IS_RUNTIME: {

}
