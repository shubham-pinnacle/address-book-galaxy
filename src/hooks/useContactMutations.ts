
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact, ContactFormData } from '../types/contact';

const API_BASE_URL = 'http://localhost:3001';

const checkExistingContact = async (email: string, phone: string): Promise<{ exists: boolean; field?: 'email' | 'phone' }> => {
  const response = await fetch(`${API_BASE_URL}/contacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  const contacts = await response.json();
  
  const existingEmail = contacts.find((contact: Contact) => contact.email.toLowerCase() === email.toLowerCase());
  if (existingEmail) {
    return { exists: true, field: 'email' };
  }
  
  const existingPhone = contacts.find((contact: Contact) => contact.phone === phone);
  if (existingPhone) {
    return { exists: true, field: 'phone' };
  }
  
  return { exists: false };
};

const createContact = async (contactData: ContactFormData): Promise<Contact> => {
  // Check for existing contact with same email or phone
  const { exists, field } = await checkExistingContact(contactData.email, contactData.phone);
  
  if (exists) {
    throw new Error(`A contact with this ${field} already exists`);
  }
  
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

const updateContact = async ({ id, data }: { id: string; data: Partial<ContactFormData> }): Promise<Contact> => {
  // First, get the existing contact data
  const getResponse = await fetch(`${API_BASE_URL}/contacts/${id}`);
  if (!getResponse.ok) {
    throw new Error('Failed to fetch contact for update');
  }
  const existingData = await getResponse.json();

  // Merge the existing data with the updates
  const updatedData = { ...existingData, ...data };

  // Send the complete updated data
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Failed to update contact');
  }

  return response.json();
};

const deleteContact = async (id: string): Promise<void> => {
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
