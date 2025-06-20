import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box, useTheme, Fab } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface FloatingExportMenuProps {
  onExportCSV: () => void;
  onExportVCF: () => void;
}

const FloatingExportMenu: React.FC<FloatingExportMenuProps> = ({ onExportCSV, onExportVCF }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 20, sm: 32 },
        right: { xs: 20, sm: 32 },
        zIndex: theme.zIndex.tooltip + 1,
      }}
    >
      <Fab
        color="primary"
        aria-label="more options"
        onClick={handleOpen}
        sx={{ borderRadius: '50%', boxShadow: 6 }}
        size="medium"
      >
        <MoreVertIcon fontSize="medium" />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        PaperProps={{
          sx: {
            minWidth: 160,
            borderRadius: 2,
            boxShadow: 6,
            p: 0.5,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onExportCSV();
          }}
        >
          Export All as CSV
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onExportVCF();
          }}
        >
          Export All as VCF
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FloatingExportMenu;
