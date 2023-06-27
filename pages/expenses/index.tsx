import * as React from "react";
import ExpensesTable from "../../src/components/expense/ExpensesTable";
import isCurrentUserAllowed from "../../src/utils/Redirect";

export const getServerSideProps = isCurrentUserAllowed;

const Expenses = () => {
  return <ExpensesTable />;
};
export default Expenses;
