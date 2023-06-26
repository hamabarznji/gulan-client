import React, { FormEvent } from "react";
import { Grid } from "@mui/material";

import Button from "../../src/components/customComponents/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import ProductsTable from "../../src/components/products/ProductsTable";
import AddProducts from "../../src/components/customComponents/InputFieldsWithValidation";
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const Products = ({ toggleTheme, user }: HomePageProps) => {
  const router = useRouter();
  return (
    <Grid container justifyContent="flex-start" spacing={2} direction="row">
      <Grid item container justifyContent="flex-start">
      <AddProducts 
      processTitle="Add Product"
      modalTitle="Add Product"
      submitHandler={(data: any) => console.log(data)}
      modalType={true}
      />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <ProductsTable />
      </Grid>
    </Grid>
  );
};

export default Products;
