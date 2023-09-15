import React from "react";
import ExpenseService from "../../../services/ExpenseService";
import { useSnackbar } from "notistack";
import InputFields from "../customComponents/InputFieldsWithValidation";
import addExpenseInputs from "../../interfaces/expense/add";
import { QueryObserverResult } from 'react-query';
import moment from "moment";
import { useQuery, QueryKey } from "@tanstack/react-query";
const expenseCategoriesQueryKey: QueryKey = ["expenseCategories"];
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

  const fetchExpenseCategorise = async () => {
    try {
      const response = await ExpenseService.getExpenseCategories();
      return response.data; // Assuming the data you need is inside response.data
    } catch (error) {
      throw new Error("Failed to fetch expenseCategorise");
    }
  }

  const { data:expenseCategorise } = useQuery(expenseCategoriesQueryKey, fetchExpenseCategorise);

  // Update options property in the second element of addExpenseInputs
  const updatedInputs = addExpenseInputs.map((input, index) => {
    if (index === 1) { // Assuming you want to update the second element
      return {
        ...input,
        options: expenseCategorise || [], // Use the data from the query or an empty array as fallback
      };
    }
    return input;
  });

  return (
    <>
      <InputFields
        processTitle="Add New Expense"
        modalTitle="Add New Expense"
        submitHandler={submitHandler}
        inputFields={updatedInputs} // Use the updatedInputs
      />
    </>
  );
};

export default AddExpense;
