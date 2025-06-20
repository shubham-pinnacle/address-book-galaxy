
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  CircularProgress,
} from '@mui/material';
import { useContactStore } from '../store/useContactStore';
import { useContactMutations } from '../hooks/useContactMutations';
import { useContactQuery } from '../hooks/useContactsQuery';
import { ContactFormData } from '../types/contact';
import { useToast } from '../hooks/use-toast';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone is required').matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in format XXX-XXX-XXXX'),
  address: yup.string().required('Address is required'),
  favourite: yup.boolean(),
});

export const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const {
    isContactFormOpen,
    setIsContactFormOpen,
    editingContactId,
    setEditingContactId,
  } = useContactStore();

  const { data: contactData } = useContactQuery(editingContactId);
  const { createContact, updateContact } = useContactMutations();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      favourite: false,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (contactData && editingContactId) {
      reset({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        address: contactData.address,
        favourite: contactData.favourite,
      });
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        favourite: false,
      });
    }
  }, [contactData, editingContactId, reset]);

  const handleClose = () => {
    setIsContactFormOpen(false);
    setEditingContactId(null);
    reset();
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      if (editingContactId) {
        await updateContact.mutateAsync({ id: editingContactId, data });
        toast({
          title: "Success",
          description: "Contact updated successfully",
          variant: "success",
        });
      } else {
        await createContact.mutateAsync(data);
        toast({
          title: "Success",
          description: "Contact created successfully",
          variant: "success",
        });
      }
      handleClose();
    } catch (error) {
      console.error('Error saving contact:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to save contact. Please try again.';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const isLoading = createContact.isPending || updateContact.isPending;

  return (
    <Dialog open={isContactFormOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingContactId ? 'Edit Contact' : 'Add New Contact'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  placeholder="123-456-7890"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              name="favourite"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Mark as Favourite"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {editingContactId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
