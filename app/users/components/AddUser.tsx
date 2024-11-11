"use client";
import React, { useEffect, useState } from "react";
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      //onClose={() => {}}
      onClose={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Box sx={{ width: 300, p: 3, position: "relative" }} role="presentation">
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {user ? "Edit User" : "Add New User"}
        </Typography>
        <form onSubmit={handleFormSubmit} className="w-full max-w-xs">
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="dense"
              size="small"
              value={formValues.name}
              onChange={handleFormChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="dense"
              size="small"
              value={formValues.email}
              onChange={handleFormChange}
            />
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

            {isAccountOwnerAdmin(formValues) && formValues?.refreshToken && (
              <Typography>
                <Typography fontSize={12}>RefreshToken</Typography>
                <Typography fontSize={12} color={"gray"}>
                  {formValues.refreshToken}
                </Typography>
              </Typography>
            )}

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

            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}
