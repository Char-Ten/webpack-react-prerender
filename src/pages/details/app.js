import React from 'react';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.match({
            list: new Array(0).fill(1).map((item, index) => `吃${index}头猪`),
            title: '2333',
            time: 0
        });
    }
    match(state) {
        if (typeof document === 'undefined') {
            return state;
        }
        const listElements = document.querySelectorAll('#app li');
        return {
            ...state,
            list: Array.prototype.map.call(listElements, item => item.innerHTML)
        };
    }
    render() {
        return (
            <div id="app">
                <ul>
                    {this.state.list.map((item, i) => {
                        return (
                            <li className="test" key={i}>
                                {item}
                            </li>
                        );
                    })}
                </ul>
                <button onClick={this.addItem} >加一头猪</button>
                <button onClick={this.removeItem} >拉一坨屎</button>
                <p>{this.state.time}</p>
            </div>
        );
    }

    addItem = () => {
        let time = new Date().getTime();
        this.setState(
            {
                list: [...this.state.list, `吃${this.state.list.length}头猪`]
            },
            () => {
                this.setState({
                    time: new Date().getTime() - time
                });
            }
        );
    };

    removeItem = () => {
        let time = new Date().getTime();
        this.state.list.pop();
        this.setState(
            {
                list: this.state.list
            },
            () => {
                this.setState({
                    time: new Date().getTime() - time
                });
            }
        );
    };
}

