export function debounce(callbackFn, timeout = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn.apply(this, args);
    }, timeout);
  };
}
