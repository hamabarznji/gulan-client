import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "./table/TableHead";

import { Button } from "@mui/material";
import CustomTableRow from "./table/TableRow";
import InvoiceSummaryRow from "./table/InvoiceSummaryRow";

interface Row {
  num: string;
  product: string;
  qty: number;
  price: number;
  total: number;
  action: React.ReactNode;
}

const rows: Row[] = [
  {
    num: "1",
    product: "Product 1",
    qty: 2,
    price: 100,
    total: 100,
    action: (
      <Button variant="contained" color="error">
        Delete
      </Button>
    ),
  },
];

export default function SpanningTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead />
        <TableBody>
          <CustomTableRow rows={rows} />
          <InvoiceSummaryRow rows={rows} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
