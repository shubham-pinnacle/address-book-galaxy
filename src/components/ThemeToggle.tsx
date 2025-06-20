import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useStore } from '../store';

const ThemeToggle: React.FC = () => {
  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={handleToggle} color="primary" />}
      label="Dark Mode"
    />
  );
};

export default ThemeToggle;
