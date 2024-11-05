"use client";

import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  isCursorBased?: boolean;
  recCount?: number;
  limit?: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  isCursorBased,
  recCount = 0,
  limit = 10,
  onPageChange,
}: PaginationComponentProps) {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      sx={{ mt: 2, mb: 2 }}
    >
      {!isCursorBased ? (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      ) : (
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => onPageChange(null as any, currentPage - 1)}
            aria-label="Previous page"
            disabled={currentPage <= 1}
          >
            <ArrowBackIcon />
          </IconButton>

          <IconButton
            onClick={() => onPageChange(null as any, currentPage + 1)}
            aria-label="Next page"
            disabled={recCount < limit}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}
