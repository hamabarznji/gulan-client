import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { QueryObserverResult, useQuery, QueryKey } from "react-query";
import ItemService from "../../../../services/ItemService";
import ItemsServiceInstance from "../../../../services/ItemService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import addItemInputs from '../../../interfaces/item/add';


type AddItemProps = {
  reFetchItems: () => Promise<QueryObserverResult<any, unknown>>;
};

const AddItem: React.FC<any> = ({ reFetchItems }: AddItemProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const newItem: any = await ItemService.addItem(data);
      if (newItem.status === 200) {
       reFetchItems();
        enqueueSnackbar("New Item Successfully Added!", {
          variant: "success",
        });
      } else {
        throw new Error("Failed to add new category"); // Provide a more specific error message
      }
    } catch (error: any) {
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  };

  const fetchItemInfo = async () => {
    try {
      const response = await ItemsServiceInstance.getItemInfo();
      const { categories, colors, sizes } = response;

      addItemInputs[2].options = categories.map((category: { id: number, name: string }) => ({ id: category.id, label: category.name, value: category.id }));
      addItemInputs[3].options = colors.map((color: { id: number, color: string }) => ({ id: color.id, label: color.color, value: color.id }));
      addItemInputs[4].options = sizes.map((size: { id: number, size: string }) => ({ id: size.id, label: size.size, value: size.id }));
      return response;
    } catch (error) {
      throw new Error("Failed to fetch item info"); // Provide a more specific error message
    }
  };

useEffect(() => {
  fetchItemInfo();
}
, []);

  return (
    
      <InputFields
        inputFields={addItemInputs}
        processTitle="Add Item"
        modalTitle="Add Item"
        submitHandler={submitHandler}
        modalType={true}
      />
    
  );
};

export default AddItem;
