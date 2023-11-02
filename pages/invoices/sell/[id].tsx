import React from "react";
import Table from "../../../src/components/customComponents/Table";
import SellOrderServiceInstance from "../../../services/SellOrderService";
import { useQuery, QueryKey } from "@tanstack/react-query";
import CustomButton from "../../../src/components/customComponents/Button";
import { useRouter } from "next/router";
import Modal from "../../../src/components/customComponents/Modal";
import InputFieldsWithValidation from "../../../src/components/customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
const SELLORDERS: QueryKey = ["expenseCategories"];

const SellOrderItems: React.FC = () => {
  const id = useRouter()?.query?.id?.toString();

  const { enqueueSnackbar } = useSnackbar();

  const { data, refetch } = useQuery(
    SELLORDERS,
    async () => {
      try {
        return SellOrderServiceInstance.getSellOrdersByOrderID(id);
      } catch (err: any) {
        console.log(err);
        throw new Error(err);
      }
    },
    {
      retry: 3,
      refetchOnWindowFocus: true,
      retryDelay: 1000,
    }
  );
  const submitHandler = async (data: any) => {
    try {
      const updateItems = await SellOrderServiceInstance.updateSellOrderItem(
        data
      );

      enqueueSnackbar("Sell Order Item Updated Successfully", {
        variant: "success",
      });
      refetch();
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar(`Failed to Update Sell Order Item:${err}`, {
        variant: "error",
      });
    }
  };

  const rows = data?.map((row: any, index: number) => ({
    ...row,
    actions: (
      <InputFieldsWithValidation
        processTitle="Update"
        modalTitle="Update Sell Order Item"
        submitHandler={submitHandler}
        inputFields={inputs}
        modalType={false}
        updateData={{
          id: row.id,
          price: row.price,
          qty: row.qty,
        }}
      />
    ),
  }));

  return (
    <>
      <Table columns={columns} rows={rows || []} />
    </>
  );
};

export default SellOrderItems;

const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "itemName", label: "Item Name", align: "center" },
  { id: "price", label: "Price", align: "center" },
  { id: "qty", label: "QTY", align: "center" },
  { id: "itemColor", label: "Color", align: "center" },
  { id: "itemSize", label: "Size", align: "center" },
  { id: "itemCategory", label: "Category", align: "center" },
  { id: "actions", label: "Action", align: "center" },
];

const inputs = [
  {
    id: 1,
    label: "Price",
    name: "price",
    type: "number",
    required: true,
    helperText: "Price is required",
    isMenu: false,
    isSensitive: false,
  },
  {
    id: 2,
    label: "QTY",
    name: "qty",
    type: "number",
    required: true,
    helperText: "QTY is required",
    isMenu: false,
    isSensitive: true,
  },
];
