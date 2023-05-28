import { useEffect, useState } from 'react';

/**
 * useLocalStorage hook
 * @template T - The type of the value.
 * @param {string} key - The key used to store the value in local storage.
 * @param {T} initialValue - The initial value.
 * @returns {[T, (value: T) => void]} - A tuple containing the current value and a function to update it.
 * @example
 * const [name, setName] = useLocalStorage('name', 'Ruslan');
 * console.log(name); // 'Ruslan'
 * setName('Alice');
 * console.log(name); // 'Alice' (and stored in local storage)
 */
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
