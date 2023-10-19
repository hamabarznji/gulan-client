import React from "react";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";
import ColorService from "../../../../services/ColorService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import ColorInputs from "../../../interfaces/item/AddColor";

type AddColorProps = {
  reFetchColors: () => Promise<QueryObserverResult<any, unknown>>;
};

const AddSize: React.FC<AddColorProps> = ({ reFetchColors, }) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const newColor: any = await ColorService.addCOlor(data);

      if (newColor.status === 200) {
        reFetchColors();
        enqueueSnackbar("New Color Added Successfully!", {
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
        processTitle="Add New Color"
        modalTitle="Add New Color"
        submitHandler={submitHandler}
        inputFields={ColorInputs||[]} // Use the updatedInputs
      />
    </>
  );
};

export default AddSize;
