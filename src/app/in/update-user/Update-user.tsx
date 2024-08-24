import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Searchbar from "@/components/dashboard/Searchbar";
import CreateUserForm from "@/components/CreateUserForm/CreateUserForm";

const UpdateUser = () => {
  return (
    <div className="flex items-start">
      <CreateUserForm />
    </div>
  );
};

export default UpdateUser;
