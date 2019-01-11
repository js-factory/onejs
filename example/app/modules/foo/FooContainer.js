import { withState } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import onClickHandler from './handlers/onClickHandler';
import FooTmpl from './FooTmpl';

@withState({
    hooks: {
        componentDidMount
    },
    state: {
        x: 0
    },
    instanceProps: {
        y: 0
    },
    eventHandlers: {
        onClickHandler
    },
    template: FooTmpl
})
export default class FooContainer { }
