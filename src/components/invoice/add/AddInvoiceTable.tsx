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
  const [items, setItems]: any = React.useState([]);

  const scannedItem: any = useBarcodeScanner();
  React.useEffect(() => {
    if (scannedItem) {
      const id = scannedItem?.itemId;
      const existingItem = items.find((i: any) => id === i?.itemId);

      if (existingItem) {
        const updatedItems: any = items.map((item: any) =>
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
        setItems((prev: any) => [...prev, scannedItem]);
      }
    }
  }, [scannedItem]);

  const data = items?.map((item: any, index: number) => {
    return {
      num: index + 1,
      id: item.id,
      product: item?.itemName,
      itemColor: item.itemColor,
      itemSize: item.itemSize,
      qty: item?.invoiceQty,
      price: item?.selling_price,
      total: item.selling_price * item.invoiceQty,
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
            const existingItem = items.find((i: any) => id === i?.itemId);
            if (existingItem?.invoiceQty === 1) {
              setItems((prevItems: any) =>
                prevItems.filter((_: any, i: number) => i !== index)
              );
              return;
            }

            const updatedItems = items.map((item: any) =>
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
          {items.length > 0 && <InvoiceSummaryRow items={items} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
