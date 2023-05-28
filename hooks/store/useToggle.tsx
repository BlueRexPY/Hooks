import { useState } from 'react';

/**
 * useToggle hook is a custom hook that returns a boolean state value and a function to toggle the state.
 * @param {boolean} initialState - The initial state value. Default: false.
 * @returns {[boolean, () => void]} - A tuple containing the current state value and a function to toggle the state.
 * @example
 * const [isOn, toggleIsOn] = useToggle();
 * return (
 *   <button onClick={toggleIsOn}>
 *     {isOn ? 'ON' : 'OFF'}
 *   </button>
 * );
 */
const useToggle = (initialState = false): [boolean, () => void] => {
  const [isOn, setIsOn] = useState(initialState);
  const toggle = () => setIsOn((prev) => !prev);

  return [isOn, toggle];
};

export default useToggle;
