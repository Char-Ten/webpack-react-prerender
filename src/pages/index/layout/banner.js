import * as React from 'react';
import Center from '../component/center';
export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.match({
            title: '这是一个可以在html文件里改动的小标题'
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
                <div className="banner">
                    <img />
                </div>
                <div className="title">
                    <Center>
                        <h2>{this.state.title}</h2>
                    </Center>
                </div>
            </section>
        );
    }
}
