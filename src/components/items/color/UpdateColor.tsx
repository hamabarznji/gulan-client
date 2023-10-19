import React from "react";
import ColorService from "../../../../services/ColorService";
import InputFields from "../../customComponents/InputFieldsWithValidation";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from 'react-query';
import ColorInputs from "../../../interfaces/item/AddColor";


interface Props {
  color: any;
  reFetchColors: () => Promise<QueryObserverResult>;
}
const updateSize: React.FC<any> = ({ color,reFetchColors }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const updateColor: any = await ColorService.updateColor({
        id: data.id,
        color: data.color,

      });
      console.log({updateColor})

      if (updateColor.status === 200) {
        reFetchColors();
        enqueueSnackbar("Color Updated Successfully!", {
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
        processTitle="Update Color"
        modalTitle="Update Color"
        submitHandler={submitHandler}
        inputFields={ColorInputs}
        modalType={false}
        updateData={color}
      />
    </>
  );
};

export default updateSize;
