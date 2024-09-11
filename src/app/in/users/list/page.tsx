"use client";

import { ButtonAdd } from "@/components/Buttons/ButtonAdd";
import UsersListComponent from "@/components/Users/UsersListComponent";
import { useAuth } from "@/context/AuthContext";

export const UsersList = () => {
  const { allUsers, setAllUsers, loading } = useAuth();

  return (
    <>
      {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
      <div className="container mx-auto px-6  w-4/5 font-futura ">
        <ButtonAdd children="Agregar usuario" hrefString="/in/users/create"
         />
      </div>

      <UsersListComponent allUsers={allUsers} setAllUsers={setAllUsers} loading={loading} />
    </>
    
  );
};
export default UsersList;
