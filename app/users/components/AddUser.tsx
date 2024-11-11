"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserTypes } from "../../common/interfaces/user-types-enum";
import { User } from "../../common/interfaces/user-types-enum";
import createUser from "../actions/create-user";
import updateUser from "../actions/update-user";
import { isAccountOwnerAdmin } from "../../common/helpers/user.helper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RightDrawer from "../../common/components/RightDrawer"; // Import RightDrawer

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
  onUserSaved: () => void;
  user?: User | null | undefined;
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
        password: "",
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
    const formVal = password
      ? { ...updatedFormValues, password }
      : updatedFormValues;

    try {
      if (user) {
        await updateUser(user._id, formVal);
      } else {
        await createUser(formVal);
      }
      onUserSaved();
      onClose();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const getMaskedToken = (token: string) => {
    return token.length <= 15 ? token : token.slice(0, 15) + "*******";
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User" : "Add New User"}
    >
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
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

          {isAccountOwnerAdmin(formValues) && formValues.refreshToken && (
            <Grid item xs={12} md={6}>
              <Box>
                <Stack
                  direction="row"
                  sx={{
                    backgroundColor: "#6a857c",
                    marginTop: "10px",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  spacing={2}
                  alignItems="center"
                >
                  <Typography>
                    <Typography fontSize={12}>RefreshToken</Typography>
                    <Typography fontSize={12} color="black">
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

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "right" }}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ maxWidth: 200 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </RightDrawer>
  );
}
