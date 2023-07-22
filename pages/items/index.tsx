import React from "react";
import { Grid } from "@mui/material";
import ProductsTable from "../../src/components/items/ItemsTable";
import AddProducts from "../../src/components/customComponents/InputFieldsWithValidation";

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
    <Grid container justifyContent="flex-start" spacing={2} direction="row">
      <Grid item container justifyContent="flex-start">
      <AddProducts 
      inputFields={inputFields}
      
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
