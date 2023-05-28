import useRef from './useRef';

type SetStateAction<S> = S | ((prevState: S) => S);

type Dispatch<A> = (value: A) => void;

/**
 * useState hook
 * @param {S | (() => S)} initialState - initial state
 * @returns {[S, Dispatch<SetStateAction<S>>]} state and setState
 * @example
 * const [count, setCount] = useState(0);
 * setCount(1);
 * setCount((prevCount) => prevCount + 1);
 * setCount((prevCount) => prevCount + 1);
 * console.log(count); // 3
 */
const useState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const stateRef = useRef<S>(typeof initialState === 'function' ? (initialState as () => S)() : initialState);

  const setState: Dispatch<SetStateAction<S>> = (action) => {
    if (typeof action === 'function') {
      stateRef.current = (action as (prevState: S) => S)(stateRef.current);
    } else {
      stateRef.current = action;
    }
  };

  return [stateRef.current, setState];
};

export default useState;
