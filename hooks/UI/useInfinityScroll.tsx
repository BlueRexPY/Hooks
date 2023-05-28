/* eslint-disable curly */
import { useEffect, useRef } from 'react';

/**
 * useInfinityScroll is a custom hook that triggers a callback when the scroll container reaches the sentinel element.
 * @param scrollContainerRef - The ref of the scroll container element.
 * @param sentinelRef - The ref of the sentinel element that marks the end of the scrollable content.
 * @param callback - The callback function to be executed when the sentinel element is intersected.
 * @example
 * const scrollContainerRef = useRef(null);
 * const sentinelRef = useRef(null);
 * const callback = () => console.log('Sentinel is intersecting');
 * useInfinityScroll(scrollContainerRef, sentinelRef, callback);
 * <div ref={scrollContainerRef}>
 *   <div>Scrollable content</div>
 *   <div ref={sentinelRef}>Sentinel</div>
 * </div>
 */
const useInfinityScroll = (
  scrollContainerRef: React.MutableRefObject<HTMLElement | null>,
  sentinelRef: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
): void => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const sentinel = sentinelRef.current;

    if (!scrollContainer || !sentinel) return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection);
    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [scrollContainerRef, sentinelRef, callback]);
};

export default useInfinityScroll;
