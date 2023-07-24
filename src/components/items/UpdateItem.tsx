import React from "react";
import ItemCategoryService from "../../.././services/ItemCategoryService";
import InputFields from ".././customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from 'react-query';


interface Props {
  item: any;
  reFetchItems: () => Promise<QueryObserverResult>;
}
const UpdateItem: React.FC<any> = ({ item,reFetchItems }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    return
    // try {
    //   const updatedUser: any = await ItemCategoryService.updateCategory({
    //     id: data.id,
    //     name: data.name,

    //   });

    //   if (updatedUser.status === 200) {
    //     reFetchCategories();
    //     enqueueSnackbar("Category Updated Successfully!", {
    //       variant: "success",
    //     });
    //   } else {
    //     throw new Error("Something went wrong");
    //   }
    // } catch (error: any) {
    //   console.error(error);
    //   enqueueSnackbar("Error: " + error.message, {
    //     variant: "error",
    //   });
    // }
  };
  return (
    <>
      <InputFields
        processTitle="Update Item"
        modalTitle="Update Item"
        submitHandler={submitHandler}
        inputFields={[{ name: "name", label: "Item Name", type: "text" }]}
        modalType={false}
        updateData={item}
      />
    </>
  );
};

export default UpdateItem;
