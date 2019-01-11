import { createStore, injectStore } from '@js-factory/onejs';
import request from './middleware/request';
import reducer from './middleware/reducer';
import onComplete from './middleware/onComplete';
import instrumentation from './middleware/instrumentation';

const initialState = {
    home: {
        title: 'withState & withStore implementation'
    },
    counter: {
        count: 0
    }
};

const middleware = [
    request(),
    onComplete(),
    reducer(),
    instrumentation()
];

const store = createStore(initialState, middleware);

injectStore(store);

export default store;
