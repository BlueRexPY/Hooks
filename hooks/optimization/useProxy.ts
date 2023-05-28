/* eslint-disable curly */
import { useCallback, useRef, useState } from 'react';

/**
 * useProxy hook
 * @param {object} obj
 * @returns {object}
 */
const useProxy = <T extends object>(obj: T): T => {
  const [, setUpdate] = useState<number>(0);
  const notify = useCallback(() => setUpdate((prev) => ++prev), []);

  const proxyRef = useRef<T>(
    new Proxy(obj, {
      get(...args) {
        const value = Reflect.get(...args);
        if (typeof value === 'object' && value !== null) return useProxy(value);
        return value;
      },
      set(...args) {
        const result = Reflect.set(...args);
        notify();
        return result;
      },
    }),
  );

  return proxyRef.current;
};

export default useProxy;
