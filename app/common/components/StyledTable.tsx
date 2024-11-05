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
import { Skeleton } from "@mui/material";

interface StyledTableProps {
  isLoading: boolean;
  columns: string[];
  children: React.ReactNode;
  containerSx?: SxProps;
}

export default function StyledTable({
  isLoading,
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
        <TableBody>
          {isLoading ? (
            <>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column, index) => (
                    <>
                      {index > 0 && ( //skip one column, as actions coloum at end is there
                        <TableCell>
                          <Skeleton variant="text" />
                        </TableCell>
                      )}
                    </>
                  ))}
                  <TableCell>
                    <Skeleton variant="circular" width={40} height={40} />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
