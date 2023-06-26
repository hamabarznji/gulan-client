import React from "react";
import SelectCustome from "../customComponents/SelectInput";
import UserServiceInstance from "../../../services/user";
import { useSnackbar } from "notistack";
import InputFields from "../customComponents/InputFieldsWithValidation";

import addUserInputs from "../../interfaces/user/add";

const AddUser: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    console.log(data, "here");

    try {
      const newUser: any = await UserServiceInstance.addUser(data);

      if (newUser.status === 200) {
        enqueueSnackbar("New User Added Successfully!", {
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
        processTitle="Add New User"
        modalTitle="Add New User"
        submitHandler={submitHandler}
        inputFields={addUserInputs}
      />
    </>
  );
};

export default AddUser;
