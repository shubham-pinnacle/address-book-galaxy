
import React, { useMemo } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ContactList } from '../components/ContactList';

// Create a wrapper that filters out development props
const createFilteredThemeProvider = <T extends { theme: any }>(
  Component: React.ComponentType<T>
) => {
  const FilteredComponent = (props: T & { children?: React.ReactNode }) => {
    // Filter out development-related props
    const filteredProps = useMemo(() => {
      const newProps = { ...props } as any;
      Object.keys(newProps).forEach(key => {
        if (key.startsWith('data-')) {
          delete newProps[key];
        }
      });
      return newProps as T;
    }, [props]);

    return <Component {...filteredProps} />;
  };
  
  // Set display name for better debugging
  FilteredComponent.displayName = `Filtered${Component.displayName || Component.name || 'Component'}`;
  
  return FilteredComponent;
};

// Create filtered versions of the MUI components
const FilteredThemeProvider = createFilteredThemeProvider(ThemeProvider);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// FilteredThemeProvider is now used to wrap ThemeProvider and filter out development props

export const ContactListPage: React.FC = () => {
  return (
    <FilteredThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <ContactList />
      </Container>
    </FilteredThemeProvider>
  );
};
