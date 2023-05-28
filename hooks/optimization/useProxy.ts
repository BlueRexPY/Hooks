/* eslint-disable curly */
import { useCallback, useRef, useState } from 'react';

/**
 * useProxy hook is a proxy-based state management hook.
 * @param {object} obj - The object to create a proxy for.
 * @returns {object} - A proxied object that triggers updates when properties are accessed or modified.
 * @example
 * const obj = useProxy({ count: 0 });
 * console.log(obj.count); // 0
 * obj.count = 1;
 * console.log(obj.count); // 1
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
