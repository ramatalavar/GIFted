export const debounce = (func, wait) => {
  let timeout;
  return () => {
    const later = () => {
      timeout = null;
      func.call(this);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
