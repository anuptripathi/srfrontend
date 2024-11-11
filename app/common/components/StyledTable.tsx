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
          <TableRow key="styledtableColumns">
            {columns.map((column, index) => (
              <TableCell key={`colName-${index}`}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <>
              {[...Array(10)].map((_, rowIndex) => (
                <TableRow key={`skelton-${rowIndex}`}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={`skeltonCell-${rowIndex}-${colIndex}`}>
                      {colIndex < columns.length - 1 ? (
                        <Skeleton variant="text" />
                      ) : (
                        <Skeleton variant="circular" width={40} height={40} />
                      )}
                    </TableCell>
                  ))}
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
