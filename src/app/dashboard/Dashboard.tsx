import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Searchbar from "@/components/dashboard/Searchbar";

const Dashboard = () => {
  return (
    <div className="flex items-start">
      <Sidebar />
      <Searchbar />
    </div>
  );
};

export default Dashboard;
