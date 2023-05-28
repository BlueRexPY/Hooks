/* eslint-disable curly */
import { Ref, useCallback, useRef } from 'react';

/**
 * useDebounce is a custom hook that debounces a callback function.
 *
 * @param callback - The callback function to be debounced.
 * @param delay - The delay in milliseconds.
 * @returns - The debounced callback function.
 * @example
 * const debouncedCallback = useDebounce(callback, 1000);
 * return <button onClick={debouncedCallback}>Click</button>;
 */
const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
  const timerRef = useRef<number | undefined>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => callback(...args), delay) as unknown as number;
    },
    [callback, delay],
  );

  return debouncedCallback as T;
};

export default useDebounce;
