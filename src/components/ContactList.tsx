import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  InputAdornment,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Search, Add, PersonAdd } from '@mui/icons-material';
import { useContactStore } from '../store/useContactStore';
import { useStore } from '../store';
import { useContactsQuery } from '../hooks/useContactsQuery';
import { ContactCard } from './ContactCard';
import { Pagination } from './Pagination';
import { ContactModal } from './ContactModal';
import { ContactForm } from './ContactForm';


export const ContactList: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    showFavouritesOnly,
    toggleShowFavouritesOnly,
    currentPage,
    setCurrentPage,
    setIsContactFormOpen,
    setEditingContactId,
  } = useContactStore();


  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Update search query immediately when input changes
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearch(value);
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search change
  }, [setSearchQuery, setCurrentPage]);

  const { data, isLoading, error, refetch } = useContactsQuery(
    currentPage,
    searchQuery,
    showFavouritesOnly
  );



  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const handleAddContact = () => {
    setEditingContactId(null);
    setIsContactFormOpen(true);
  };



  const handleFavouriteToggle = useCallback(() => {
    toggleShowFavouritesOnly();
    setCurrentPage(1); // Reset to first page on filter change
  }, [toggleShowFavouritesOnly, setCurrentPage]);

  const contactsToDisplay = useMemo(() => {
    // Sort by descending id (string or number)
    return (data?.data || []).slice().sort((a, b) => {
      // Convert both IDs to strings for consistent comparison
      const idA = a.id.toString();
      const idB = b.id.toString();
      // Descending order
      return idB.localeCompare(idA, undefined, { numeric: true, sensitivity: 'base' });
    });
  }, [data]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" action={
          <Button onClick={() => refetch()}>Retry</Button>
        }>
          Failed to load contacts. Please check if the server is running on port 3001.
          <br />
          <Typography variant="body2" sx={{ mt: 1 }}>
            To start the JSON server, run: <code>npx json-server --watch db.json --port 3001</code>
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{
  mb: 2,
  width: { xs: '100%', md: '50%' },
  margin: '0 auto',
  textAlign: 'left',
  boxSizing: 'border-box',
  overflowX: 'hidden',
}}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', textAlign: 'left' }}>
          Contact Manager
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'left', mb:2 }}>
          Manage your contacts with ease
        </Typography>
      </Box>


      {/* Search and Filters */}
      <Paper sx={{
  p: { xs: 1.5, sm: 3 },
  mb: 4,
  width: { xs: '100%', md: '50%' },
  margin: '0 auto',
  boxSizing: 'border-box',
  overflowX: 'hidden',
}}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search contacts by name..."
            value={localSearch}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: { md: 400 } }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showFavouritesOnly}
                  onChange={handleFavouriteToggle}
                  color="primary"
                />
              }
              label="Show Favourites Only"
              sx={{ mr: 0, whiteSpace: 'nowrap' }}
            />
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={handleAddContact}
              sx={{ flexShrink: 0, whiteSpace: 'nowrap', minWidth: { xs: 40, md: 120 }, px: { xs: 1, md: 2 } }}
            >
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                Add Contact
              </Box>
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, px: { xs: 1, md: 0 }, boxSizing: 'border-box', overflowX: 'hidden' }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && contactsToDisplay.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8, px: { xs: 1, md: 0 }, boxSizing: 'border-box', overflowX: 'hidden' }}>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            {searchQuery || showFavouritesOnly ? 'No contacts found' : 'No contacts yet'}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {searchQuery || showFavouritesOnly 
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first contact'
            }
          </Typography>
          {!searchQuery && !showFavouritesOnly && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddContact}
              size="large"
            >
              Add Your First Contact
            </Button>
          )}
        </Box>
      )}

      {/* Contact Grid */}
      {!isLoading && contactsToDisplay.length > 0 && (
        <>
          <Box sx={{ mb: 2, px: { xs: 1, md: 0 }, boxSizing: 'border-box', overflowX: 'hidden' }}>
            <Typography variant="body1" color="textSecondary"  sx={{ ml: { xs: 0, md: 46 }, mb:2 , mt:2, wordBreak: 'break-word', maxWidth: '100%' }}>
              {data?.total} contact{data?.total !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
              {showFavouritesOnly && ' (favourites only)'}
            </Typography>
          </Box>

          <Box sx={{
  width: { xs: '100%', md: '50%' },
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  px: { xs: 1, md: 0 },
  boxSizing: 'border-box',
  overflowX: 'hidden',
}}>
            {contactsToDisplay.map((contact, idx) => (
              <ContactCard key={`${contact.id}-${idx}`} contact={contact} />
            ))}
          </Box>

          <Pagination
            currentPage={currentPage}
            sx={{ width: '100%', overflowX: 'hidden' }}
            totalPages={data?.totalPages || 1}
            onPageChange={handlePageChange}
            loading={isLoading}
          />
        </>
      )}

      {/* Modals */}
      <ContactModal />
      <ContactForm />
    </Box>
  );
};
