import React from "react";

type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const Dashboard = () => {

  return (
    <div>
      <h1>Dashboard</h1>
    
    </div>
  );
};

export default Dashboard;
