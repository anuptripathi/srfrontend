"use client";
import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserTypes } from "../../common/interfaces/user-types-enum";
import { User } from "../../common/interfaces/user-types-enum";
import createUser from "../actions/create-user";
import updateUser from "../actions/update-user"; // Assume you have an API action for updating users
import { isAccountOwnerAdmin } from "../../common/helpers/user.helper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Ribeye } from "next/font/google";

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
  onUserSaved: () => void;
  user?: User | null | undefined; // Optional prop for editing an existing user
}

export default function AddUser({
  isOpen,
  onClose,
  onUserSaved,
  user,
}: AddUserProps) {
  const [formValues, setFormValues] = useState<User>({
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    uType: user?.uType || UserTypes.ENDUSER,
    roleId: user?.roleId || "addedBySuperadmin",
    accountId: user?.accountId || "",
    refreshToken: user?.refreshToken || "",
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: "", // Keep password blank when editing
        uType: user.uType,
        roleId: user.roleId,
        accountId: user.accountId,
        refreshToken: user.refreshToken,
      });
    }
  }, [user]);

  const handleFormChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, ...updatedFormValues } = formValues;
    let formVal;
    if (password && password.length > 0) {
      formVal = { ...updatedFormValues, password };
    } else {
      formVal = updatedFormValues;
    }
    try {
      if (user) {
        // If editing, call update user API
        await updateUser(user._id, formVal);
      } else {
        // If adding, call create user API
        await createUser(formVal);
      }
      onUserSaved(); // Callback to refresh the user list
      onClose(); // Close the drawer after saving
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const getMaskedToken = (token: string) => {
    if (token.length <= 15) {
      return token; // If the token length is 10 or less, no masking needed
    }
    return token.slice(0, 15) + "*******"; // Mask the token after the first 10 characters
  };

  const theme = useTheme();

  // Media queries for responsiveness
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  //const isLaptop = useMediaQuery(theme.breakpoints.up("md"));

  // Calculate drawer width based on screen size
  const minWidth = 280;
  const drawerWidth = isMobile || isTablet ? minWidth : minWidth * 2;
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      //onClose={() => {}}
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
          sx={{ position: "absolute", top: 8, right: 8, float: "right" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {user ? "Edit User" : "Add New User"}
        </Typography>
        <form onSubmit={handleFormSubmit} className="w-full max-w-xs">
          <Grid sx={{ width: drawerWidth - 30 }} container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="dense"
                size="small"
                value={formValues.name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="dense"
                size="small"
                value={formValues.email}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                fullWidth
                type="password"
                margin="dense"
                size="small"
                value={formValues.password}
                onChange={handleFormChange}
              />
            </Grid>
            {isAccountOwnerAdmin(formValues) && formValues?.refreshToken && (
              <Grid item xs={12} md={6}>
                <Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>
                      <Typography fontSize={12}>RefreshToken</Typography>
                      <Typography fontSize={12} color="gray">
                        {getMaskedToken(formValues.refreshToken)}
                      </Typography>
                    </Typography>
                    <CopyToClipboard text={formValues.refreshToken}>
                      <Button size="small" sx={{ mt: 1 }}>
                        Copy Token
                      </Button>
                    </CopyToClipboard>
                  </Stack>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  name="uType"
                  value={formValues.uType}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      uType: e.target.value as UserTypes,
                    })
                  }
                >
                  {Object.values(UserTypes).map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      control={<Radio sx={{ p: 0.5 }} />}
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                fullWidth={true}
                sx={{ maxWidth: "150px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
}
