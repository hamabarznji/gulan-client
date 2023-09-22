import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import ExpenseService from "../../../services/ExpenseService";
import ExpenseTable from "../customComponents/Table";
import { Grid } from "@mui/material";
import UpdateExpense from "./UpdateExpense";
import AddExpense from "./AddExpense";
import moment from "moment";
import Chips from "../customComponents/Chip";
import addExpenseInputs from "../../interfaces/expense/add";

const EXPENSES_QUERY_KEY: QueryKey = ["expenses"];
const EXPENSE_CATEGORIES_QUERY_KEY: QueryKey = ["expenseCategories"];

// Interfaces
interface ExpenseData {
  id: string;
  name: string;
  role: string;
  password: string;
  themeColor: boolean;
}

interface ExpenseResponse {
  data: ExpenseData[];
}

export default function CustomizedTables() {
  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await ExpenseService.getExpenses();
      return (response as ExpenseResponse).data;
    } catch (error) {
      throw new Error("Failed to fetch expenses");
    }
  };

  // Fetch expense categories
  const fetchExpenseCategories = async () => {
    try {
      const response = await ExpenseService.getExpenseCategories();
  
      const updatedInputs = addExpenseInputs.map((input, index) => {
        if (index === 1) {
          return {
            ...input,
            options: response.map((eg:any) => ({id:eg.id, label: eg.name, value: eg.id })) || [],
          };
        }
        return input;
      });
  
      return updatedInputs;
    } catch (error) {
      throw new Error("Failed to fetch expense categories");
    }
  };
  

  const { data: expenseCategories } = useQuery(
    EXPENSE_CATEGORIES_QUERY_KEY,
    fetchExpenseCategories
  );

  const { data, refetch } = useQuery(EXPENSES_QUERY_KEY, fetchExpenses);

  // Transform rows
  const transformedRows = data?.map((expense: any, index: number) => ({
    index: index + 1,
    description: expense.description,
    categoryName: expense.categoryName,
    amount: <Chips label={expense.amount} />,
    createdAt: moment(expense.createdAt).format("YYYY-MM-DD"),
    actions: (
      <UpdateExpense
        expense={{
          ...expense,
          createdAt: moment(expense.createdAt).format("YYYY-MM-DD"),
        }}
        reFetchExpenses={refetch}
      />
    ),
  }));

  // Update inputs
  

  return (
    <Grid container justifyContent="flex-start" spacing={3} direction="row">
      <Grid item container justifyContent="flex-start">
        <AddExpense reFetchExpenses={refetch} expenseCategories={expenseCategories} />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <ExpenseTable rows={transformedRows || []} columns={columns} />
      </Grid>
    </Grid>
  );
}
 
const columns = [
  { id: "index", label: "ID", align: "center" },
  { id: "description", label: "Description", align: "center" },
  { id: "categoryName", label: "Category Name", align: "center" },
  { id: "createdAt", label: "Expense Date", align: "center" },
  { id: "amount", label: "Amount", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];
