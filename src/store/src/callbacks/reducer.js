const injectReducer = (req, res) => {
  const { reducer } = req;
  const { key, getState, data } = res;
  const store = getState();
  let updatedData = data;
  if (reducer) {
    updatedData = reducer(store[key], data);
  }
  return {
    ...res,
    data: updatedData
  };
};
export default injectReducer;
