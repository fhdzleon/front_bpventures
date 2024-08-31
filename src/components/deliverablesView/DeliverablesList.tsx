"use client";

import React from "react";
import { useState } from "react";
import DeleteDeliverable from "../deliverablesActions/DeleteDeliverable";
import DownloadDeliverable from "../deliverablesActions/DownloadDeliverable";
import ViewDeliverable from "../deliverablesActions/ViewDeliverable";
import EditDeliverable from "../deliverablesActions/EditDeliverable";
import deliverableMock from "@/helpers/deliverableData";
import { useAuth } from "@/context/AuthContext";

const DeliverablesList = () => {
  const { setDeliverableData, deliverableData } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  setDeliverableData(deliverableMock);

  const totalPages = Math.ceil(deliverableData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDeliverables = deliverableData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviusPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="overflow-x-auto mt-5 bg-white shadow-lg rounded-lg border border-gray-300">
        <table className=" min-w-full divide-y divide-gray-300">
          {/* INICIAN CABECERAS */}
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 w-1/6 font-sans text-center text-md first:">
                Nombre
              </th>
              <th className="py-3 px-4 w-1/6 font-sans text-center text-md ">
                Tipo
              </th>
              <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                Fecha de Creación
              </th>
              <th className="py-3 px-4 w-1/6 font-sans text-center text-md ">
                Autor
              </th>
              <th className="py-3 px-4 w-1/6 font-sans text-center text-md ">
                Acciones
              </th>
              <th className=" py-3 px-4  w-1/6font-sans text-center text-md">
                Permisos
              </th>
            </tr>
          </thead>
          {/* TERMINAN CABECERAS */}

          {/* INICIA EL BODY */}
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDeliverables.map((deliverable: any) => (
              <tr
                key={deliverable.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-sans text-sm text-gray-900">
                  {deliverable.archivo.split(".")[0]}
                </td>
                <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                  {deliverable.archivo.split(".")[1]}
                </td>
                <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                  {deliverable.fechaCreacion}
                </td>
                <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                  {deliverable.autor}
                </td>
                <td>
                  <div className="grid grid-cols-4 justify-center  justify-items-center">
                    <ViewDeliverable />
                    <DownloadDeliverable />
                    <EditDeliverable />
                    <DeleteDeliverable />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {/* ESTE SVG SE REMPLAZA POR EL COMPONENTE DE VANESA PERMISOS */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {/* FIN DEL COMP. PERMISOS */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedDeliverables.length === 0 && (
        <p className="p-6 text-gray-600">No se encontraron archivos.</p>
      )}
      <div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviusPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 font-sans text-gray-700 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="font-sans">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 font-sans text-gray-700 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliverablesList;



