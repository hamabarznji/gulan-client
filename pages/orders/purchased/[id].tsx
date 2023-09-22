import React from "react";
import { Grid, Typography } from "@mui/material";
import { useQuery, QueryKey } from "@tanstack/react-query";

import inputFields from "../../../src/interfaces/user/add";
import redirectUnauthorizedToLogin from "../../../src/utils/Redirect";
import { useRouter } from "next/router";
import PurchasedServiceInstance from "../../../services/orders/PurchasesService";
import { string } from "yup";
const opi: QueryKey = ["opi"];

export const getServerSideProps = redirectUnauthorizedToLogin;
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const PruchasedOrder = ({ toggleTheme, user }: HomePageProps) => {
  const {id} = useRouter().query
  const fetchPurchasedItems = async () => {
    try {
      const response = await PurchasedServiceInstance.getItemsByPurchasedOrderId(id);
  
      // const updatedInputs = addExpenseInputs.map((input, index) => {
      //   if (index === 1) {
      //     return {
      //       ...input,
      //       options: response.map((eg:any) => ({id:eg.id, label: eg.name, value: eg.id })) || [],
      //     };
      //   }
      //   return input;
      // });
  
      return response;
    } catch (error) {
      throw new Error("Failed to fetch purchased items");
    }
  };
  

  const { data: purchasedItems } = useQuery(
    opi,
    fetchPurchasedItems
  );

  console.log(purchasedItems)
  return (
    <>
    <Typography variant="h4" component="h4" gutterBottom>Item</Typography>
    </>
  );
};

export default PruchasedOrder;
