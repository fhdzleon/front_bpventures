"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { PATHROUTES } from "@/helpers/pathRoutes";
import PreloaderAwait from "../preloader/PreloaderAwait";
import { ButtonAdd } from "../Buttons/ButtonAdd";
import FilterInput from "../Search/Search"

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
    <div>
      {loading && <PreloaderAwait />}
      {!loading ? (
        <div className="m-5 max-h-screen mt-5 rounded-lg font-futura">
          <h1 className="text-4xl font-futura mb-6 text-secundary">
            Lista de Usuarios: {companyName}
          </h1>

          <ButtonAdd children="Agregar usuario" hrefString="/in/users/create" />
          <FilterInput filter={searchTerm} onFilterChange={setSearchTerm} />

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-secundary font-futura text-white">
                <tr>
                  <th className="py-3 px-6 font-futura text-left text-lg">Nombre</th>
                  <th className="py-3 px-6 font-futura text-left text-lg">Email</th>
                  <th className="py-3 px-6 font-futura text-left text-lg">Cargo</th>
                  {!isCompany && (
                    <>
                      <th className="py-3 px-6 font-futura text-left text-lg">Empresa</th>
                    </>
                  )}
                  <th className="py-3 px-6 font-futura text-left text-lg">Estado</th>
                  <th className="flex py-3 px-6 font-futura text-center text-lg">Ver Usuario</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6 font-futura text-sm text-gray-900">
                      <Link href={`${PATHROUTES.USER}/${user.id}/details`} className="text-black hover:text-blue-700">
                        {user.Names} {user.LastName}
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">{user.email}</td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">{user.Position}</td>
                    {!isCompany && (
                      <>
                        <td className="py-4 px-6 font-futura text-sm text-gray-700">{user?.company?.name}</td>
                      </>
                    )}
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      {user.statusId === 1 ? "Desbloqueado" : "Bloqueado"}
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                    <Link href={`${PATHROUTES.USER}/${user.id}/details`}>
                            {/* <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Ver Usuarios</button> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-8 hover:scale-125 hover:text-blue-700 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
                            >
                              <title>Ver Usuarios</title>
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                              />
                            </svg>
                          </Link>
                      {/* <Link href={`${PATHROUTES.USER}/${user.id}/details`} className="text-black hover:text-blue-700">
                        Ver Usuario
                      </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedUsers.length === 0 && <p className="p-6 text-gray-600">No se encontraron usuarios.</p>}
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
        <div className="flex h-screen flex-col items-center justify-center mt-7">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default UsersListComponent;
