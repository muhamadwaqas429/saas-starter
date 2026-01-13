import { useEffect, useState } from "react";

/**
 * useDebounce
 * -------------------------
 * Delays updating the returned value until
 * the user stops typing for `delay` ms.
 *
 * Why?
 * - Prevents filtering on every keystroke
 * - Improves performance with large lists
 *
 * Example:
 * const debouncedSearch = useDebounce(search, 400)
 */

export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
