import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import PurchasesServiceInstance from "../../../../services/orders/PurchasesService";
import OrdersTable from "../../customComponents/Table";
import {  Chip, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Button from "../../customComponents/Button";
import AddIcon from "@mui/icons-material/Add";


const queryKey: QueryKey = ["users"];

interface OrderData {
  id: string;
  name: string;
  purchased_At: Date;
  vendor:string

}
interface OrderResponse {
  data: OrderData[];
}

export default function CustomizedTables() {
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const response = await PurchasesServiceInstance.getOrders();
      return (response as OrderResponse).data;
    } catch (error) {
      throw new Error("Failed to fetch Orders");
    }
  };

  const handleActionClick = (id: string) => {
    router.push(`/items/orders/purchased/${id}`); // Replace 'your-page' with your actual route
  };

  const { data } = useQuery(queryKey, fetchOrders);

  const transformedRows = data?.map((order: any, index: number) => ({
    ...order,
    index: index + 1,
    purchased_at: order?.purchased_at?.split("T")[0],
    actions: (
      <Button
        title="View"
        onClick={() => {
          handleActionClick(order.id);
        }}
        color="success"

      />
    ),
  }));
  return (
    <Grid container justifyContent="flex-start" spacing={3} direction="row">
       <Grid item container justifyContent="flex-start">
        <Button
          icon={<AddIcon />}
          variant="contained"
          onClick={() => router.push("/items/orders/purchased/new")}
        />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <OrdersTable
          isPagination={false}
          rows={transformedRows || []}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
}
const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "vendor", label: "Vendor", align: "center" },
  { id: "purchased_at", label: "Date", align: "center" },
  { id: "actions", label: "View", align: "center" },
];
