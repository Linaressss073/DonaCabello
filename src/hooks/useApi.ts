import { useState, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook para fetch de datos de solo lectura.
 * Para mutations (POST/PATCH) maneja el estado directamente en el componente.
 *
 * @example
 * const { data: campaigns, loading, error } = useApi(() => getCampaigns(), []);
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });

    return () => { cancelled = true; };
    // deps gestionados por el llamador
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
