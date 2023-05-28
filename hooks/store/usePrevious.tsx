import { useEffect, useRef } from 'react';

/**
 * usePrevious is a custom hook that returns the previous value of a variable.
 * @template T
 * @param {T} value - The current value of the variable.
 * @returns {T | undefined} - The previous value of the variable.
 * @example
 * const previousCount = usePrevious(count);
 */
const usePrevious = <T,>(value: T): T | undefined => {
  const previousValueRef = useRef<T>();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
};

export default usePrevious;
