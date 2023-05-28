/* eslint-disable curly */
import { useState } from 'react';
import { cloneDeep, isEqual } from 'lodash';

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
