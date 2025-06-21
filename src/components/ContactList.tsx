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
import { contactListStyles } from '../styles/ContactList.styles';
import { Search, Add, PersonAdd } from '@mui/icons-material';
import { useContactStore } from '../store/useContactStore';
import { useStore } from '../store';
import { useContactsQuery } from '../hooks/useContactsQuery';
import { ContactCard } from './ContactCard';
import { Pagination } from './Pagination';
import { ContactModal } from './ContactModal';
import { ContactForm } from './ContactForm';
import FloatingExportMenu from './FloatingExportMenu';
import { exportContactsAsCSV, exportContactsAsVCF } from '../utils/exportUtils';


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
      <Box sx={contactListStyles.headerBox}>
        <Typography variant="h3" component="h1" gutterBottom sx={contactListStyles.title}>
          Contact Manager
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={contactListStyles.subtitle}>
          Manage your contacts with ease
        </Typography>
      </Box>


      {/* Search and Filters */}
      <Paper sx={contactListStyles.searchPaper}>
        <Box sx={contactListStyles.searchFilterBox}>
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
            sx={contactListStyles.textField}
          />

          <Box sx={contactListStyles.filterActionBox}>
            <FormControlLabel
              control={
                <Switch
                  checked={showFavouritesOnly}
                  onChange={handleFavouriteToggle}
                  color="primary"
                />
              }
              label="Show Favourites Only"
              sx={contactListStyles.favSwitchLabel}
            />
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={handleAddContact}
              sx={contactListStyles.addContactBtn}
            >
              <Box component="span" sx={contactListStyles.addContactBtnText}>
                Add Contact
              </Box>
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Loading State */}
      {isLoading && (
        <Box sx={contactListStyles.loadingBox}>
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && contactsToDisplay.length === 0 && (
        <Box sx={contactListStyles.emptyBox}>
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
          <Box sx={contactListStyles.foundCountBox}>
            <Typography variant="body1" color="textSecondary"  sx={contactListStyles.foundCountText}>
              {data?.total} contact{data?.total !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
              {showFavouritesOnly && ' (favourites only)'}
            </Typography>
          </Box>

          <Box sx={contactListStyles.contactsGrid}>
            {contactsToDisplay.map((contact, idx) => (
              <ContactCard key={`${contact.id}-${idx}`} contact={contact} />
            ))}
          </Box>

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
      <FloatingExportMenu
        onExportCSV={() => exportContactsAsCSV(contactsToDisplay)}
        onExportVCF={() => exportContactsAsVCF(contactsToDisplay)}
      />
    </Box>
  );
};
