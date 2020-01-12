
function hasHandlers(handlers) {
    return handlers && Object.keys(handlers).length > 0;
}

function bindHandlers(handlers, modifier) {
    hasHandlers(handlers) && Object.keys(handlers).map((key) => {
        const handler = handlers[key];
        if (typeof handler === 'function') {
            this.handlers[key] = modifier(handler, this);
        }
    });
}

export default bindHandlers;
