import React from 'react';
// Removed MUI Switch and FormControlLabel
import { useStore } from '../store';

const ThemeToggle: React.FC = () => {
  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {darkMode ? (
        // Moon icon
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#FFD600"/>
        </svg>
      ) : (
        // Sun icon
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" fill="#FFD600"/>
          <g stroke="#FFD600">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
