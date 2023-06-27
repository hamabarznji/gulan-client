import React from "react";
import UserServiceInstance from "../../../services/UserService";
import InputFields from "../customComponents/InputFieldsWithValidation";
import addUserInputs from "../../interfaces/user/add";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";

interface Props {
  user: any;
  reFetchUsers: () => Promise<QueryObserverResult>;
}
const UpdateUser: React.FC<any> = ({ user, reFetchUsers }: Props) => {
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
        reFetchUsers();
        enqueueSnackbar("Expense Updated Successfully!", {
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
        processTitle="Update Expense"
        modalTitle="Update Expense"
        submitHandler={submitHandler}
        inputFields={addUserInputs}
        modalType={false}
        updateData={user}
      />
    </>
  );
};

export default UpdateUser;
