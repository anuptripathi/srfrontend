"use client";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { TextField } from "@mui/material";
import createPermission from "../actions/createPermission";
import updatePermission from "../actions/updatePermission";
import RightDrawer from "../../common/components/RightDrawer"; // Import RightDrawer
import { SolidButton } from "@/app/common/components/Buttons";
import { Permission } from "../interface";
import { Actions } from "@/app/common/constants/actions";
import { UserTypes } from "@/app/common/constants/userTypes";

interface AddPermissionProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionSaved: () => void;
  permission?: Permission | null | undefined;
}

export default function AddPermission({
  isOpen,
  onClose,
  onPermissionSaved,
  permission,
}: AddPermissionProps) {
  const actionsArr: string[] = [
    Actions.READ,
    Actions.ADD,
    Actions.EDIT,
    Actions.DELETE,
  ];
  const userTypes: string[] = [
    UserTypes.SUPERADMIN,
    UserTypes.PARTNER,
    UserTypes.ADMIN,
    UserTypes.ENDUSER,
  ];
  const [formValues, setFormValues] = useState<Permission>({
    _id: permission?._id || "",
    title: permission?.title || "",
    subject: permission?.subject || "",
    actions: permission?.actions || actionsArr,
    uType: permission?.uType || UserTypes.SUPERADMIN,
  });

  useEffect(() => {
    if (permission) {
      setFormValues({
        _id: permission?._id,
        title: permission?.title,
        subject: permission?.subject,
        actions: permission?.actions,
      });
    }
  }, [permission]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (permission) {
        await updatePermission(permission._id, formValues);
      } else {
        await createPermission(formValues);
      }
      onPermissionSaved();
      onClose();
    } catch (error) {
      console.error("Failed to save permission:", error);
    }
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={permission ? "Edit Permission" : "Add New Permission"}
    >
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="dense"
              size="small"
              value={formValues.title}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              margin="dense"
              size="small"
              value={formValues.subject}
              onChange={handleFormChange}
            />
          </Grid>

          {formValues?.actions && (
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Actions</FormLabel>
                <FormGroup>
                  {actionsArr.map((action) => (
                    <FormControlLabel
                      key={action}
                      control={
                        <Checkbox
                          checked={formValues?.actions?.includes(action)}
                          onChange={(e) => {
                            const newActions = e.target.checked
                              ? [...(formValues.actions as string[]), action] // Add action
                              : formValues?.actions?.filter(
                                  (a) => a !== action
                                ); // Remove action
                            setFormValues({
                              ...formValues,
                              actions: newActions,
                            });
                          }}
                          name={action}
                        />
                      }
                      label={action}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">User Type</FormLabel>
              <FormGroup>
                {userTypes.map((userType) => (
                  <FormControlLabel
                    key={userType}
                    control={
                      <Checkbox
                        checked={formValues.uType === userType}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormValues({
                              ...formValues,
                              uType: userType, // Set the selected userType
                            });
                          }
                        }}
                        name="uType"
                      />
                    }
                    label={userType}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "right" }}>
            <SolidButton type="submit" sx={{ maxWidth: 200 }}>
              Submit
            </SolidButton>
          </Grid>
        </Grid>
      </form>
    </RightDrawer>
  );
}
