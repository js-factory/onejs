import fakeAsync from './util/fakeAsync';
import isFunction from './util/isFunction';

// export default function onComplete(req, res) {
//     const { onComplete, behaviors } = req;
//     if (isFunction(onComplete)) {
//         fakeAsync(onComplete, res, behaviors);
//     }
//     return res;
// }


export default function onComplete() {
    return getState => (req, next) => (data = {}) => {
        const { actionConfig: { onComplete }, behaviors } = req;
        if (isFunction(onComplete)) {
            fakeAsync(onComplete, data, behaviors);
        }

        return next(data);
    }
}