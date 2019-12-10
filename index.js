import Component, { injectStore } from '@js-factory/hoc/packages/preact/component_v2';
import { withStore, createStore as cs, actionCreator } from '@js-factory/store/src';

const withState = Component;

const createStore = (initialState, middleware) => {
    const store = cs(initialState, middleware);
    injectStore(store);
    return store;
}

export {
    withState,
    withStore,
    Component,
    injectStore,
    createStore,
    actionCreator
};

export default {
    withState,
    withStore,
    Component,
    injectStore,
    createStore,
    actionCreator
};
