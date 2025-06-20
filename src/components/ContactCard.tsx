
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { Contact } from '../types/contact';
import { useContactStore } from '../store/useContactStore';
import { useContactMutations } from '../hooks/useContactMutations';

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { setSelectedContactId, setIsContactModalOpen } = useContactStore();
  const { updateContact } = useContactMutations();

  const handleCardClick = () => {
    setSelectedContactId(contact.id);
    setIsContactModalOpen(true);
  };

  const handleToggleFavourite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateContact.mutateAsync({
        id: contact.id,
        data: { favourite: !contact.favourite },
      });
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
    }
  };

  return (
    <Card
  sx={{
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 4,
    },
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    p: { xs: 1, sm: 2 },
  }}
  onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1, maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', maxWidth: '100%', overflowX: 'hidden' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'primary.main', wordBreak: 'break-word', maxWidth: '100%' }}>
              {contact.name}
            </Typography>
            {contact.favourite && (
              <Chip
                label="Favourite"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <IconButton
            size="small"
            onClick={handleToggleFavourite}
            sx={{ color: contact.favourite ? 'error.main' : 'grey.400' }}
          >
            {contact.favourite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '100%', overflowX: 'hidden' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email sx={{ fontSize: 16, color: 'grey.600' }} />
            <Typography variant="body2" color="textSecondary" sx={{ wordBreak: 'break-word', maxWidth: '100%' }}>
              {contact.email}
            </Typography>
          </Box>
        </Box>

        {/* {contact.favourite && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label="Favourite"
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
};
