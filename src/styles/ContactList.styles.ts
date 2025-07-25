import { SxProps, Theme } from '@mui/material/styles';

export const contactListStyles: { [key: string]: SxProps<Theme> } = {
  root: { p: 3 },
  headerBox: {
    mb: 2,
    width: { xs: '100%', md: '50%' },
    margin: '0 auto',
    textAlign: 'left',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  title: { fontWeight: 700, color: 'primary.main', textAlign: 'left' },
  subtitle: { textAlign: 'left', mb: 2 },
  searchPaper: {
    p: { xs: 1.5, sm: 3 },
    mb: 4,
    width: { xs: '100%', md: '50%' },
    margin: '0 auto',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  searchFilterBox: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'stretch', md: 'center' },
    gap: 2,
  },
  textField: { maxWidth: { md: 400 } },
  filterActionBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
  },
  favSwitchLabel: { mr: 0, whiteSpace: 'nowrap' },
  addContactBtn: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    minWidth: { xs: 40, md: 120 },
    px: { xs: 1, md: 2 },
  },
  addContactBtnText: { display: { xs: 'none', md: 'inline' } },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    py: 8,
    px: { xs: 1, md: 0 },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  emptyBox: {
    textAlign: 'center',
    py: 8,
    px: { xs: 1, md: 0 },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  foundCountBox: {
    mb: 2,
    px: { xs: 1, md: 0 },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  foundCountText: {
    ml: { xs: 0, md: 46 },
    mb: 2,
    mt: 2,
    wordBreak: 'break-word',
    maxWidth: '100%',
  },
  contactsGrid: {
    width: { xs: '100%', md: '50%' },
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    px: { xs: 1, md: 0 },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  pagination: { width: '100%', overflowX: 'hidden' },
};
