import { h, render } from 'preact';
import './bootstrap';
import { StateManager } from '@js-factory/onejs';
import ToDoContainer from './app/modules/todo/ToDoContainer';
import FooContainer from './app/modules/foo/FooContainer';
import { baseStyle, heading } from './app/config';

render(
    <div style={baseStyle}>
        <h1 style={heading}>onejs</h1>
        <FooContainer />
        <ToDoContainer />
    </div>,
    document.body
);
