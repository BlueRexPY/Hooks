import { useEffect, useState } from 'react';

type UseAsyncDataResult<T> = [T | null, boolean, string];
/** useAsyncData is a custom hook that returns data from an async request.
 * @template R
 * @param {() => Promise<R>} request - The async request.
 * @returns {[R | null, boolean, string]} - A tuple containing the data, loading state and error message.
 * @example
 * const [data, loading, error] = useAsyncData(() => axios.get('https://jsonplaceholder.typicode.com/todos/1'));
 * if (loading) return <p>Loading...</p>;
 * if (error) return <p>{error}</p>;
 * return <p>{data?.title}</p>;
 * */
const useAsyncData = <R,>(request: () => Promise<R>): UseAsyncDataResult<R> => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    request()
      .then((response) => setData((response as { data: R }).data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    return () => {
      setData(null);
      setLoading(false);
      setError('');
    };
  }, []);

  return [data, loading, error];
};

export default useAsyncData;
