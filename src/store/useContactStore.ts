
import { create } from 'zustand';

interface ContactStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedContactId: number | null;
  setSelectedContactId: (id: number | null) => void;
  showFavouritesOnly: boolean;
  toggleShowFavouritesOnly: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  isContactFormOpen: boolean;
  setIsContactFormOpen: (open: boolean) => void;
  editingContactId: number | null;
  setEditingContactId: (id: number | null) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedContactId: null,
  setSelectedContactId: (id) => set({ selectedContactId: id }),
  showFavouritesOnly: false,
  toggleShowFavouritesOnly: () => set((state) => ({ showFavouritesOnly: !state.showFavouritesOnly })),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  isContactModalOpen: false,
  setIsContactModalOpen: (open) => set({ isContactModalOpen: open }),
  isContactFormOpen: false,
  setIsContactFormOpen: (open) => set({ isContactFormOpen: open }),
  editingContactId: null,
  setEditingContactId: (id) => set({ editingContactId: id }),
}));
