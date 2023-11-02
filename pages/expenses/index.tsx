import * as React from "react";
import ExpensesTable from "../../src/components/expense/ExpensesTable";
import isCurrentUserAllowed from "../../src/utils/Redirect";
import { Grid } from "@mui/material";
import PieChartPage from "../../src/components/expense/Chart";
import ExpenseSummaryPieChart from "../../src/components/expense/ExpenseSummary";
export const getServerSideProps = isCurrentUserAllowed;

const Expenses = () => {
  return (
    <Grid container justifyContent="center" spacing={2} direction="column">
    <Grid item container direction="row" justifyContent="center">
      <ExpenseSummaryPieChart />
      <PieChartPage />
    </Grid>
   
    <Grid item container direction="row" justifyContent="center">
      <ExpensesTable />
    </Grid>
  </Grid>
  
  );
};
export default Expenses;
