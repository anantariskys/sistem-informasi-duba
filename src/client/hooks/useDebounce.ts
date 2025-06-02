import { useEffect, useState } from 'react';

/**
 * Custom debounce hook
 * @param value - Nilai yang akan di-debounce
 * @param delay - Delay dalam milidetik (default: 500ms)
 * @returns debouncedValue - Nilai yang tertunda update-nya
 */
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timeout jika value berubah sebelum delay selesai
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
