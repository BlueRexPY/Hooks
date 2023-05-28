import { DependencyList, useMemo, useRef } from 'react';
import { isEqual } from 'lodash';

/**
 * useDeepMemo is a custom hook that performs deep memoization of a value derived from a function using Lodash's isEqual function.
 * @template T
 * @param {() => T} getValue - The function that returns the value to memoize.
 * @param {DependencyList} dependencies - The dependencies to track for memoization.
 * @returns {T} - The memoized value.
 * @example
 * const memoizedValue = useDeepMemo(() => calculateValue(dep1, dep2), [dep1, dep2]);
 */
const useDeepMemo = <T,>(getValue: () => T, dependencies: DependencyList): T => {
  const previousDependenciesRef = useRef<DependencyList>(dependencies);
  const memoizedValue = useMemo(() => {
    if (!isEqual(dependencies, previousDependenciesRef.current)) {
      previousDependenciesRef.current = dependencies;
    }
    return getValue();
  }, [getValue, dependencies]);

  return memoizedValue;
};

export default useDeepMemo;
