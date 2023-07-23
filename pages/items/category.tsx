import React from "react";
import ItemCategoriesTable from "../../src/components/items/category/CategoriesTable";
import redirectUnauthorizedToLogin from "../../src/utils/Redirect";

export const getServerSideProps = redirectUnauthorizedToLogin;
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const Products = ({ toggleTheme, user }: HomePageProps) => {
  return <ItemCategoriesTable />;
};

export default Products;
