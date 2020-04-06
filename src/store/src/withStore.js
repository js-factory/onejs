export default function withStore(storeOptions = {}) {
  return function wrapperFn(component) {
    component.__store__ = storeOptions;
    return component;
  };
}
