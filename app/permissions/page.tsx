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
import { Permission } from "./interface";
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
import AddPermission from "./components/AddPermissions";
import deletePermission from "./actions/deletePermission";
import { LightButton, SolidButton } from "../common/components/Buttons";
import getPermissions from "./actions/getPermission";

export default function PermissionTablePage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPermissionId, setSelectedPermissionId] = useState<
    number | string | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [totalRecords, setTotalRecords] = useState<number | undefined>(
    undefined
  );
  const [isCursorBased, setIsCursorBased] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchSubject, setSearchSubject] = useState<string>("");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleDrawerOpen = (permission?: Permission) => {
    setSelectedPermission(permission || null); // Set the permission to be edited or null for adding
    setIsDrawerOpen(true);
    handleMenuClose();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedPermission(null);
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

  const handlePermissionSaved = () => {
    setCurrentPage(1);
    fetchData(1);
  };

  const fetchData = async (page: number) => {
    console.log("currentPage", page, searchTitle, searchSubject);
    try {
      const offset = (page - 1) * limit;
      const response = await getPermissions(
        limit,
        offset,
        searchTitle,
        searchSubject
      );
      //console.log(response);
      setIsCursorBased(response.cursorBased);
      setPermissions(response.data);
      if (response.totalRecords && response.totalRecords > 0) {
        setTotalRecords(response.totalRecords);
        setTotalPages(Math.ceil(response.totalRecords / limit));
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw new Error("Failed fetching permissions");
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
    permissionId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPermissionId(permissionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPermissionId(null);
  };

  const handleDelete = () => {
    //setPermissions(permissions.filter((permission) => permission._id !== selectedPermissionId));
    deletePermission(selectedPermissionId as string);
    handleCloseConfirmDialog();
    handleMenuClose();
    handleSearch(); // to refresh the page
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1); // Fetch data with the search parameters
  };
  const handleReset = () => {
    setSearchTitle("");
    setSearchSubject("");
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
      <Breadcrumb
        items={[{ name: "Home", link: "/" }, { name: "Permissions" }]}
      />

      {/* Search Form */}
      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <TextField
          label="Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          size="small"
        />
        <TextField
          label="Subject"
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
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
          Add Permission
        </Link>
      </Stack>

      {(permissions && (
        <>
          <StyledTable
            isLoading={isLoading}
            columns={["Title", "Subject", "Allowed Actions", "Actions"]}
          >
            {permissions.map((permission, index) => (
              <TableRow
                key={permission._id}
                sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
              >
                <TableCell key={"col1" + permission._id}>
                  {permission.title}
                </TableCell>
                <TableCell key={"col2" + permission._id}>
                  {permission.subject}
                </TableCell>
                <TableCell key={"col3" + permission._id}>
                  {permission.actions?.join(", ")}
                </TableCell>
                <TableCell key={"col5" + permission._id}>
                  <IconButton
                    aria-label="actions"
                    aria-controls={`menu-${permission._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, permission._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${permission._id}`}
                    anchorEl={anchorEl}
                    open={
                      Boolean(anchorEl) &&
                      selectedPermissionId === permission._id
                    }
                    onClose={handleMenuClose}
                  >
                    {/*<MenuItem onClick={() => handleDrawerOpen(permission)}>
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
              recCount={permissions?.length > 0 ? permissions.length : 0}
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

      {/* Drawer for adding a new permission */}
      <AddPermission
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onPermissionSaved={handlePermissionSaved}
        permission={selectedPermission} // Pass selectedPermission to populate form when editing
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirmDialog}
        title="Confirm Deletion"
        content="Are you sure you want to delete this permission? This action cannot be undone."
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDelete}
      />
    </>
  );
}
