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

const initialProducts: Product[] = [];

export default function ProductTablePage() {
  const [products, setProducts] = useState(initialProducts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<
    number | string | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
    <Container maxWidth={false}>
      <Breadcrumb items={[{ name: "Home", link: "/" }, { name: "Products" }]} />

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
                open={Boolean(anchorEl) && selectedProductId === product._id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </StyledTable>
    </Container>
  );
}
