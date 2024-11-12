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
import { User } from "../common/interfaces/user-types-enum";
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
import getUsers from "./actions/get-users";
import { UserTypes } from "../common/interfaces/user-types-enum";
import AddUser from "./components/AddUser";
import { isAccountOwner } from "../common/helpers/user.helper";
import deleteUser from "./actions/deleteUser";

export default function UserTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | string | null>(
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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchUType, setSearchUType] = useState<string>("");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleDrawerOpen = (user?: User) => {
    setSelectedUser(user || null); // Set the user to be edited or null for adding
    setIsDrawerOpen(true);
    handleMenuClose();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
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

  const handleUserSaved = () => {
    setCurrentPage(1);
    fetchData(1);
  };

  const fetchData = async (page: number) => {
    console.log("currentPage", page);
    try {
      const offset = (page - 1) * limit;
      const response = await getUsers(
        limit,
        offset,
        searchName,
        searchEmail,
        searchUType
      );
      setIsCursorBased(response.cursorBased);
      setUsers(response.data);
      if (response.totalRecords && response.totalRecords > 0) {
        setTotalRecords(response.totalRecords);
        setTotalPages(Math.ceil(response.totalRecords / limit));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed fetching users");
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
    userId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleDelete = (id: string) => {
    //setUsers(users.filter((user) => user._id !== selectedUserId));
    deleteUser(id);
    handleCloseConfirmDialog();
    handleMenuClose();
    // handleSearch();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1); // Fetch data with the search parameters
  };
  const handleReset = () => {
    setSearchName("");
    setSearchEmail("");
    setSearchUType("");
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
      <Breadcrumb items={[{ name: "Home", link: "/" }, { name: "Users" }]} />

      {/* Search Form */}
      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <TextField
          label="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          size="small"
        />
        <TextField
          label="Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>User Type</InputLabel>
          <Select
            label="User Type"
            value={searchUType}
            onChange={(e) => setSearchUType(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.values(UserTypes).map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Link
          onClick={() => handleDrawerOpen()}
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Add User
        </Link>
      </Stack>

      {(users && (
        <>
          <StyledTable
            isLoading={isLoading}
            columns={["Name", "Email", "User Type", "IsAccount", "Actions"]}
          >
            {users.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
              >
                <TableCell key={"col1" + user._id}>{user.name}</TableCell>
                <TableCell key={"col2" + user._id}>{user.email}</TableCell>
                <TableCell key={"col3" + user._id}>{user.uType}</TableCell>
                <TableCell key={"col4" + user._id}>
                  {isAccountOwner(user) ? "Yes" : "No"}
                </TableCell>
                <TableCell key={"col5" + user._id}>
                  <IconButton
                    aria-label="actions"
                    aria-controls={`menu-${user._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, user._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${user._id}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedUserId === user._id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleDrawerOpen(user)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleOpenConfirmDialog}>
                      Delete
                    </MenuItem>
                  </Menu>

                  {/* Confirmation Dialog */}
                  <ConfirmDialog
                    open={openConfirmDialog}
                    title="Confirm Deletion"
                    content="Are you sure you want to delete this user? This action cannot be undone."
                    onClose={handleCloseConfirmDialog}
                    onConfirm={() => {
                      handleDelete(user._id);
                    }}
                  />
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
              recCount={users?.length > 0 ? users.length : 0}
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

      {/* Drawer for adding a new user */}
      <AddUser
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onUserSaved={handleUserSaved}
        user={selectedUser} // Pass selectedUser to populate form when editing
      />
    </>
  );
}
