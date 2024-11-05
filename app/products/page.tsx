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
import getProducts from "./actions/get-products";
import { Product } from "./interfaces/product.interface";
import PaginationComponent from "../common/components/Pagination";
import Alert from "@mui/material/Alert";
import { Stack, Typography } from "@mui/material";

export default function ProductTablePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    setIsLoading(true);
    fetchData(limit, page);
    // Fetch data for the selected page here
  };

  const fetchData = async (limit: number, page: number) => {
    try {
      const offset = (page - 1) * limit;
      const response = await getProducts(limit, offset);
      console.log(response);
      setIsCursorBased(response.cursorBased);
      setProducts(response.data);
      if (response.totalRecords && response.totalRecords > 0) {
        setTotalRecords(response.totalRecords);
        setTotalPages(Math.ceil(response.totalRecords / limit));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(limit, 1);
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    productId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleEdit = () => {
    console.log("Edit product", selectedProductId);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete product", selectedProductId);
    setProducts(
      products.filter((product) => product._id !== selectedProductId)
    );
    handleMenuClose();
  };

  return (
    <>
      <Breadcrumb items={[{ name: "Home", link: "/" }, { name: "Products" }]} />

      {!products && (
        <Alert severity="error">
          No records to show. Please reload or try again later.
        </Alert>
      )}
      {products && (
        <>
          <StyledTable
            isLoading={isLoading}
            columns={["Name", "Description", "Price", "Actions"]}
          >
            {products.map((product, index) => (
              <TableRow
                key={product._id}
                sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="actions"
                    aria-controls={`menu-${product._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, product._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${product._id}`}
                    anchorEl={anchorEl}
                    open={
                      Boolean(anchorEl) && selectedProductId === product._id
                    }
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
              recCount={products?.length > 0 ? products.length : 0}
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
      )}
    </>
  );
}
