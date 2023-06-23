import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../public/COLORS";
import { Button } from "@mui/material";

interface RowProps {
  rows: Row[];
}

interface Row {
  num: string;
  product: string;
  qty: number;
  price: number;
  total: number;
  action: React.ReactNode;
}

const CustomTableRow: React.FC<RowProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row) => (
        <TableRow key={row.num}>
          <TableCell
            sx={{
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
            align="center"
          >
            {row.num}
          </TableCell>
          <TableCell
            sx={{
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
            align="center"
          >
            {row.product}
          </TableCell>
          <TableCell
            sx={{
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
            align="center"
          >
            {row.qty}
          </TableCell>
          <TableCell
            sx={{
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
            align="center"
          >
            {row.price}
          </TableCell>
          <TableCell
            sx={{
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
            align="center"
          >
            {row.price * row.qty}
          </TableCell>
          <TableCell
            sx={{
              color: COLORS.secondary,
              fontWeight: "bold",
            }}
            align="center"
          >
            {row.action}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default CustomTableRow;
