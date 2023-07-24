import * as React from "react";
import isCurrentUserAllowed from "../../src/utils/Redirect";
import { Grid, Typography } from "@mui/material";
export const getServerSideProps = isCurrentUserAllowed;

const Orders = () => {
  return (
    <>
      <Grid container justifyContent="flex-start" spacing={2} direction="row">
        <Typography variant="h4" component="h4">Orders</Typography>
          
      </Grid>
    </>
  );
};
export default Orders;
