
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { paginationStyles } from '../styles/Pagination.styles';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  sx?: any;
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
    <Box sx={paginationStyles.root}>
      <Button
        variant="outlined"
        startIcon={<ChevronLeft />}
        onClick={handlePrevious}
        disabled={currentPage <= 1 || loading}
      >
        Previous
      </Button>

      <Typography variant="body1" sx={paginationStyles.pageText}>
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
