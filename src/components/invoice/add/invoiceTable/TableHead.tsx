import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../public/COLORS";
import {columns } from './invoiceInfo'


const CustomTableHead: React.FC = () => {
  
    return <> <TableHead
    sx={{
      backgroundColor: COLORS.secondary,
    }}
  >
    <TableRow sx={{}}>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={"center"}
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead></>
}

export default CustomTableHead;