import React from "react";
import ExpenseService from "../../../services/ExpenseService";
import InputFields from "../customComponents/InputFieldsWithValidation";
import updateExpenseInputs from "../../interfaces/expense/add";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";

interface Props {
  expense: any;
  reFetchExpenses: () => Promise<QueryObserverResult>;
}
const UpdateUser: React.FC<any> = ({ expense, reFetchExpenses }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const updatedExpense: any = await ExpenseService.updateExpense(data);

      if (updatedExpense.status === 200) {
        reFetchExpenses();
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
  console.log({expense});
  return (
    <>
      <InputFields
        processTitle="Update Expense"
        modalTitle="Update Expense"
        submitHandler={submitHandler}
        inputFields={updateExpenseInputs}
        modalType={false}
        updateData={expense}
        
      />
    </>
  );
};

export default UpdateUser;
