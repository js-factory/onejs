import { withState, withStore } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import increment from './actions/increment';
import fetchToDoList from './actions/fetchToDoList';
import onClickHandler from './handlers/onClickHandler';
import TodoTmpl from './ToDoTmpl';

@withStore({
    watcher: ['home', 'counter', 'todos'],
    actions: {
        increment,
        fetchToDoList
    }
})
@withState({
    hooks: {
        componentDidMount
    },
    state: {
        x: 0,
    },
    instanceProps: {
        y: 0
    },
    eventHandlers: {
        onClickHandler
    },
    template: TodoTmpl
})
export default class ToDoContainer { }
