import { SxProps, Theme } from '@mui/material/styles';

export const contactFormStyles: { [key: string]: SxProps<Theme> } = {
  dialog: {
    '& .MuiDialog-paper': {
      width: '100%',
      m: { xs: 1, sm: 'auto' },
      maxWidth: { xs: '95vw', sm: 600 },
      minWidth: { xs: 'unset', sm: 400 },
      boxSizing: 'border-box',
    },
  },
  addressInput: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowX: 'hidden',
    maxWidth: '100%',
  },
};
