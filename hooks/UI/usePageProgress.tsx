import { useEffect, useState } from 'react';

/**
 * usePageProgress is a custom hook that tracks the progress of scrolling on a page.
 * It returns a value between 0 and 1, representing the percentage of the page scrolled.
 * @returns {number} - The progress of scrolling on the page (a value between 0 and 1).
 * @example
 * const progress = usePageProgress();
 * console.log(progress); // 0.5 (50% scrolled)
 */
const usePageProgress = (): number => {
  const [progress, setProgress] = useState<number>(0);

  const handleScroll = () =>
    setProgress(window.scrollY / document.documentElement.scrollHeight - window.innerHeight);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

export default usePageProgress;
