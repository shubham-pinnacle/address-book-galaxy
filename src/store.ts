import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

interface StoreState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  lastDeletedContact: Contact | null;
  setLastDeletedContact: (contact: Contact | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      darkMode: false,
      setDarkMode: (value) => set({ darkMode: value }),
      lastDeletedContact: null,
      setLastDeletedContact: (contact) => set({ lastDeletedContact: contact }),
    }),
    {
      name: 'address-book-galaxy-store',
    }
  )
);
