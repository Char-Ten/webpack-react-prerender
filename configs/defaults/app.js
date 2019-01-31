import React from 'react';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.match({
            num:200
        });
    }
    match(state) {
        if (module.IS_RENDER) {
            return state;
        }
        const p = document.querySelector('#app p')||{};
        return {
            ...state,
            num:parseInt(p.textContent)
        };
    }
    render() {
        return (
            <div id="app">
                <h1>test</h1>
                <p>{this.state.num}</p>
                <button onClick={()=>this.setState({num:this.state.num+1})}>+1</button>
                <button onClick={()=>this.setState({num:this.state.num-1})}>-1</button>
            </div>
        );
    }
}

