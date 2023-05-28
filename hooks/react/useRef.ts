/**
 * useRef hook
 * @param {T} initialValue
 * @returns {{ current: T }}
 * @example
 * const ref = useRef(0);
 * console.log(ref.current); // 0
 * ref.current = 1;
 * console.log(ref.current); // 1
 **/
const useRef = <T>(initialValue: T): { current: T } => {
  let value = initialValue;
  const subscribers = new Set<() => void>();

  const notifySubscribers = () => {
    subscribers.forEach((subscriber) => subscriber());
  };

  const ref = new Proxy<{ current: T }>(
    { current: value },
    {
      get(target, prop) {
        if (prop === 'current') {
          subscribers.add(() => console.log('Value updated:', value));
          return value;
        }
        return target[prop as keyof typeof target];
      },
      set(target, prop, newValue) {
        target[prop as keyof typeof target] = newValue;
        notifySubscribers();
        return true;
      },
    },
  );

  return ref;
};

export default useRef;
