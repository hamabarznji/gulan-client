import React from "react";
import ExpenseService from "../../../services/ExpenseService";
import { useSnackbar } from "notistack";
import InputFields from "../customComponents/InputFieldsWithValidation";
import addExpenseInputs from "../../interfaces/expense/add";
import { QueryObserverResult } from 'react-query';
import moment from "moment";

type AddUserProps = {
  reFetchUsers: () => Promise<QueryObserverResult<any, unknown>>;
};
const AddExpense: React.FC<any> = ({reFetchUsers}:AddUserProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {


    try {
      const newUser: any = await ExpenseService.addExpense({
        ...data,
        createdAt:moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss.SSS"),
     
      });

      if (newUser.status === 200) {
        reFetchUsers();
        enqueueSnackbar("New Expense Added Successfully!", {
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
        processTitle="Add New Expense"
        modalTitle="Add New Expense"
        submitHandler={submitHandler}
        inputFields={addExpenseInputs}
      />
    </>
  );
};

export default AddExpense;
