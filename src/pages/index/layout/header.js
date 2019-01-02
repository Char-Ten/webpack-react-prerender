import * as React from 'react';
import Center from "../component/center";
export default class Header extends React.Component{
	render(){
		return (
			<header>
				<Center className="k-flex">
					<h1>webpack-prerender-react</h1>
					<p>
						<i><code>v0.01</code></i>
					</p>
				</Center>
			</header>
		)
	}
}