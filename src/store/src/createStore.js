export default function createStore(/* initial state */ state = {}, middleware = []) {
    let subscribers = [];
    state = Object.assign({}, state);
    middleware = middleware.map(fn => fn(getState));
    function subscribe(subscriber) {
        subscribers.push(subscriber);
        return () => { unsubscribe(subscriber); };
    }

    function unsubscribe(subscriber) {
        const activeSubscribers = subscribers.reduce((out, subs) => {
            if (subs === subscriber) {
                subscriber = null;
            } else {
                out.push(subs);
            }
            return out;
        }, []);

        subscribers = activeSubscribers;
    }

    function action(action) {
        return function storeAction(props, behaviors) {
            return action.apply(this, [getState, middleware, setState, props, behaviors]);
        };
    }

    function setState(updateState) {
        if (process.env.NODE_ENV === 'development') {
            console.log('%c prev state', 'color: grey', state);
        }
        state = {
            ...state,
            ...updateState
        };
        if (process.env.NODE_ENV === 'development') {
            console.log('%c new state', 'color: maroon', state);
        }
        return subscribers.map(subscriber => subscriber(state));
    }

    function getState() {
        return state;
    }

    return {
        getState,
        action,
        subscribe,
        unsubscribe,
        setState,
        dispatch: getState
    };
};
