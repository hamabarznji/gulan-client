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
      <TableRow>
        <TableCell
          rowSpan={3}
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
        />
        <TableCell
          colSpan={2}
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
        >
          Total
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
        >
          {rows.reduce((sum, i) => sum + i.price * i.qty, 0)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          colSpan={2}
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
        >
          Total After Discount
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
          align="right"
        >
          {rows.reduce((sum, i) => sum + i.price * i.qty, 0) -
            rows.reduce((sum, i) => sum + i.price * i.qty, 0) * 0.1}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomTableRow;
