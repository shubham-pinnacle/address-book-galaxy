import { SxProps, Theme } from '@mui/material/styles';

export const paginationStyles: { [key: string]: SxProps<Theme> } = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    mt: 4,
    mb: 2,
  },
  pageText: {
    minWidth: '100px',
    textAlign: 'center',
  },
};
