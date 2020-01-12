import Component, { injectStore } from './hoc/packages/preact/component';
import { withStore, createStore as cs, actionCreator } from './store/src';

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
