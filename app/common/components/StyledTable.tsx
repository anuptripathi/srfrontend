// components/StyledTable.tsx
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SxProps } from "@mui/system";

interface StyledTableProps {
  columns: string[];
  children: React.ReactNode;
  containerSx?: SxProps;
}

export default function StyledTable({
  columns,
  children,
  containerSx,
}: StyledTableProps) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", ...containerSx }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
