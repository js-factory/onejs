import { h } from 'preact';
import { cardStyle } from '../../config';

const ToDoTmpl = (props) => {
    const { home: { title }, onClickHandler, getInstanceProps, counter, todos = [], getState } = props;
    console.log({ ...props });
    console.log(getInstanceProps());
    const { count } = counter;
    return (
        <div style={cardStyle}>
            <h2>{title}</h2>
            <span><strong>Store property `counter`</strong> - {count}</span>
            <p><strong>Component state</strong> - {getState().x}</p>
            <p><strong>Component instance property</strong> - {getInstanceProps().y}</p>
            <button onClick={onClickHandler}>Click here</button>
            <section class="todos">
                <h3>ToDos:</h3>
                <p>Store property `todos`</p>
                <ul>
                    {todos.length && todos.slice(0, 10).map(({ title }) => <li>{title}</li>)}
                </ul>
            </section>
        </div>
    );
};

export default ToDoTmpl;
