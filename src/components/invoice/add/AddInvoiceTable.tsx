import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "./invoiceTable/TableHead";
import CustomTableRow from "./invoiceTable/TableRow";
import InvoiceSummaryRow from "./invoiceTable/InvoiceSummaryRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import useBarcodeScanner from "../../../hook/useBarcodeScanner";

export default function SpanningTable() {

  const [items, setItems] = React.useState([]);

  const scannedItem = useBarcodeScanner();
  React.useEffect(() => {
    if (scannedItem && scannedItem?.length > 0) {
      const id = scannedItem[0]?.itemId;
      const existingItem = items.find((i) => id === i?.itemId);

      if (existingItem) {
        const updatedItems = items.map((item) =>
          item.itemId === existingItem.itemId
            ? {
                ...item,
                invoiceQty: item?.invoiceQty + 1,
                total: (item?.invoiceQty + 1) * item.price,
              }
            : item
        );
        setItems(updatedItems);
      } else {
        setItems((prev) => [...prev, scannedItem[0]]);
      }
    }
  }, [scannedItem]);

  if (!items.length) {
    return null;
  }

  const data = items?.map((item, index) => {
    return {
      num: index + 1,
      product: item?.itemName,
      itemColor: item.itemColor,
      itemSize: item.itemSize,
      qty: item?.invoiceQty,
      price: item?.sellingPrice,
      total: item.sellingPrice * item.invoiceQty,
      action: (
        <Button
          variant="contained"
          color="error"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            const id = item?.itemId;
            const existingItem = items.find((i) => id === i?.itemId);
            if (existingItem?.invoiceQty === 1) {
              setItems((prevItems) => prevItems.filter((_, i) => i !== index));
              return;
            }

            const updatedItems = items.map((item) =>
              item.itemId === existingItem.itemId
                ? {
                    ...item,
                    invoiceQty: item?.invoiceQty - 1,
                    total: (item?.invoiceQty - 1) * item.price,
                  }
                : item
            );
            setItems(updatedItems);
          }}
        >
          <DeleteIcon
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Button>
      ),
    };
  });

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead />
        <TableBody>
          <CustomTableRow rows={data || []} />
          <InvoiceSummaryRow items={data||[]} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
