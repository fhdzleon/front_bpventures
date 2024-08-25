"use client"

import React from "react";
import UpdateUserComponent from "@/components/CreateUserForm/UpdateUser";
import { useAuth } from "@/context/AuthContext";

const UpdateUser = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <UpdateUserComponent  id={user?.id} />
    </div>
  );
};

export default UpdateUser;
