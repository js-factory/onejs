const onComplete = (req, res) => {
    const { onComplete } = req;
    const { data, behaviors } = res;
    if (typeof onComplete === 'function') {
        setTimeout(() => onComplete.apply(this, [data, behaviors]), 0)
    }
    return res;
};
export default onComplete;