
const fakeAsync = (fn, ...args) => {
    if (typeof window === 'undefined') {
        return;
    }
    setTimeout(() => fn.apply(this, [...args]), 0)
};

export default fakeAsync;
