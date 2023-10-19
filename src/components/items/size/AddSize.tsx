import React from "react";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";
import SizeService from "../../../../services/SizeService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import SizeInputs from "../../../interfaces/item/AddSize";

type AddSizeProps = {
  reFetchSizes: () => Promise<QueryObserverResult<any, unknown>>;
};

const AddSize: React.FC<AddSizeProps> = ({ reFetchSizes, }) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const newColor: any = await SizeService.addSize(data);

      if (newColor.status === 200) {
        reFetchSizes();
        enqueueSnackbar("New Size Added Successfully!", {
          variant: "success",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: Error) {
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <InputFields
        processTitle="Add New Size"
        modalTitle="Add New Size"
        submitHandler={submitHandler}
        inputFields={SizeInputs||[]} // Use the updatedInputs
      />
    </>
  );
};

export default AddSize;
