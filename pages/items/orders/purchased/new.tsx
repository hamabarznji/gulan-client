import React, { useState } from "react";
import { Container, Grid, Paper, Button } from "@mui/material";
import Table from "../../../../src/components/items/purchasedOrders/Table/Table";
import inputFields from "../../../../src/interfaces/item/AddPurchaseItem";
import redirectUnauthorizedToLogin from "../../../../src/utils/Redirect";
import DeleteIcon from "@mui/icons-material/Delete";
import { Router, useRouter } from "next/router";
import Item from "../../../../src/components/item";
import ItemsServiceInstance from "../../../../services/ItemService";
import { useSnackbar } from "notistack";

export const getServerSideProps = redirectUnauthorizedToLogin;

const NewPurchaseOrder = () => {
  const router=useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const [items, setItems] = useState<any[]>([]); // Provide a type for 'items'

  const onAddItem = (data: any) => {
    const idndName = data.id.split(",");
    setItems((prevItems) => [
      ...prevItems,
      {
        ...data,
        item_id: idndName[0],
        id: items.length + 1,
        name: idndName[1],
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

  const onSumitInvoice = async() => {

    try{
      const addItems= await ItemsServiceInstance.addPurchaseOrderInvoice(items)
     enqueueSnackbar("Items Added Successfully", { variant: "success" });
     router.push("/items/orders/purchased")  

    }
    catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table rows={items || []} onAddItem={onAddItem} 
            onSumitInvoice={onSumitInvoice}
            itemsLength={items.length}
            
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default NewPurchaseOrder;
