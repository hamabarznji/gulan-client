import React from "react";
import { Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InvoiceCard from "../../src/components/invoice/InvoiceCard";
import { withSessionSsr } from "../../utils/withSession";
import Button from "../../src/components/customComponents/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../src/components/invoice/Table";
import { useRouter } from "next/router";

type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const Invoice = ({ toggleTheme, user }: HomePageProps) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Grid
      container
      justifyContent="flex-start"
      sx={{}}
      spacing={2}
      direction="row"
    >
    
      <Grid item container justifyContent="flex-start">
        <Button
          icon={<AddIcon />}
          variant="contained"
          title="Add Invoice"
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
