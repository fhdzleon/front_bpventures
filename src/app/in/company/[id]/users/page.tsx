"use client";

import UsersListComponent from "@/components/Users/UsersListComponent";
import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  Names: string;
  LastName: string;
  Position: string;
  verifiedEmail: boolean;
}

interface IdParams {
  params: {
    id: string;
  };
}

const ListUsersByCompany: React.FC<IdParams> = ({ params }) => {
  const { allUsers, setAllUsers, loading } = useAuth();

  const [usersData, setUsersData] = useState<User[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(true);
  // const router = useRouter();
  const companyId = parseInt(params.id);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUsersData(data.users);
          setCompanyName(data.name);
          // setLoading(false);
        } else {
          toast.error("Error al cargar los usuarios");
        }
      } catch (error: any) {
        console.error("Error al obtener usuarios", error);
        toast.error("Error al cargar los usuarios");
      }
    };

    fetchUsers();
  }, [companyId]);

  return (
    <>
      {/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}
      {/* <h1 className="text-4xl font-futura mb-6 text-secundary">Lista de Usuarios: {companyName}</h1> */}

      <UsersListComponent
        allUsers={usersData}
        setAllUsers={setAllUsers}
        loading={loading}
        isCompany={true}
        companyName={companyName}
      />
    </>
  );
};
export default ListUsersByCompany;
