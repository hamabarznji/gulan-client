import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InvoiceCard from "../../src/components/invoice/InvoiceCard";
import Button from "../../src/components/customComponents/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../src/components/invoice/InvoicesTable";
import { useRouter } from "next/router";

const Invoice = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Grid container justifyContent="flex-start" spacing={2} direction="row">
      <Grid item container justifyContent="flex-start">
        <Button
          icon={<AddIcon />}
          variant="contained"
          onClick={() => router.push("/invoices/add")}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        spacing={theme.spacing(2)}
        justifyContent="center"
      >
        <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard />
      </Grid>
      <Grid item container direction="row" justifyContent="center">
        <Table />
      </Grid>
    </Grid>
  );
};

export default Invoice;
