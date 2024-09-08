// app/in/company/[id]/users/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "sonner";

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const companyId = parseInt(params.id);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setLoading(false);
        } else {
          toast.error('Error al cargar los usuarios');
        }
      } catch (error: any) {
        console.error("Error al obtener usuarios", error);
        toast.error('Error al cargar los usuarios');
      }
    };

    fetchUsers();
  }, [companyId]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-[1.2rem] mb-6">Usuarios de la Empresa</h1>
        {loading ? (
          <p className="text-center">Cargando usuarios...</p>
        ) : (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Apellido</th>
                <th className="border px-4 py-2">Posición</th>
                <th className="border px-4 py-2">Email Verificado</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.Names}</td>
                    <td className="border px-4 py-2">{user.LastName}</td>
                    <td className="border px-4 py-2">{user.Position}</td>
                    <td className="border px-4 py-2">{user.verifiedEmail ? 'Sí' : 'No'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">No hay usuarios registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListUsersByCompany;
