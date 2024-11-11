// components/RightDrawer.tsx
import React, { ReactNode } from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: number; // optional width prop
  children: ReactNode;
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  isOpen,
  onClose,
  title,
  width = 300, // default width if not provided
  children,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        "& .MuiDrawer-paper": {
          width: width,
        },
      }}
    >
      <Box
        sx={{ width: width, p: 3, position: "relative" }}
        role="presentation"
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        {children}
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
