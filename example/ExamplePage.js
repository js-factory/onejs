import { h } from 'preact';
import { withPreact as withState } from '@js-factory/onejs';

@withState({
    hooks:{
        componentWillMount(){
                console.log('before render');
        },
        componentDidMount(){
            console.log('after render');
    }
    },
    beforeRender() {
        console.log('before render');
    },
    afterRender({ sayHello }) {
        console.log('afterRender');
    },
    state: {
        x: 0
    },
    instanceProps: {
        y: 0
    },
    eventHandlers: {
        onClickHandler({ getState, onClickAction, setState, getInstanceProps, setInstanceProps }) {
            const { y } = getInstanceProps();
            const {x} = getState();
            setInstanceProps({ y: y + 1 });
            setState({ x: x + 1 });
        }
    },
    template: (props) => {
        const { getState, onClickHandler, getInstanceProps } = props;
        console.log({ ...props });
        console.log(getInstanceProps());
        const {x} =getState()
        return (
            <div>
                <h1>withPreact</h1>
                <p><strong>Component state</strong> - {x}</p>
                <p><strong>Component instance property</strong> - {getInstanceProps().y}</p>
                <button onClick={onClickHandler}>Click here</button>
            </div>
        );
    }
})
export default class ExamplePage { }
