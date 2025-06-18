
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  favourite: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  favourite: boolean;
}

export interface ContactsResponse {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
