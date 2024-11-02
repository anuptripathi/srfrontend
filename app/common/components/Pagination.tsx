// components/PaginationComponent.tsx
"use client";

import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps) {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      sx={{ mt: 2, mb: 2 }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        shape="rounded"
        variant="outlined"
      />
    </Stack>
  );
}
