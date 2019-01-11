export default function componentDidMount({ fetchToDoList, sayHello, todos =[] }) {
    console.log('afterRender');
    if (!todos.length) {
        fetchToDoList();
    }
}
