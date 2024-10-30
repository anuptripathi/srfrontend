"use client";
import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledTable from "../common/components/StyledTable";
import Breadcrumb from "../common/components/BreadCrumb";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Product 1", description: "Description 1", price: 100 },
  { id: 2, name: "Product 2", description: "Description 2", price: 200 },
  { id: 3, name: "Product 3", description: "Description 3", price: 300 },
];

export default function ProductTablePage() {
  const [products, setProducts] = useState(initialProducts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    productId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleEdit = () => {
    // Implement edit logic here
    console.log("Edit product", selectedProductId);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete product", selectedProductId);
    setProducts(products.filter((product) => product.id !== selectedProductId));
    handleMenuClose();
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>
      <Breadcrumb items={[{ name: "Home", link: "/" }, { name: "Products" }]} />
      <StyledTable columns={["Name", "Description", "Price", "Actions"]}>
        {products.map((product, index) => (
          <TableRow
            key={product.id}
            sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
          >
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <IconButton
                aria-label="actions"
                aria-controls={`menu-${product.id}`}
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen(event, product.id)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`menu-${product.id}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedProductId === product.id}
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
