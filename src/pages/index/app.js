import React from 'react';
import Header from './layout/header.js';
import Banner from './layout/banner.js';
import 'src/styles/reset.css';
import './styles/index.less';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.match({});
    }
    match(state) {
        if (module.IS_DEV) {
            return state;
        }
        return {
            ...state
        };
    }
    render() {
        return (
            <div id="root">
                <Header />
                <Banner />
            </div>
        );
    }
}
