import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import COLORS from "../../../../../../public/COLORS";
import Textfield from "../../../../customComponents/TextField";
import Modal from "../../../../customComponents/Modal";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import useUserContext from "../../../../../context/useUserContext";
import SellOrderServiceInstance from "../../../../../../services/SellOrderService";

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
          item_id: item.id,
          qty: item.invoiceQty,
          price: item.selling_price,
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
        router.push("/invoices");
      } else {
        throw new Error("Failed to create new sell order");
      }
    } catch (error) {
      enqueueSnackbar("Error: " + error, {
        variant: "error",
      });
    }
  };
  const total = items?
    .map((item:any) => {
      return {
        item_id: item?.id,
        qty: item?.invoiceQty,
        price: item?.selling_price,
      };
    }).reduce((sum:any, i:any) => sum + i.price * i.qty, 0);
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
        <TableCell
          colSpan={10}
          sx={{
            fontSize: "1rem",
            padding: "8px",
            color: COLORS.secondary,
            fontWeight: "bold",
          }}
        >
          <Modal
            processTitle={"Add New Invoice"}
            modalTitle={"Add New Invoice"}
            submitHandler={submitHandler}
            customeStyles={styles}
          >
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "black" }}
            >
              Proceed with invoice creation by clicking the button. Are you sure
              you want to continue?
            </Typography>
          </Modal>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomTableRow;

const styles = {
  contentStyle: {
    minWidth: "200px",
    minHeight: "100px",
    marginTop: "1rem",
  },
};
