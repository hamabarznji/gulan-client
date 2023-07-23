import React from "react";
import VendorService from "../../../../services/VendorService";
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
      const newVendor: any = await VendorService.addVendor(data);
      if (newVendor.status === 200) {
        reFetchCategories();
        enqueueSnackbar("New Vendor Successfully!", {
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
        inputFields={[{ name: "name", label: "Vendor Name", type: "text" }]}
        processTitle="Add Vendor"
        modalTitle="Add Vendor"
        submitHandler={submitHandler}
        modalType={true}
      />
    </>
  );
};

export default AddUser;
