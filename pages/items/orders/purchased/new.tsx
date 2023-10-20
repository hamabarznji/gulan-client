import React, { useState } from "react";
import { Container, Grid, Paper, Button } from "@mui/material";
import Table from "../../../../src/components/items/purchasedOrders/Table/Table";
import inputFields from "../../../../src/interfaces/item/AddPurchaseItem";
import redirectUnauthorizedToLogin from "../../../../src/utils/Redirect";
import DeleteIcon from "@mui/icons-material/Delete";

export const getServerSideProps = redirectUnauthorizedToLogin;

const NewPurchaseOrder = () => {
  const [items, setItems] = useState<any[]>([]); // Provide a type for 'items'

  const onAddItem = (data: any) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        ...data,
        id: 1,
        name: data.item_id,
        actions: (
          <Button
            variant="contained"
            color="error"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              setItems(items.filter((item) => item.id !== data.item_id));
            }}
          >
            <DeleteIcon
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Button>
        ),
      },
    ]);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table rows={items || []} onAddItem={onAddItem} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default NewPurchaseOrder;
