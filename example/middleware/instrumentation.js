import fakeAsync from './util/fakeAsync';

export default function instrumentation() {
    return getState => (req, next) => (data = {}) => {
        const { actionConfig: { instrumentation = false, type }, actionName, payload } = req;
        if (actionName && instrumentation) {
            const dispatchEvent = () =>
                document.dispatchEvent(new CustomEvent(actionName, {
                    detail: {
                        getState,
                        props: payload
                    }
                }));

            fakeAsync(dispatchEvent);

        }
        return next(data);
    }
}
