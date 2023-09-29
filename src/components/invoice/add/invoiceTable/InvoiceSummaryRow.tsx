import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../public/COLORS";
import Textfield from "../../../customComponents/TextField";
interface RowProps {
  items: Row[];
}

interface Row {
  num: string;
  product: string;
  qty: number;
  price: number;
  total: number;
  action: React.ReactNode;
}

const CustomTableRow: React.FC<RowProps> = ({ items }) => {
  const [discount,setDiscount]=useState(0)
  return (
    <>
      <TableRow>
        <TableCell
          rowSpan={1}
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
          Discount:
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
        >
<Textfield
onChange={(e)=>setDiscount(e?.target?.value)}
defaultValue={0}

/>
        </TableCell>
      </TableRow>
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
          {items.reduce((sum, i) => sum +  i.total, 0)}
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
          {items.reduce((sum, i) => sum + i.total , 0) -
            items.reduce((sum, i) => sum + i.total  , 0) * (discount/100)}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomTableRow;
