import React, { useEffect } from "react";
import ItemService from "../../../services/ItemService";
import InputFields from "../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";
import updateItemInputs from "../../interfaces/purchasesItems/update";
import ItemsServiceInstance from "../../../services/ItemService";

interface Props {
  item: any;
  reFetchItems: () => Promise<QueryObserverResult>;
}
const UpdateItem: React.FC<any> = ({ item, reFetchItems }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const fetchItemInfo = async () => {
    try {
      const response = await ItemsServiceInstance.getItemInfo();
      const { categories, colors, sizes } = response;

      updateItemInputs[2].options = categories.map((category) => ({
        id: category.id,
        label: category.name,
        value: category.id,
      }));
      updateItemInputs[3].options = colors.map((color) => ({
        id: color.id,
        label: color.color,
        value: color.id,
      }));
      updateItemInputs[4].options = sizes.map((size) => ({
        id: size.id,
        label: size.size,
        value: size.id,
      }));
      return response;
    } catch (error) {
      throw new Error("Failed to fetch item info"); // Provide a more specific error message
    }
  };

  useEffect(() => {
    fetchItemInfo();
  }, []);
  const submitHandler = async (data: any) => {
    return;
    try {
      const id = data?.itemId;
      const updateItem: any = await ItemService.updateItem(id, {
        selling_price: data.selling_price,
        category_id: data.category_id,
        color_id: data.color_id,
        size_id: data.size_id,
        name: data.name,
      });

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

  // console.log(updateItemInputs);
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
