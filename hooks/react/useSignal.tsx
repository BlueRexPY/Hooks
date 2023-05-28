import { useCallback } from 'react';
import useRef from './useRef';
import useState from './useState';

/**
 * useSignal hook
 * @template T - The type of the value.
 * @param {T} initialValue - The initial value.
 * @returns {{ value: T }} - An object with the mutable value.
 * @example
 * const count = useSignal(0);
 * console.log(count.value); // 0
 * count.value = 1;
 * console.log(count.value); // 1
 */
const useSignal = <T,>(initialValue: T): { value: T } => {
  const [, setUpdate] = useState<number>(0);
  const notify = useCallback(() => setUpdate((prev) => ++prev), []);
  const valueRef = useRef<{ value: T }>({ value: initialValue });

  const valueProxy = useRef<T>(
    new Proxy(valueRef.current, {
      get: (target, property) => {
        if (property === 'value') {
          return target.value;
        }
        return undefined;
      },
      set: (_, property, value) => {
        if (property === 'value') {
          valueRef.current.value = value;
          notify();
          return true;
        }
        return false;
      },
    }) as T,
  );

  return {
    value: valueProxy.current,
  };
};

export default useSignal;
