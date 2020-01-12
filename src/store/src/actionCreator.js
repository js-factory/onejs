import callbacks from './callbacks';

const log = (type) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`%c action --> ${type}`, 'color: green; font-weight: bold;');
    }
}

const compose = (funcs, req) => {
    return funcs.reduce(function (a, b) {
        return a(req, b(...args));
    });
};

function actionCreator(actionName, actionConfig = {}) {
    return function (getState, middleware, dispatch, payload = {}, behaviors) {
        const {
            url,
            key
        } = actionConfig;

        if (!middleware.length) {
            if(!url && key) {
                log(actionName);
                return dispatch({ [key]: result })
            }
            if (!url && !key) {
                log(actionName);
                return payload;
            };
        }

        const next = (result) => {
            if (result) {
                if (result.then) {
                    return result.then(data => ({ [key]: data })).then(dispatch);
                }
                const updatedData = callbacks(actionConfig, {
                    data: result,
                    key,
                    getState,
                    payload,
                    behaviors
                });
                const { data } = updatedData;
                return dispatch({ [key]: data });
            }
        }
        const o = compose(middleware, { actionName, actionConfig, behaviors, payload })({ actionName, actionConfig, behaviors, payload }, next);
        o(payload);
    }
};

export default actionCreator;
