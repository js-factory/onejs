import { Component } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import onClickHandler from './handlers/onClickHandler';
import FooTmpl from './FooTmpl';

@Component({
    componentDidMount,
    onClickHandler,
    state: {
        x: 0
    },
    instanceProps: {
        y: 0
    },
    template: FooTmpl
})
export default class FooContainer { }
