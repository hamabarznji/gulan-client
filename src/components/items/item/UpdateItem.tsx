import React from "react";
import ItemService from "../../../../services/ItemService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";
import updateItemInputs from "../../../interfaces/item/add";

interface Props {
  item: any;
  reFetchItems: () => Promise<QueryObserverResult>;
}
const UpdateItem: React.FC<any> = ({ item, reFetchItems }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const id = data?.itemId;
      const updateItem: any = await ItemService.updateItem(id, {
        selling_price:data.selling_price,
        category_id:data.category_id,
        color_id:data.color_id,
        size_id:data.size_id,
        name:data.name,

      });
console.log(updateItem);
      if (updateItem.status === 200) {
        reFetchItems();
        enqueueSnackbar("Item Updated Successfully!", {
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
        processTitle="Update Item"
        modalTitle="Update Item"
        submitHandler={submitHandler}
        inputFields={updateItemInputs}
        modalType={false}
        updateData={item}
      />
    </>
  );
};

export default UpdateItem;
