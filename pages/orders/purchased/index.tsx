import React from "react";
import { Grid, Typography } from "@mui/material";
import PurchasedOrdersTable from "../../../src/components/purchasedOrders/purchasedOrdersTable";
import AddProducts from "../../../src/components/customComponents/InputFieldsWithValidation";

import inputFields from "../../../src/interfaces/user/add";
import redirectUnauthorizedToLogin from "../../../src/utils/Redirect";

export const getServerSideProps = redirectUnauthorizedToLogin;
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const Products = ({ toggleTheme, user }: HomePageProps) => {
  return (
    <>
     <PurchasedOrdersTable/>
    </>
  );
};

export default Products;
