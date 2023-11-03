import React from "react";
import ItemCategoryService from "../../../../services/ItemCategoryService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from 'react-query';


interface Props {
  category: any;
  reFetchCategories: () => Promise<QueryObserverResult>;
}
const UpdateCategory: React.FC<any> = ({ category,reFetchCategories }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const updatedUser: any = await ItemCategoryService.updateCategory({
        id: data.id,
        name: data.name,

      });

      if (updatedUser.status === 200) {
        reFetchCategories();
        enqueueSnackbar("Category Updated Successfully!", {
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
        processTitle="Update Category"
        modalTitle="Update Category"
        submitHandler={submitHandler}
        inputFields={[{ name: "name", label: "Category Name", type: "text" }]}
        modalType={false}
        updateData={category}
      />
    </>
  );
};

export default UpdateCategory;
