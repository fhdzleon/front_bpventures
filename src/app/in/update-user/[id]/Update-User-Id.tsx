import UpdateUserComponent from "@/components/CreateUserForm/UpdateUser";
import React from "react";
// import UpdateUserComponent from "@/components/CreateUserForm/UpdateUser";


const UpdateUserId = ({params }: {params: { id: number }}) => {
    const { id } = params;
    console.log(id)
    
  return (
    <div className="flex items-start">
            <UpdateUserComponent id={id} />

    </div>
  );
};

export default UpdateUserId;
