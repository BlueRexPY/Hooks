/* eslint-disable curly */
import { RefObject, useEffect, useState } from 'react';

/**
 * useHover is a custom hook that tracks whether an element is being hovered.
 * @param {RefObject<HTMLElement>} ref - The ref object representing the element to track.
 * @returns {boolean} - A boolean value indicating whether the element is being hovered.
 * @example
 * const elementRef = useRef(null);
 * const isHovered = useHover(elementRef);
 * console.log(isHovered); // false
 * <div ref={elementRef}>Hover me</div>
 */
const useHover = (ref: RefObject<HTMLElement>): boolean => {
  const [isHovering, setHovering] = useState(false);

  const on = () => setHovering(true);
  const off = () => setHovering(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);

    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    };
  }, [ref]);

  return isHovering;
};

export default useHover;
