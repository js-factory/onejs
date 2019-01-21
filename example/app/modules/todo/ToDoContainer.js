import { Component, withStore } from '@js-factory/onejs';
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
@Component({
    componentDidMount,
    onClickHandler,
    state: {
        x: 0,
    },
    instanceProps: {
        y: 0
    },
    template: TodoTmpl
})
export default class ToDoContainer { }
