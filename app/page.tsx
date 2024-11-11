// src/components/Dashboard.tsx
"use client";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { routes, unauthenticatedRoutes } from "./common/constants/routes";
import { AuthContext } from "./auth/auth-context";
import iconMapping from "./common/utils/iconMapping";
import MailIcon from "@mui/icons-material/Mail";

export default function Dashboard() {
  const isAuthenticated = React.useContext(AuthContext);
  const pages = isAuthenticated ? routes : unauthenticatedRoutes;
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {pages.map((page) => (
          <Grid item xs={12} sm={6} md={4} key={page.title}>
            <Link href={page.path} passHref>
              <Card
                sx={{
                  height: 150,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  "&:hover": {
                    boxShadow: theme.shadows[5],
                    transform: "scale(1.05)",
                    transition: "all 0.3s",
                  },
                }}
              >
                <IconButton
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.main,
                  }}
                >
                  {/* Use iconMapping to render the icon dynamically */}
                  {React.createElement(iconMapping[page.icon] || MailIcon, {
                    fontSize: "inherit",
                  })}
                </IconButton>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {page.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
