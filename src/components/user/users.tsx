import * as React from "react";
import UsersTable from "./usersTable";
import Grid from "@mui/material/Grid";
import Item from "../item";
import Box from "@mui/material/Box";

export default function Users() {
  return (
    <Box marginTop={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Item>
            <UsersTable />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
