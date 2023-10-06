import React from "react";
import { Grid, Typography,Chip } from "@mui/material";
import { useQuery, QueryKey } from "@tanstack/react-query";
import SizeChip from "../../../src/components/customComponents/SizeChip";
import inputFields from "../../../src/interfaces/user/add";
import redirectUnauthorizedToLogin from "../../../src/utils/Redirect";
import { useRouter } from "next/router";
import PurchasedServiceInstance from "../../../services/orders/PurchasesService";
import Table from "../../../src/components/customComponents/Table";
import UpdateItem from "../../../src/components/purchasedOrders/UpdateItem";
import ItemsServiceInstance from "../../../services/ItemService";

const opi: QueryKey = ["opi"];

export const getServerSideProps = redirectUnauthorizedToLogin;
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const PruchasedOrder = ({ toggleTheme, user }: HomePageProps) => {
  const { id } = useRouter().query;
  const fetchPurchasedItems = async () => { 
    try {
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
            <>
              <UpdateItem item={item} reFetchItems={()=>console.log("here")} />
            </>
          ),
        }
      })
      return items;
    } catch (error) {
      throw new Error("Failed to fetch purchased items");
    }
  };

  const { data: purchasedItems } = useQuery(opi, fetchPurchasedItems);
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
