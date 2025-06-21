import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const GlobalLoadingSpinner: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const open = isFetching > 0 || isMutating > 0;

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 9999,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}
      open={open}
      transitionDuration={200}
    >
      <CircularProgress color="inherit" size={64} thickness={4} />
    </Backdrop>
  );
};

export default GlobalLoadingSpinner;
