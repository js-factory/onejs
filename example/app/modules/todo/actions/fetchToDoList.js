import { actionCreator } from '@js-factory/onejs';

export default actionCreator('FETCH_TODO_LIST', {
    instrumentation: true,
    key: 'todos',
    url: 'https://jsonplaceholder.typicode.com/todos',
    onComplete(data) {
        console.log('onComplete', data);
    }
});
