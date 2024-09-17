"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { PATHROUTES } from "@/helpers/pathRoutes";
import PreloaderAwait from "../preloader/PreloaderAwait";
import { ButtonAdd } from "../Buttons/ButtonAdd";
import FilterInput from "../Search/Search";

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
// Redirige a la primera página cuando cambia el término de búsqueda
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

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
            Lista de Usuarios {companyName && `: ${companyName}`}
          </h1>
          <ButtonAdd hrefString="/in/users/create">Agregar Usuario</ButtonAdd>
          {/* <ButtonAdd children="Agregar usuario" hrefString="/in/users/create" /> */}
          <FilterInput filter={searchTerm} onFilterChange={setSearchTerm} />

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-secundary font-futura text-white">
                <tr>
                  <th className="py-3 px-6 font-futura text-left text-lg">
                    Nombre
                  </th>
                  <th className="py-3 px-6 font-futura text-center text-lg">
                    Email
                  </th>
                  <th className="py-3 px-6 font-futura text-center text-lg">
                    Cargo
                  </th>
                  {!isCompany && (
                    <>
                      <th className="py-3 px-6 font-futura text-center text-lg">
                        Empresa
                      </th>
                    </>
                  )}
                  <th className="py-3 px-6 font-futura text-center text-lg">
                    Estado
                  </th>
                  <th className=" py-3 px-6 font-futura text-center text-lg">
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
                    <td className="py-4 px-6 font-sans text-left text-sm text-gray-900">
                      {user.Names} {user.LastName}
                    </td>
                    <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                      {user.Position}
                    </td>
                    {!isCompany && (
                      <>
                        <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                          {user?.company?.name}
                        </td>
                      </>
                    )}
                    <td className="py-4 px-6 flex justify-center items-center font-sans text-sm  text-gray-700">
                      {user.statusId === 1 ? "Desbloqueado" : "Bloqueado"}
                    </td>
                    <td className="py-4 px-6 items-center justify-center   text-sm text-gray-700">
                      <Link href={`${PATHROUTES.USER}/${user.id}/details`}>
                        {/* <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Ver Usuarios</button> */}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-8 hover:scale-125 hover:text-blue-700  mx-auto col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
                        >
                          <title>Ver detalle del usuario</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
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

            {paginatedUsers.length === 0 && (
              <p className="p-6 text-gray-600">No se encontraron usuarios.</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl disabled:opacity-50"
            >
              Anterior
            </button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl disabled:opacity-50"
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
