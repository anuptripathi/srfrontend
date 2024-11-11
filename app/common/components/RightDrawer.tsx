// components/RightDrawer.tsx
import React, { ReactNode } from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery, useTheme } from "@mui/material";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  minWidth?: number; // optional width prop
  children: ReactNode;
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  isOpen,
  onClose,
  title,
  minWidth = 280, // default width if not provided
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const drawerWidth = isMobile || isTablet ? minWidth : minWidth * 2;
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Box
        sx={{ width: drawerWidth, p: 3, position: "relative" }}
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
