import { ChangeEvent, useState } from 'react';

/**
 * useInput is a custom hook that provides a controlled input value and onChange handler.
 * @template T
 * @param {T} initialValue - The initial value of the input.
 * @returns {{ value: T, onChange: (event: ChangeEvent<HTMLInputElement>) => void }} - An object with the input value and onChange handler.
 * @example
 * const nameInput = useInput('');
 * <input type="text" {...nameInput} />
 */
const useInput = <T extends string | number>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value as T);

  return {
    value,
    onChange,
  };
};

export default useInput;
