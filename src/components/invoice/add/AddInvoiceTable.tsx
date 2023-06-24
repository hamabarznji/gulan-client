import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "./invoiceTable/TableHead";
import CustomTableRow from "./invoiceTable/TableRow";
import InvoiceSummaryRow from "./invoiceTable/InvoiceSummaryRow";
import DeleteIcon from '@mui/icons-material/Delete';import { Button } from "@mui/material";
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
<Button variant="contained" color="error" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <DeleteIcon style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
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
