import React from "react";
import UserServiceInstance from "../../../services/user";
import { useSnackbar } from "notistack";
import InputFields from "../customComponents/InputFieldsWithValidation";
import addUserInputs from "../../interfaces/user/add";

const AddUser: React.FC = ({reFetchUsers}:any) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {

    try {
      const newUser: any = await UserServiceInstance.addUser({
        username: data.name,
        role: data.role,
        password: data.password,

      });

      if (newUser.status === 200) {
        reFetchUsers();
        enqueueSnackbar("New User Added Successfully!", {
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
        processTitle="Add New User"
        modalTitle="Add New User"
        submitHandler={submitHandler}
        inputFields={addUserInputs}
      />
    </>
  );
};

export default AddUser;
