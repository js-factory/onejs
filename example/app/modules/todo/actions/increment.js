import { actionCreator } from '@js-factory/onejs';

export default actionCreator('INCREMENT', {
    key: 'counter',
    instrumentation: true,   // `instrumentation` middleware setting
    reducer({ count }) {     // `reducer` middleware setting
        return {
            count: count + 1
        };
    }
});
