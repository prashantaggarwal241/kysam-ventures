import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../services/apiClient';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(apiFn: () => Promise<T>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiFn();
      setState({ data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'An unexpected error occurred';
      setState({ data: null, loading: false, error: message });
    }
  }, [apiFn]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}
