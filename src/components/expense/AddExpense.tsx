import React from "react";
import { useSnackbar } from "notistack";
import { QueryObserverResult } from "react-query";
import moment from "moment";
import { useQuery, QueryKey } from "@tanstack/react-query";
import addExpenseInputs from "../../interfaces/expense/add";

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
      const newUser: any = await ExpenseService.addExpense({
        ...data,
        createdAt: moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss.SSS"),
      });

      if (newUser.status === 200) {
        reFetchExpenses();
        enqueueSnackbar("New Expense Added Successfully!", {
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

  // Update options property in the second element of addExpenseInputs
console.log(expenseCategories);
  return (
    <>
      <InputFields
        processTitle="Add New Expense"
        modalTitle="Add New Expense"
        submitHandler={submitHandler}
        inputFields={expenseCategories||[]} // Use the updatedInputs
      />
    </>
  );
};

export default AddExpense;
