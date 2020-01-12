const noop = () => ({});
export default function getProps(properties = []) {
    if (properties.length === 0) return noop;
    return state =>
        properties.reduce((selected, key) => {
            selected[key] = state[key];
            return selected;
        }, {});
};
