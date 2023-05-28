/* eslint-disable curly */
import { useEffect, useState } from 'react';

/**
 * useErrorBoundary is a custom hook that catches errors thrown by child components
 * and allows you to display a custom error UI to the user.
 * @param {function} errorCallback - An optional callback function to handle error notifications or API calls.
 * @returns {Array} - An array with two elements: [error, resetError].
 *    - error: The error object that was caught, or undefined if nothing errored.
 *    - resetError: Call this function to mark the error as resolved.
 * @example
 * const [error, resetError] = useErrorBoundary();
 * if (error) {
 *   return (
 *     <div>
 *       <p>{error.message}</p>
 *       <button onClick={resetError}>Try again</button>
 *     </div>
 *   );
 * }
 */
const useErrorBoundary = (errorCallback?: (error: Error) => void): [Error | undefined, () => void] => {
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const handleError = (error: Error) => {
      setError(error);
      if (errorCallback) errorCallback(error);
    };

    const handleWindowError = (event: ErrorEvent) => {
      event.preventDefault();
      const error = new Error('Unhandled error');
      handleError(error);
    };

    window.addEventListener('error', handleWindowError);

    return () => window.removeEventListener('error', handleWindowError);
  }, [errorCallback]);

  const resetError = () => setError(undefined);

  return [error, resetError];
};

export default useErrorBoundary;
