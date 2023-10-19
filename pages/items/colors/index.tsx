import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Button from "../../../src/components/customComponents/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../../src/components/color/ColorsTable";
import { useRouter } from "next/router";

const Color = () => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="flex-start" spacing={2} direction="row">
    
      <Grid
        item
        container
        direction="row"
        spacing={theme.spacing(2)}
        justifyContent="center"
      >
    
      </Grid>
      <Grid item container direction="row" justifyContent="center">
        <Table />
      </Grid>
    </Grid>
  );
};

export default Color;
