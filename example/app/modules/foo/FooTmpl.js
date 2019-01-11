import { h } from 'preact';
import { cardStyle } from '../../config';

const TodoTmpl = (props) => {
    const { getState, onClickHandler, getInstanceProps } = props;
    console.log({ ...props });
    console.log(getInstanceProps());
    const { x } = getState()
    return (
        <div style={cardStyle}>
            <h2>withState implementation</h2>
            <p><strong>Component state</strong> - {x}</p>
            <p><strong>Component instance property</strong> - {getInstanceProps().y}</p>
            <button onClick={onClickHandler}>Click here</button>
        </div>
    );
};

export default TodoTmpl;
