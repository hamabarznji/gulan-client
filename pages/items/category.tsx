import React from "react";
import ItemCategoriesTable from "../../src/components/items/category/CategoriesTable";
import redirectUnauthorizedToLogin from "../../src/utils/Redirect";

export const getServerSideProps = redirectUnauthorizedToLogin;

const Products = () => {
  return <ItemCategoriesTable />;
};

export default Products;
