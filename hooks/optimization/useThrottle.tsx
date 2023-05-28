import { useEffect, useRef, useState } from 'react';

/**
 * useThrottle hook is a custom hook that throttles a function.
 * @template T
 * @param {function(...args: any[]): T} callback - The function to throttle.
 * @param {number} delay - The delay in milliseconds.
 * @returns {T | null} - The throttled value.
 * @example
 * const [count, setCount] = useState(0);
 * const throttledCount = useThrottle(() => count, 1000);
 * return (
 *  <div>
 *   <p>Count: {count}</p>
 *   <p>Throttled count: {throttledCount}</p>
 *   <button onClick={() => setCount(count + 1)}>Increment</button>
 * </div>
 * );
 */
const useThrottle = <T,>(callback: (...args: any[]) => T, delay: number): T | null => {
  const [throttledValue, setThrottledValue] = useState<T | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleThrottle = (...args: any[]): void => {
      if (!timeoutRef.current) {
        const result: T = callback(...args);
        setThrottledValue(result);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          setThrottledValue(null);
        }, delay);
      }
    };

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [callback, delay]);

  return throttledValue;
};

export default useThrottle;
