"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledTable from "../common/components/StyledTable";
import Breadcrumb from "../common/components/BreadCrumb";
import { Role } from "./interface";
import PaginationComponent from "../common/components/Pagination";
import Alert from "@mui/material/Alert";
import ConfirmDialog from "../common/components/ConfirmDialog";
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRole from "./components/AddRoles";
import deleteRole from "./actions/deleteRole";
import { LightButton, SolidButton } from "../common/components/Buttons";
import getRoles from "./actions/getRole";

export default function RoleTablePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<number | string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [totalRecords, setTotalRecords] = useState<number | undefined>(
    undefined
  );
  const [isCursorBased, setIsCursorBased] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [searchName, setSearchName] = useState<string>("");
  const [searchDescription, setSearchDescription] = useState<string>("");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleDrawerOpen = (role?: Role) => {
    setSelectedRole(role || null); // Set the role to be edited or null for adding
    setIsDrawerOpen(true);
    handleMenuClose();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedRole(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    setIsLoading(true);
    fetchData(page);
    // Fetch data for the selected page here
  };

  const handleRoleSaved = () => {
    setCurrentPage(1);
    fetchData(1);
  };

  const fetchData = async (page: number) => {
    console.log("currentPage", page, searchName, searchDescription);
    try {
      const offset = (page - 1) * limit;
      const response = await getRoles(
        limit,
        offset,
        searchName,
        searchDescription
      );
      //console.log(response);
      setIsCursorBased(response.cursorBased);
      setRoles(response.data);
      if (response.totalRecords && response.totalRecords > 0) {
        setTotalRecords(response.totalRecords);
        setTotalPages(Math.ceil(response.totalRecords / limit));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw new Error("Failed fetching roles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData(1);
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    roleId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoleId(roleId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoleId(null);
  };

  const handleDelete = () => {
    //setRoles(roles.filter((role) => role._id !== selectedRoleId));
    deleteRole(selectedRoleId as string);
    handleCloseConfirmDialog();
    handleMenuClose();
    handleSearch(); // to refresh the page
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1); // Fetch data with the search parameters
  };
  const handleReset = () => {
    setSearchName("");
    setSearchDescription("");
    setCurrentPage(1);
    fetchData(1); // Fetch data with cleared search parameters
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <Breadcrumb items={[{ name: "Home", link: "/" }, { name: "Roles" }]} />

      {/* Search Form */}
      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <TextField
          label="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          size="small"
        />
        <TextField
          label="Description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          size="small"
        />

        <SolidButton onClick={handleSearch}>Search</SolidButton>
        <LightButton onClick={handleReset}>Reset</LightButton>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Link
          onClick={() => handleDrawerOpen()}
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Add Role
        </Link>
      </Stack>

      {(roles && (
        <>
          <StyledTable
            isLoading={isLoading}
            columns={[
              "Name",
              "Description",
              "Allowed Actions",
              "UserType",
              "Actions",
            ]}
          >
            {roles.map((role, index) => (
              <TableRow
                key={role._id}
                sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
              >
                <TableCell key={"col1" + role._id}>{role.name}</TableCell>
                <TableCell key={"col2" + role._id}>
                  {role.description}
                </TableCell>
                <TableCell key={"col3" + role._id}>
                  {role.permissions &&
                    role.permissions.map((permission) => (
                      <Typography>{permission.title}</Typography>
                    ))}
                </TableCell>
                <TableCell key={"col4" + role._id}>{role.uType}</TableCell>
                <TableCell key={"col5" + role._id}>
                  <IconButton
                    aria-label="actions"
                    aria-controls={`menu-${role._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, role._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${role._id}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedRoleId === role._id}
                    onClose={handleMenuClose}
                  >
                    {/*<MenuItem onClick={() => handleDrawerOpen(role)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleOpenConfirmDialog}>
                      Delete
                    </MenuItem>*/}
                    <MenuItem onClick={() => {}}>No Action</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </StyledTable>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 2, mb: 2 }}
          >
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              isCursorBased={isCursorBased}
              recCount={roles?.length > 0 ? roles.length : 0}
              limit={limit}
              onPageChange={handlePageChange}
            />
            {totalRecords && (
              <Typography variant="body2" color="textSecondary">
                Total Records: {totalRecords}
              </Typography>
            )}
          </Stack>
        </>
      )) || (
        <Alert severity="error">
          No records to show. Please reload or try again later.
        </Alert>
      )}

      {/* Drawer for adding a new role */}
      <AddRole
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onRoleSaved={handleRoleSaved}
        role={selectedRole} // Pass selectedRole to populate form when editing
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirmDialog}
        title="Confirm Deletion"
        content="Are you sure you want to delete this role? This action cannot be undone."
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDelete}
      />
    </>
  );
}
