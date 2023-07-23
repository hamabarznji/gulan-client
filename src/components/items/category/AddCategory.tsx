import React from "react";
import ItemCategoryService from "../../../../services/ItemCategoryService";
import { useSnackbar } from "notistack";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { QueryObserverResult } from "react-query";

type AddUserProps = {
  reFetchCategories: () => Promise<QueryObserverResult<any, unknown>>;
};
const AddUser: React.FC<any> = ({ reFetchCategories }: AddUserProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const newCategory: any = await ItemCategoryService.addItemCategory(data);
      console.log(newCategory.status);
      if (newCategory.status === 200) {
        reFetchCategories();
        enqueueSnackbar("New  Category Successfully!", {
          variant: "success",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <InputFields
        inputFields={[{ name: "name", label: "Category Name", type: "text" }]}
        processTitle="Add Category"
        modalTitle="Add Category"
        submitHandler={submitHandler}
        modalType={true}
      />
    </>
  );
};

export default AddUser;
