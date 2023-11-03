import * as React from "react";
import {
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Table from "../../../src/components/items/sellOrders/add/AddInvoiceTable";
import moment from "moment";
import Header from "../../../src/components/items/sellOrders/add/Header";

export default function CreateInvoicePage() {
  const currentDate = moment().format("DD/MM/YYYY HH:mm");


  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <form>
          <Grid container spacing={2}>
            <Header id={"truncatedUuid"} date={currentDate} />

            <Grid item xs={12}>
              <Table />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
