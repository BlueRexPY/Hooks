import { useState } from 'react';

/**
 * useToggle hook
 * @param {boolean} initialState.
 * @returns {[boolean, () => void]}
 * @example
 * const [isOn, toggleIsOn] = useToggle();
 * return (
 *   <button onClick={toggleIsOn}>
 *     {isOn ? 'ON' : 'OFF'}
 *   </button>
 *  )
 */
const useToggle = (initialState = false): [boolean, () => void] => {
  const [isOn, setIsOn] = useState(initialState);
  const toggle = () => setIsOn((prev) => !prev);

  return [isOn, toggle];
};

export default useToggle;
