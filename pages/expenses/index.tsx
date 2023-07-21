import * as React from "react";
import ExpensesTable from "../../src/components/expense/ExpensesTable";
import isCurrentUserAllowed from "../../src/utils/Redirect";
import { Grid } from "@mui/material";
import InvoiceCard from "../../src/components/invoice/InvoiceCard";
import PieChartPage from "../../src/components/expense/Chart";
export const getServerSideProps = isCurrentUserAllowed;

const Expenses = () => {
  return (
    <>
      <Grid container justifyContent="flex-start" spacing={2} direction="row">
        <Grid
          item
          container
          direction="row"
          // spacing={theme.spacing(2)}
          justifyContent="center"
        >
          <PieChartPage />
        </Grid>
        <Grid item container direction="row" justifyContent="center">
          <ExpensesTable />
        </Grid>
      </Grid>
    </>
  );
};
export default Expenses;
