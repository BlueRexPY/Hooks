/* eslint-disable curly */
import { useState } from 'react';
import { cloneDeep, isEqual } from 'lodash';

/**
 * useDeepClone hook
 * @param {T} obj - object to be cloned
 * @returns {[T, (newValue: T) => void]} cloned object and setter
 * @example
 * const [obj, setObj] = useDeepClone({ a: 1 });
 * setObj({ a: 1 }); // obj is not updated
 * setObj({ a: 2 }); // obj is updated
 */
const useDeepClone = <T,>(obj: T): [T, (newValue: T) => void] => {
  const [original, setOriginal] = useState<T>(obj);
  return [
    cloneDeep(original),
    (newValue: T) => {
      if (isEqual(original, newValue)) setOriginal(newValue);
    },
  ];
};

export default useDeepClone;
