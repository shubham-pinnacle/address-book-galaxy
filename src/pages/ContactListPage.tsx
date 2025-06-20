
import React, { useMemo, useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { ContactList } from '../components/ContactList';
import ThemeToggle from '../components/ThemeToggle';

import { useStore } from '../store';



export const ContactListPage: React.FC = () => {

  const darkMode = useStore((state) => state.darkMode);



  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#181a1b' : '#f5f5f5',
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

  const handleUndo = () => {
    if (lastDeletedContact) {
      // TODO: Re-add contact logic here (API call or state update)
      setLastDeletedContact(null);
    }
    setUndoOpen(false);
  };

  const handleSnackbarClose = () => {
    setUndoOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
          <ThemeToggle />
        </Box>
        <ContactList />
      </Container>
    </ThemeProvider>
  );
};
