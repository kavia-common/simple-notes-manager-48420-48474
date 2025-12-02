import { useEffect, useMemo, useState } from 'react';
import LocalStorageService from './localStorageService';
import ApiService from './apiService';

/**
 * PUBLIC_INTERFACE
 * Hook that returns a storage service (API if healthy, otherwise localStorage).
 * Non-blocking: defaults to LocalStorage and swaps to API once health resolves.
 */
export function useStorageSelector() {
  const [svc, setSvc] = useState(LocalStorageService);

  const apiConfigured = !!process.env.REACT_APP_API_BASE;

  useEffect(() => {
    let isMounted = true;
    async function check() {
      if (!apiConfigured) return;
      const healthy = await ApiService.health();
      if (healthy && isMounted) {
        setSvc(ApiService);
      }
    }
    check();
    return () => {
      isMounted = false;
    };
  }, [apiConfigured]);

  // Stable object reference for consumers
  return useMemo(() => svc, [svc]);
}
