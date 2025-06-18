
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact, ContactFormData } from '../types/contact';

const API_BASE_URL = 'http://localhost:3001/api';

const createContact = async (contactData: ContactFormData): Promise<Contact> => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error('Failed to create contact');
  }

  return response.json();
};

const updateContact = async ({ id, data }: { id: number; data: Partial<ContactFormData> }): Promise<Contact> => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update contact');
  }

  return response.json();
};

const deleteContact = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
};

export const useContactMutations = () => {
  const queryClient = useQueryClient();

  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  return {
    createContact: createContactMutation,
    updateContact: updateContactMutation,
    deleteContact: deleteContactMutation,
  };
};
