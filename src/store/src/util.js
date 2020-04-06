export const compose = (funcs, req) => {
  return funcs.reduce(function(a, b) {
    return function(...args) {
      return a(req, b(...args));
    };
  });
};
