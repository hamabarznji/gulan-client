import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../../public/COLORS";
import Row,{columns} from "./invoiceInfo";
interface RowProps {
  rows: Row[];
}



const CustomTableRow: React.FC<RowProps> = ({ rows }) => {
  return (
    <>
    {rows.map((row) => (
  <TableRow key={row.num}>
    {columns.map((column) => {
      const id = column.id.toString();
      const value = row[id];
      return (
        <TableCell
          key={column.id}
          sx={{
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
          align="center"
        >
          {value}
        </TableCell>
      );
    })}
  </TableRow>
))}

    </>
  );
};

export default CustomTableRow;
