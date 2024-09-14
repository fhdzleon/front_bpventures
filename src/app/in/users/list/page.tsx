"use client";

import { ButtonAdd } from "@/components/Buttons/ButtonAdd";
import UsersListComponent from "@/components/Users/UsersListComponent";
import { useAuth } from "@/context/AuthContext";

export const UsersList = () => {
  const { allUsers, setAllUsers, loading } = useAuth();

  return (
    <div>
      <UsersListComponent allUsers={allUsers} setAllUsers={setAllUsers} loading={loading} />
    </div>
    
  );
};
export default UsersList;
