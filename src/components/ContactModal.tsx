
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Close,
  Edit,
  Delete,
  Favorite,
  FavoriteBorder,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { useContactStore } from '../store/useContactStore';
import { useContactQuery } from '../hooks/useContactsQuery';
import { useContactMutations } from '../hooks/useContactMutations';
import { useToast } from '../hooks/use-toast';

export const ContactModal: React.FC = () => {
  const { toast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const {
    selectedContactId,
    setSelectedContactId,
    isContactModalOpen,
    setIsContactModalOpen,
    setIsContactFormOpen,
    setEditingContactId,
  } = useContactStore();

  const { data: contact, isLoading, error } = useContactQuery(selectedContactId);
  const { updateContact, deleteContact } = useContactMutations();

  const handleClose = () => {
    setIsContactModalOpen(false);
    setSelectedContactId(null);
    setShowDeleteConfirm(false);
  };

  const handleEdit = () => {
    if (contact) {
      setEditingContactId(contact.id);
      setIsContactFormOpen(true);
      setIsContactModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (contact) {
      try {
        await deleteContact.mutateAsync(contact.id);
        toast({
          title: "Success",
          description: "Contact deleted successfully",
          variant: "success",
        });
        handleClose();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete contact",
          variant: "destructive",
        });
      }
    }
  };

  const handleToggleFavourite = async () => {
    if (contact) {
      try {
        await updateContact.mutateAsync({
          id: contact.id,
          data: { favourite: !contact.favourite },
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update favourite status",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isContactModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !contact) {
    return (
      <Dialog open={isContactModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Alert severity="error">Failed to load contact details</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={isContactModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            Contact Details
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Header with name and favourite */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {contact.name}
            </Typography>
            <IconButton
              onClick={handleToggleFavourite}
              sx={{ color: contact.favourite ? 'error.main' : 'grey.400' }}
              disabled={updateContact.isPending}
            >
              {contact.favourite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>

          {contact.favourite && (
            <Chip
              label="Favourite Contact"
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />
          )}

          {/* Contact Information */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Email sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">{contact.email}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Phone sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Phone
                </Typography>
                <Typography variant="body1">{contact.phone}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <LocationOn sx={{ color: 'primary.main', mt: 0.5 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Address
                </Typography>
                <Typography variant="body1">{contact.address}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Are you sure you want to delete this contact? This action cannot be undone.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteContact.isPending}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={handleDelete}
                  disabled={deleteContact.isPending}
                >
                  {deleteContact.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </Box>
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          startIcon={<Delete />}
          color="error"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={showDeleteConfirm || deleteContact.isPending}
        >
          Delete
        </Button>
        <Button
          startIcon={<Edit />}
          variant="contained"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
