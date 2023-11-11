import React from "react";
import isCurrentUserAllowed from "../src/utils/Redirect";

type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}
export const getServerSideProps = isCurrentUserAllowed;

const Dashboard = () => {

  return (
    <div>
      <h1>Dashboard</h1>
    
    </div>
  );
};

export default Dashboard;
