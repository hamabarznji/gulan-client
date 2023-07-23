import React from "react";
import { Grid } from "@mui/material";
import ItemCategoriesTable from "../../src/components/items/vendor/vendorsTable";
import AddVendor from "../../src/components/customComponents/InputFieldsWithValidation";

import inputFields from "../../src/interfaces/user/add";
import redirectUnauthorizedToLogin from "../../src/utils/Redirect";

export const getServerSideProps = redirectUnauthorizedToLogin;
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const Products = ({ toggleTheme, user }: HomePageProps) => {
  return (
    <ItemCategoriesTable />

  );
};

export default Products;
