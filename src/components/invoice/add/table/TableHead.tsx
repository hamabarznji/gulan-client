import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../public/COLORS";

const columns = [
    { id: "#", label: "#", align: "center" },
    { id: "product", label: "Product", align: "center" },
    { id: "qty", label: "QTy", align: "center" },
    { id: "price", label: "Price", align: "center" },
    { id: "total", label: "Total", align: "center" },
    { id: "actions", label: "Action", align: "center" },
  ];

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
          align={column?.align}
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