
# Contact Manager - Professional Contact Management App

A modern, professional contact management application built with React, Material-UI, Zustand, and TanStack Query.

## 🚀 Features

- **Contact Management**: Add, edit, view, and delete contacts
- **Advanced Search**: Real-time search with server-side filtering
- **Favorites System**: Mark contacts as favorites and filter by favorites
- **Responsive Design**: Works perfectly on desktop and mobile
- **Form Validation**: Comprehensive validation with React Hook Form
- **Modern UI**: Clean, professional interface with Material-UI
- **State Management**: Efficient state management with Zustand and TanStack Query
- **Pagination**: Smooth pagination for large contact lists

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Material-UI (MUI) v5** - Professional UI components
- **Zustand v5** - Lightweight state management for UI state
- **TanStack Query v5** - Server state management with caching
- **React Hook Form v7** - Form handling with validation
- **TypeScript** - Type safety throughout the application
- **json-server** - Mock REST API for development

## 📦 Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the json-server (mock API):**
   ```bash
   npx json-server --watch db.json --port 3001 --routes routes.json
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080`

## 🔧 API Configuration

The app expects a JSON server running on `http://localhost:3001/api` with the following endpoints:

- `GET /api/contacts` - Get paginated contacts
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

### Sample Contact Object:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "favourite": true
}
```

## 🎯 Usage

### Adding Contacts
1. Click the "Add Contact" button
2. Fill in the contact information
3. Optionally mark as favorite
4. Click "Create" to save

### Editing Contacts
1. Click on any contact card to open details
2. Click the "Edit" button in the modal
3. Update the information
4. Click "Update" to save changes

### Search and Filter
- Use the search bar to find contacts by name
- Toggle "Show Favourites Only" to filter favorites
- Search is performed server-side with real-time results

### Managing Favorites
- Click the heart icon on any contact card or in the detail modal
- Use the "Show Favourites Only" toggle to filter favorites

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ContactCard.tsx      # Individual contact card
│   ├── ContactForm.tsx      # Add/Edit contact form
│   ├── ContactList.tsx      # Main contact list component
│   ├── ContactModal.tsx     # Contact details modal
│   └── Pagination.tsx       # Pagination component
├── hooks/
│   ├── useContactsQuery.ts  # TanStack Query hooks
│   ├── useContactMutations.ts # Mutation hooks
│   └── useDebounce.ts       # Debounce hook for search
├── store/
│   └── useContactStore.ts   # Zustand store for UI state
├── types/
│   └── contact.ts           # TypeScript interfaces
├── pages/
│   ├── ContactListPage.tsx  # Main page component
│   └── Index.tsx           # Root page
└── main.tsx                # App entry point
```

## 🎨 Design Features

- **Material Design**: Follows Google's Material Design principles
- **Responsive Layout**: Grid system that adapts to screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Professional Theme**: Clean color scheme and typography
- **Accessible**: Proper ARIA labels and keyboard navigation

## 🔄 State Management

- **Zustand**: Manages UI state (search, selected contact, modals, pagination)
- **TanStack Query**: Handles server state with automatic caching and invalidation
- **React Hook Form**: Manages form state with validation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Performance Features

- **Debounced Search**: Reduces API calls during typing
- **Query Caching**: TanStack Query caches responses for better performance
- **Optimistic Updates**: UI updates immediately for better UX
- **Code Splitting**: Components are loaded efficiently

## 🎯 Future Enhancements

- Export contacts to CSV/PDF
- Contact groups and categories
- Advanced search filters
- Contact history tracking
- Bulk operations
- Contact import functionality

## 📄 License

This project is built with Lovable and is available for educational and commercial use.
