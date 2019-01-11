// export default function injectReducer(req, res, getState) {
//     const { actionConfig: { reducer, key } } = req;
//     const store = getState();
//     let updatedData = res;
//     if (reducer) {
//         updatedData = reducer.call(this, store[key], res);
//     }
//     return {
//         ...res,
//         ...updatedData
//     };
// }


export default function middleware() {
    return getState => (req, next) => data => {
        const { actionConfig: { reducer, key } } = req;
        console.log('reducer', data);
        if (!reducer) {
            return next(data);
        };
        const store = getState();
        let updatedData = data;
        if (reducer) {
            updatedData = reducer.call(this, store[key], data);
        }
        return next({
            ...data,
            ...updatedData
        });
    }
}