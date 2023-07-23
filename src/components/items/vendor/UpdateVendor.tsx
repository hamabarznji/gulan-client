import React from "react";
import VendorService from "../../../../services/VendorService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from 'react-query';


interface Props {
  vendor: any;
  reFetchVendors: () => Promise<QueryObserverResult>;
}
const UpdateVendor: React.FC<any> = ({ vendor,reFetchVendors }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const updateVendor: any = await VendorService.updateVendor({
        id: data.id,
        name: data.name,

      });

      if (updateVendor.status === 200) {
        reFetchVendors();
        enqueueSnackbar("Vendor Updated Successfully!", {
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
        processTitle="Update Vendor"
        modalTitle="Update Vendor"
        submitHandler={submitHandler}
        inputFields={[{ name: "name", label: "Vendor Name", type: "text" }]}
        modalType={false}
        updateData={vendor}
      />
    </>
  );
};

export default UpdateVendor;
