import * as React from 'react';
import Center from '../component/center';
export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.match({
            title: 'ce'
        });
    }
    match(state) {
        if (module.IS_DEV) {
            return state;
        }
        return {
            ...state,
            title: document.querySelector('#banner h2').innerText
        };
    }
    render() {
        return (
            <section id="banner">
                <Center>
                    <h2>{this.state.title}</h2>
                </Center>
            </section>
        );
    }
}
