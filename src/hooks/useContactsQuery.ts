
import { useQuery } from '@tanstack/react-query';
import { Contact, ContactsResponse } from '../types/contact';

const API_BASE_URL = 'http://localhost:3001';

const fetchContacts = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
  favouriteOnly: boolean = false
): Promise<ContactsResponse> => {
  // First, get all contacts
  const response = await fetch(`${API_BASE_URL}/contacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  
  let allContacts = await response.json();
  
  // Apply filters client-side for better performance
  let filteredContacts = [...allContacts];
  
  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredContacts = filteredContacts.filter(contact => 
      contact.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply favourite filter
  if (favouriteOnly) {
    filteredContacts = filteredContacts.filter(contact => contact.favourite === true);
  }
  
  const total = filteredContacts.length;
  
  // Apply pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedContacts = filteredContacts.slice(start, end);
  
  return {
    data: paginatedContacts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

const fetchContact = async (id: string): Promise<Contact> => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }

  return response.json();
};

export const useContactsQuery = (
  page: number,
  search: string,
  favouriteOnly: boolean
) => {
  return useQuery({
    queryKey: ['contacts', page, search, favouriteOnly],
    queryFn: () => fetchContacts(page, 10, search, favouriteOnly),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useContactQuery = (id: string | null) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => fetchContact(id!),
    enabled: !!id,
  });
};
