

const hasOwnProperty = Object.prototype.hasOwnProperty; // eslint-disable-line

const iterate = (keys, target) => {
    let index = 0;
    let result;

    for (index = 0; index < keys.length; index += 1) {
        if (target && typeof target === 'object' && hasOwnProperty.call(target, keys[index])) {
            target = target[keys[index]]; // eslint-disable-line
            result = target;
        } else {
            result = null;
            break;
        }
    }
    return result;
};

const get = (obj, keys, defaultVal) => {
    let keyArray;
    const target = obj;

    if (obj && (typeof keys === 'string')) {
        keyArray = keys.split('.');
        const result = iterate(keyArray, target) || defaultVal;
        return result;
    }
    return defaultVal;
};

export default get;
