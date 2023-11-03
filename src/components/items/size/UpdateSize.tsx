import React from "react";
import SizeService from "../../../../services/SizeService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from 'react-query';
import SizeInputs from "../../../interfaces/item/AddSize";


interface Props {
  size: any;
  reFetchSizes: () => Promise<QueryObserverResult>;
}
const UpdateSize: React.FC<any> = ({ size,reFetchSizes }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const updatedSize: any = await SizeService.updateSize({
        id: data.id,
        size: data.size,

      });

      if (updatedSize.status === 200) {
        reFetchSizes();
        enqueueSnackbar("Size Updated Successfully!", {
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
  console.log({size})
  
  return (
    <>
      <InputFields
        processTitle="Update Size"
        modalTitle="Update Size"
        submitHandler={submitHandler}
        inputFields={SizeInputs}
        modalType={false}
        updateData={size}
      />
    </>
  );
};

export default UpdateSize;
