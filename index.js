import withPreact, { injectStore } from '@js-factory/hoc/integration/preact/component';
import { withStore, createStore, actionCreator } from '@js-factory/store/src';

const withState = withPreact;
export {
    withState,
    withStore,
    withPreact,
    injectStore,
    createStore,
    actionCreator
};

export default {
    withState,
    withStore,
    withPreact,
    injectStore,
    createStore,
    actionCreator
};
