import * as React from "react";
import UsersTable from "../src/components/user/UsersTable";
import { Grid } from "@mui/material";
import Button from "../src/components/customComponents/Button";
import Modal from "../src/components/customComponents/Modal";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "../src/components/user/AddUser";

export default function Users() {
  return (
    <Grid container justifyContent="flex-start" spacing={3} direction="row">
      <Grid item container justifyContent="flex-start">
        <AddUser />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <UsersTable />
      </Grid>
    </Grid>
  );
}
