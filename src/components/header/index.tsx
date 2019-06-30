import * as React from "react";
import classes from './index.module.less';
export default class App extends React.Component {
	render() {
		return (
			<header className={classes.header}>
                <div className="wrap">
                    <div className="logo">
                        <a>
                            <img src=""/>
                        </a>
                    </div>
                    <nav>
                        <a>首页</a>
                    </nav>
                </div>
                
			</header>
		);
	}
}
