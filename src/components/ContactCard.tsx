
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { contactCardStyles, favIconStyle } from '../styles/ContactCard.styles';
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
      sx={contactCardStyles.card}
      onClick={handleCardClick}
    >
      <CardContent sx={contactCardStyles.cardContent}>
        <Box sx={contactCardStyles.headerRow}>
          <Box sx={contactCardStyles.headerLeft}>
            <Typography variant="h6" component="h3" sx={contactCardStyles.nameText}>
              {contact.name}
            </Typography>
            {contact.favourite && (
              <Chip
                label="Favourite"
                size="small"
                color="primary"
                variant="outlined"
                sx={contactCardStyles.favChip}
              />
            )}
          </Box>
          <IconButton
            size="small"
            onClick={handleToggleFavourite}
            sx={favIconStyle(contact.favourite)}
          >
            {contact.favourite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>

        <Box sx={contactCardStyles.infoCol}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email sx={contactCardStyles.icon} />
            <Typography variant="body2" color="textSecondary" sx={contactCardStyles.emailText}>
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
