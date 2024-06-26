import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../../public/COLORS";
import Textfield from "../../../../customComponents/TextField";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import useUserContext from "../../../../../context/useUserContext";
import SellOrderServiceInstance from "../../../../../../services/SellOrderService";
import AlertModal from "../../../../customComponents/AlertModal";

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
  item:any,
  invoiceQty:number,
  id:string,
  selling_price:number


}

const msg="Proceed with invoice creation by clicking the button. Are you sure you want to continue?"

const InvoiceSummaryRow: React.FC<RowProps> = ({ items }) => {
  const [discount, setDiscount] = useState(0);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const user = useUserContext().user;

  const submitHandler = async () => {
    try {
      const orderInfo = {
        user_id: user!!.id,
        discount: discount,
      };
      const data = items.map((item) => {
        return {
          item_id: item?.id,
          qty: item?.invoiceQty,
          price:item? item?.selling_price:0,
        };
      });
      const order = {
        orderInfo,
        items: data,
      };
      const response = await SellOrderServiceInstance.createSellOrders(order);

      
      if (response === 200) {
        enqueueSnackbar("New Sell Order Created Successfully!", {
          variant: "success",
        });
        router.push("/invoices/sell");
      } else {
        throw new Error("Failed to create new sell order");
      }
    } catch (error) {
      enqueueSnackbar("Error: " + error, {
        variant: "error",
      });
    }
  };
  let total = 0;
  if (items) {
    total = items
      .map((item: any) => {
        return {
          item_id: item?.id,
          qty: item?.invoiceQty,
          price: item?.selling_price,
        };
      })
      .reduce((sum: any, i: any) => sum + i.price * i.qty, 0);
  }
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
            onChange={(e: any) => setDiscount(e?.target?.value)}
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
          {total?total:0}
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
          {(total - total * (discount / 100))?.toFixed(2)}
        </TableCell>
      </TableRow>
      <TableRow>
  <TableCell colSpan={1}></TableCell>
  <TableCell colSpan={1}></TableCell>
  <TableCell colSpan={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <AlertModal
      submitHandler={submitHandler}
      processTitle="Add Invoice"
      modalTitle="Add New Sell Invoice"
      msg={msg}
    />
  </TableCell>
</TableRow>

    </>
  );
};

export default InvoiceSummaryRow;