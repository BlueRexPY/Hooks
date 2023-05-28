import { RefObject, useEffect, useState } from 'react';

interface OnScreenOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 *  useOnScreen hook
 *  @param {RefObject<HTMLElement>} ref - React ref
 *  @param {OnScreenOptions} options - IntersectionObserver options
 *  @returns {boolean} isIntersecting - true if element is in viewport
 *  @example
 *  const ref = useRef(null);
 *  const isOnScreen = useOnScreen(ref);
 *  return (
 *  <div ref={ref}>
 *   {isOnScreen ? 'In viewport' : 'Not in viewport'}
 *  </div>
 **/

const useOnScreen = (ref: RefObject<HTMLElement>, options: OnScreenOptions = {}): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 1.0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

export default useOnScreen;
