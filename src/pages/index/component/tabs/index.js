import * as React from 'react';
/**
 *
 *
 * @export
 * @class Tabs
 * @extends {React.Component}
 * @prop {Array} list - tab列表> list:[{name,list}]
 */
export default class Tabs extends React.Component{
	constructor(props){
		super(props);
		this.state={
			index:0
		}
	}
	render(){
		return (
			<dd>
				<dt>
					<ul>
						{this.props.list.map((item,index)=>{
							


						})}
						
					</ul>
				</dt>
				<dd></dd>
			</dd>
		)
	}
}