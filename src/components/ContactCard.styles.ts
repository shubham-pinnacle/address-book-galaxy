import { SxProps, Theme } from '@mui/material/styles';

export const contactCardStyles: { [key: string]: SxProps<Theme> } = {
  card: {
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
  },
  cardContent: {
    flexGrow: 1,
    pb: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 2,
    flexWrap: 'wrap',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  nameBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  nameText: {
    fontWeight: 600,
    color: 'primary.main',
    wordBreak: 'break-word',
    maxWidth: '100%',
  },
  favChip: {
    ml: 1,
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  emailText: {
    wordBreak: 'break-word',
    maxWidth: '100%',
  },
  icon: {
    fontSize: 16,
    color: 'grey.600',
  },
};

export const favIconStyle = (favourite: boolean): SxProps<Theme> => ({
  color: favourite ? 'error.main' : 'grey.400',
});
