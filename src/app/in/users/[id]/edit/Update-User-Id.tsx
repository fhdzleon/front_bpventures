import UpdateUserComponent from "@/components/Users/UpdateUser";
import React from "react";
// import UpdateUserComponent from "@/components/CreateUserForm/UpdateUser";

const UpdateUserId = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return (
    <div className="flex items-start">
      <UpdateUserComponent id={id} />
    </div>
  );
};

export default UpdateUserId;
