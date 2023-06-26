import React from "react";
import UserServiceInstance from "../../../services/user";
import InputFields from "../customComponents/InputFieldsWithValidation";
import addUserInputs from "../../interfaces/user/add";
import { useSnackbar } from "notistack";
const UpdateUser: React.FC = ({ user }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const updatedUser: any = await UserServiceInstance.updateUser({
        id: user.id,
        username: data.name,
        role: data.role,
        password: data.password,
      });

      if (updatedUser.status === 200) {
        enqueueSnackbar("New User Updated Successfully!", {
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
        processTitle="Update User"
        modalTitle="Update User"
        submitHandler={submitHandler}
        inputFields={addUserInputs}
        modalType={false}
        updateData={user}
      />
    </>
  );
};

export default UpdateUser;
