
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 4,
        mb: 2,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ChevronLeft />}
        onClick={handlePrevious}
        disabled={currentPage <= 1 || loading}
      >
        Previous
      </Button>

      <Typography variant="body1" sx={{ minWidth: '100px', textAlign: 'center' }}>
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="outlined"
        endIcon={<ChevronRight />}
        onClick={handleNext}
        disabled={currentPage >= totalPages || loading}
      >
        Next
      </Button>
    </Box>
  );
};
