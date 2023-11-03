import React from "react";
import {  Typography,Chip } from "@mui/material";
import { useQuery, QueryKey } from "@tanstack/react-query";
import SizeChip from "../../../src/components/customComponents/SizeChip";
import redirectUnauthorizedToLogin from "../../../src/utils/Redirect";
import { useRouter } from "next/router";
import PurchasedServiceInstance from "../../../services/orders/PurchasesService";
import Table from "../../../src/components/customComponents/Table";
import UpdateItem from "../../../src/components/items/purchasedOrders/UpdateItem";

const opi: QueryKey = ["opi"];

export const getServerSideProps = redirectUnauthorizedToLogin;

const PruchasedOrder = () => {
  const id= useRouter().query.id as string
  console.log(id,"here")
  const fetchPurchasedItems = async () => { 
    try {
      if (!id) {
        throw new Error("Purchased order ID is undefined");
      }
      const response =
        await PurchasedServiceInstance.getItemsByPurchasedOrderId(id);
      const items=response.map((item:any,index:number)=>{
        return {
          ...item,
          size:<SizeChip label={item.size} />,
          price: (
            <Chip
              key={`sellingPrice-${item.item_id}`}
              variant="outlined"
              label={`$${item.price} `}
            />
          ),
          actions: (
              <UpdateItem item={item} reFetchItems={refetch} />
          ),
        }
      })
      return items;
    } catch (error) {
      throw new Error("Failed to fetch purchased items");
    }
  };

  const { data: purchasedItems,refetch } = useQuery(opi, fetchPurchasedItems);
  return (
    <>
      <Typography variant="h4" component="h4" gutterBottom>
        Item
      </Typography>
      <Table rows={purchasedItems || []} columns={columns} />
    </>
  );
};

export default PruchasedOrder;
const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "price", label: "Purchased Price", align: "center" },
  { id: "qty", label: "Quantity", align: "center" },
  { id: "color", label: "Color", align: "center" },
  { id: "size", label: "Size", align: "center" },
  { id: "category", label: "Category", align: "center" },
  { id: "actions", label: "Action", align: "center" },
];
