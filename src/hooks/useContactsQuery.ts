
import { useQuery } from '@tanstack/react-query';
import { Contact, ContactsResponse } from '../types/contact';

const API_BASE_URL = 'http://localhost:3001/api';

const fetchContacts = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
  favouriteOnly: boolean = false
): Promise<ContactsResponse> => {
  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
  });

  if (search) {
    params.append('q', search);
  }

  if (favouriteOnly) {
    params.append('favourite', 'true');
  }

  const response = await fetch(`${API_BASE_URL}/contacts?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }

  const data = await response.json();
  const total = parseInt(response.headers.get('X-Total-Count') || '0');
  
  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

const fetchContact = async (id: number): Promise<Contact> => {
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

export const useContactQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => fetchContact(id!),
    enabled: !!id,
  });
};
