import React, { useEffect } from "react";
import ItemService from "../../../../services/ItemService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryKey, QueryObserverResult, useQuery } from "react-query";
import updateItemInputs from "../../../interfaces/purchasesItems/update";
import ItemsServiceInstance from "../../../../services/ItemService";
import { useRouter } from "next/router";
const ITEMS_QUERY_KEY: QueryKey = ["items"];

interface Props {
  item: any;
  reFetchItems: () => Promise<QueryObserverResult>;
}
const UpdateItem: React.FC<any> = ({ item, reFetchItems }: Props) => {
  const orderId = useRouter().query.id?.toString();
  const { enqueueSnackbar } = useSnackbar();
  const fetchItemInfo = async () => {
    try {
      const response = await ItemsServiceInstance.getItemInfo();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch item info"); // Provide a more specific error message
    }
  };


  useEffect(() => {
    fetchItemInfo();
  }, []);
  const submitHandler = async (data: any) => {
    const { id, qty, price } = data;
    try {
      const updateItem: any = await ItemService.updatePurchasedItem(
        id,
        qty,
        price
      );
      if (updateItem.status === 200) {
        reFetchItems();
        enqueueSnackbar("Purchased Item Updated Successfully!", {
          variant: "success",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <InputFields
        processTitle="Update Pruchased Item"
        modalTitle="Update Pruchased Item"
        submitHandler={submitHandler}
        inputFields={updateItemInputs}
        modalType={false}
        updateData={item}
      />
    </>
  );
};

export default UpdateItem;
