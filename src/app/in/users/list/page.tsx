"use client";

import UsersListComponent from "@/components/Users/UsersListComponent";
import { useAuth } from "@/context/AuthContext-1";

export const UsersList = () => {
  const { allUsers, setAllUsers, loading } = useAuth();

  return (
    <>
      {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
      <UsersListComponent
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        loading={loading}
      />
    </>
  );
};
export default UsersList;
