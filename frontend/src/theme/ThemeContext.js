import React, { createContext, useContext, useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * Minimal ThemeProvider to apply CSS variables for Ocean Professional.
 */
const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    // Ocean Professional variables
    root.style.setProperty('--color-primary', '#2563EB');
    root.style.setProperty('--color-secondary', '#F59E0B');
    root.style.setProperty('--color-success', '#F59E0B');
    root.style.setProperty('--color-error', '#EF4444');
    root.style.setProperty('--color-bg', '#f9fafb');
    root.style.setProperty('--color-surface', '#ffffff');
    root.style.setProperty('--color-text', '#111827');
    root.style.setProperty('--shadow-sm', '0 1px 2px rgba(0,0,0,0.05)');
    root.style.setProperty('--shadow-md', '0 4px 10px rgba(0,0,0,0.08)');
    root.style.setProperty('--radius-md', '12px');
    root.style.setProperty('--radius-sm', '8px');
    root.style.setProperty('--radius-lg', '16px');
    root.style.setProperty('--focus-ring', '0 0 0 3px rgba(37, 99, 235, 0.35)');
  }, []);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
