import { useEffect, useRef } from 'react';

export function useDebounce(callback, delay) {
  const debouncedCallback = useRef(null);

  useEffect(() => {
    debouncedCallback.current = debounceFn(callback, delay);
  }, [callback, delay]);

  return debouncedCallback.current;
}

export function debounceFn<T = any>(func: (...args: T[]) => void, delay: number = 500) {
  let timeoutId;
  return function (...args: T[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
