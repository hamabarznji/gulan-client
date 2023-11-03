import React from "react";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";
import moment from "moment";
import ExpenseService from "../../../services/ExpenseService";
import InputFields from "../customComponents/InputFieldsWithValidation";

type AddExpenseProps = {
  reFetchExpenses: () => Promise<QueryObserverResult<any, unknown>>;
  expenseCategories: any[]; // Assuming it's an array of expense categories
};

const AddExpense: React.FC<AddExpenseProps> = ({ reFetchExpenses, expenseCategories }) => {
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (data: any) => {
    try {
      const newExpense: any = await ExpenseService.addExpense({
        ...data,
        createdAt: moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss.SSS"),
      });

      if (newExpense.status === 200) {
        reFetchExpenses();
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
      <InputFields
        processTitle="Add New Expense"
        modalTitle="Add New Expense"
        submitHandler={submitHandler}
        inputFields={expenseCategories||[]} // Use the updatedInputs
      />
  );
};

export default AddExpense;
