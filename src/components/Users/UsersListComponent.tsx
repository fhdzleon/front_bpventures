"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PATHROUTES } from "@/helpers/pathRoutes";

export interface User {
  look: ReactNode;
  id: number;
  email: string;
  Names: string;
  LastName: string;
  Position: string;
  statusId: number;
}

export const UsersListComponent = ({
  allUsers,
  setAllUsers,
  loading,
  isCompany,
  companyName,
}: any) => {
  // const { allUsers, setAllUsers, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filteredUsers = Array.isArray(allUsers)
    ? allUsers.filter((user) => {
        const fullName = `${user.Names} ${user.LastName}`.toLowerCase();
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {!loading ? (
        <div className="container mx-auto p-6 w-4/5 font-futura">
          <h1 className="text-4xl font-futura mb-6 text-secundary">
            Lista de Usuarios: {companyName}
          </h1>
          {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}

          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 p-2 border border-gray-300 rounded-md w-full"
          />

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-secundary font-futura text-white">
                <tr>
                  <th className="py-3 px-6 font-futura text-left text-lg">
                    Nombre
                  </th>
                  <th className="py-3 px-6 font-futura text-left text-lg">
                    Email
                  </th>
                  <th className="py-3 px-6 font-futura text-left text-lg">
                    Cargo
                  </th>
                  {!isCompany && (
                    <>
                      <th className="py-3 px-6 font-futura text-left text-lg">
                        Empresa
                      </th>
                    </>
                  )}
                  <th className="py-3 px-6 font-futura text-left text-lg">
                    Estado
                  </th>
                  <th className="flex py-3 px-6 font-futura text-center text-lg">
                    Ver Usuario
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 font-futura text-sm text-gray-900">
                      <Link
                        href={`${PATHROUTES.USER}/${user.id}`}
                        className="text-black hover:text-blue-700"
                      >
                        {user.Names} {user.LastName}
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      {user.Position}
                    </td>
                    {!isCompany && (
                      <>
                        <td className="py-4 px-6 font-futura text-sm text-gray-700">
                          {user?.company?.name}
                        </td>
                      </>
                    )}
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      {user.statusId === 1 ? "Desbloqueado" : "Bloqueado"}
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      <Link
                        href={`${PATHROUTES.USER}/${user.id}`}
                        className="text-black hover:text-blue-700"
                      >
                        Ver Usuario
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedUsers.length === 0 && (
              <p className="p-6 text-gray-600">No se encontraron usuarios.</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
              Anterior
            </button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-screen flex-col items-center justify-center mt-7">
            <span className="loader"></span>
          </div>
        </>
      )}
    </>
  );
};

export default UsersListComponent;
