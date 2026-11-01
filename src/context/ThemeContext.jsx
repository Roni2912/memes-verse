import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../config/constants';

const ThemeContext = createContext(null);
const query = '(prefers-color-scheme: dark)';

const readPreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.theme) || 'system';
  } catch {
    return 'system';
  }
};

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(readPreference); // light | dark | system
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (e) => setSystemDark(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const isDark = preference === 'system' ? systemDark : preference === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const value = useMemo(
    () => ({
      preference,
      isDark,
      setPreference: (next) => {
        setPreference(next);
        try {
          localStorage.setItem(STORAGE_KEYS.theme, next);
        } catch {
          /* ignore */
        }
      },
      toggle: () => {
        const next = isDark ? 'light' : 'dark';
        setPreference(next);
        try {
          localStorage.setItem(STORAGE_KEYS.theme, next);
        } catch {
          /* ignore */
        }
      },
    }),
    [preference, isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
