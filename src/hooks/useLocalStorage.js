import { useEffect, useState } from 'react';

const NS = 'catindia:v1:';

// Reads safely: malformed or wrong-shaped data falls back to the default.
export function useLocalStorage(key, initial) {
  const k = NS + key;
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(k);
      if (raw == null) return initial;
      const parsed = JSON.parse(raw);
      const sameShape = Array.isArray(initial) ? Array.isArray(parsed) : typeof parsed === typeof initial;
      return sameShape ? parsed : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(k, JSON.stringify(value)); } catch { /* storage full/blocked */ }
  }, [k, value]);
  return [value, setValue];
}
