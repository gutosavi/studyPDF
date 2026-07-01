import React from 'react';

const useFetch = <T>() => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const cache = React.useRef<Record<string, T | null>>({});

  const fetchData = React.useCallback(
    async (url: string): Promise<T | undefined> => {
      setIsLoading(true);
      setError('');

      if (cache.current && cache.current[url]) {
        setData(cache.current[url]);
        setIsLoading(false);
      } else {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Erro na requisição');

          const json = await response.json();
          setData(json);
          cache.current[url] = json;
          return json;
        } catch (error) {
          setError('Erro ao carregar API');
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};

export default useFetch;
