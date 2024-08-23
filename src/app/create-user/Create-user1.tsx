import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Searchbar from "@/components/dashboard/Searchbar";
import CreateUserForm from "@/components/CreateUserForm/CreateUserForm";

const CreateUser = () => {
  return (
    <div className="flex items-start">
      <Sidebar />
      <Searchbar />
      <CreateUserForm />
    </div>
  );
};

export default CreateUser;
