import { useEffect, useState } from 'react';

type UseAsyncDataResult<T> = [T | null, boolean, string];

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
  }, []);

  return [data, loading, error];
};

export default useAsyncData;
