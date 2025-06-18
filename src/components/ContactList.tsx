
import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Grid2 as Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  InputAdornment,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Search, Add, PersonAdd } from '@mui/icons-material';
import { useContactStore } from '../store/useContactStore';
import { useContactsQuery } from '../hooks/useContactsQuery';
import { ContactCard } from './ContactCard';
import { Pagination } from './Pagination';
import { ContactModal } from './ContactModal';
import { ContactForm } from './ContactForm';
import { useDebounce } from '../hooks/useDebounce';

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
  const debouncedSearch = useDebounce(localSearch, 300);

  // Update global search when debounced value changes
  React.useEffect(() => {
    setSearchQuery(debouncedSearch);
    setCurrentPage(1); // Reset to first page on search
  }, [debouncedSearch, setSearchQuery, setCurrentPage]);

  const { data, isLoading, error, refetch } = useContactsQuery(
    currentPage,
    searchQuery,
    showFavouritesOnly
  );

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  }, []);

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
    return data?.data || [];
  }, [data]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" action={
          <Button onClick={() => refetch()}>Retry</Button>
        }>
          Failed to load contacts. Please check if the server is running.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Contact Manager
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Manage your contacts with ease
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { md: 'center' } }}>
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

          <FormControlLabel
            control={
              <Switch
                checked={showFavouritesOnly}
                onChange={handleFavouriteToggle}
                color="primary"
              />
            }
            label="Show Favourites Only"
          />

          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={handleAddContact}
            sx={{ minWidth: 140 }}
          >
            Add Contact
          </Button>
        </Box>
      </Paper>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && contactsToDisplay.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" color="textSecondary">
              {data?.total} contact{data?.total !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
              {showFavouritesOnly && ' (favourites only)'}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {contactsToDisplay.map((contact) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={contact.id}>
                <ContactCard contact={contact} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
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
