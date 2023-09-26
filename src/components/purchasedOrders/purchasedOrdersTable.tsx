import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import PurchasesServiceInstance from "../../../services/orders/PurchasesService";
import UsersTable from "../customComponents/Table";
import {  Chip, Grid } from "@mui/material";
import UpdateUser from "../user/UpdateUser";
import AddUser from "../user/AddUser";
import { useRouter } from "next/router";import Button from "../customComponents/Button";


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
    router.push(`/orders/purchased/${id}`); // Replace 'your-page' with your actual route
  };

  const { data, refetch } = useQuery(queryKey, fetchOrders);

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
      {/* <Grid item container justifyContent="flex-start">
        <AddUser reFetchUsers={refetch} />
      </Grid> */}

      <Grid item container direction="row" justifyContent="center">
        <UsersTable
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
