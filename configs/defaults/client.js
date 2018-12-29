/**
 * @file client.js
 * @desc 
 * 	This file will be ran by browser. 
 * 	So it is the only place where you can call browser's api.
 *  And the class App will be build by another webpack config,
 *  which is used for generate html file
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "src/pages//*${route}*//app.js";

ReactDOM.render(<App/>,document.getElementById('app'));
