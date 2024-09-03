"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import DeleteDeliverable from "../deliverablesActions/DeleteDeliverable";
import DownloadDeliverable from "../deliverablesActions/DownloadDeliverable";
import EditDeliverable from "../deliverablesActions/EditDeliverable";
import deliverableMock from "@/helpers/deliverableData";
import Image from "next/image";
import PermissionPanel from "./permissionpanel";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

const DeliverablesList = () => {
  const { setDeliverableData, userData, deliverableData, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folderStack, setFolderStack] = useState<string[]>([]); // Pila para rastrear la navegación entre carpetas
  const itemsPerPage = 10;
  const token = Cookies.get("token");
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const togglePanel = (fileId: number | null) => {
    setOpenPanel(openPanel === fileId ? null : fileId);
  };

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/deliverables/user/${
          userData.id
        }?page=${currentPage}&limit=${itemsPerPage}${
          currentFolder ? `&parentId=${currentFolder}` : ""
        }`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setDeliverableData(data);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching deliverables", error);
      }
    };

    fetchDeliverables();
  }, [currentPage, setDeliverableData, token, userData?.id, currentFolder]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleOpenFolder = (folderId: string) => {
    setFolderStack([...folderStack, currentFolder!]); // Agrega la carpeta actual a la pila
    setCurrentFolder(folderId); // Navega a la nueva carpeta
    setCurrentPage(1); // Reinicia la paginación cuando entras en una carpeta nueva
  };

  const handleBack = () => {
    const previousFolder = folderStack.pop(); // Elimina la última carpeta de la pila y regresa a la anterior
    setCurrentFolder(previousFolder || null); // Si no hay más carpetas en la pila, regresa a la raíz
    setFolderStack([...folderStack]); // Actualiza la pila
    setCurrentPage(1); // Reinicia la paginación al regresar a la carpeta anterior
  };

  return (
    <>
      {!loading ? (
        <>
          <span className="font-sans">miUnidad/{currentFolder || ""}</span>
          <div className="bg-white shadow-lg rounded-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-secundary font-futura text-white">
                <tr>
                  <th className="py-3 px-4 w-2/6 font-sans text-center text-md">
                    Nombre
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    Fecha de Creación
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    Categorias
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    Acciones
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    Permisos
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {folderStack.length > 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 px-6 text-start text-gray-700"
                    >
                      <span
                        className="cursor-pointer text-blue-500"
                        onClick={handleBack}
                      >
                        Volver...
                      </span>
                    </td>
                  </tr>
                )}

                {deliverableData && deliverableData.length > 0 ? (
                  deliverableData
                    .sort(
                      (a: any, b: any) =>
                        b.deliverableIsFolder - a.deliverableIsFolder
                    )
                    .map((deliverable: any) => (
                      <tr
                        key={deliverable.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 font-sans text-end text-sm text-gray-700">
                          <div className="grid grid-cols-2">
                            {deliverable.deliverableIsFolder ? (
                              <div className="flex justify-end">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6 mr-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                  />
                                </svg>
                              </div>
                            ) : deliverable.deliverableType === "pdf" ? (
                              <div className="flex mr-4 justify-end">
                                <Image
                                  src="https://i.postimg.cc/SN9VC7dD/file-expand-Pdf-icon-icons-com-68956.png"
                                  alt="PDF"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            ) : deliverable.deliverableType === "xls" ||
                              deliverable.deliverableType === "xlsx" ? (
                              <div className="flex mr-4 justify-end">
                                <Image
                                  src="https://i.postimg.cc/BZLCfcr4/file-10-icon-icons-com-68948.png"
                                  alt="XLS"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            ) : deliverable.deliverableType === "doc" ? (
                              <div className="flex mr-4 justify-end">
                                <Image
                                  src="https://i.postimg.cc/RCkLSJmf/file-5-icon-icons-com-68953.png"
                                  alt="DOC"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            ) : deliverable.deliverableType === "jpg" ||
                              deliverable.deliverableType === "png" ? (
                              <div className="flex mr-4 justify-end">
                                <Image
                                  src="https://i.postimg.cc/hPRVWF81/file-3-icon-icons-com-68952.png"
                                  alt="JPG/PNG"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Image
                                  src="https://i.postimg.cc/Dy6Byywc/empty-file-icon-icons-com-72420.png"
                                  alt="Otro Tipo"
                                  width={35}
                                  height={35}
                                />
                              </div>
                            )}
                            <span
                              className={`flex text-start cursor-pointer ${
                                deliverable.deliverableIsFolder
                                  ? ""
                                  : "pointer-events-none"
                              }`}
                              onClick={
                                deliverable.deliverableIsFolder
                                  ? () => handleOpenFolder(deliverable.id)
                                  : undefined
                              }
                            >
                              {deliverable.deliverableName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center font-sans text-sm text-gray-700">
                          {new Date(
                            deliverable.deliverableCreationDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-center font-sans text-sm text-gray-700">
                          {deliverable.deliverableCategories.join(", ")}
                        </td>
                        <td className="py-4 px-6 text-center font-sans text-sm text-gray-700">
                          {!deliverable.deliverableIsFolder && (
                            <div className="flex justify-center">
                              <DownloadDeliverable
                                id={deliverable.id}
                                path={deliverable.deliverablePath}
                                type={deliverable.deliverableType}
                              />
                              <EditDeliverable
                                id={deliverable.id}
                                name={deliverable.deliverableName}
                                description="Aqui debia haber una descripcion"
                                category={deliverable.deliverableCategory}
                              />
                              <DeleteDeliverable id={deliverable.id} />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center font-sans text-sm text-gray-700">
                          {!deliverable.deliverableIsFolder && (
                            <>
                              <button
                                onClick={() => togglePanel(deliverable.id)}
                                className="text-blue-500 hover:underline"
                              >
                                Ver Permisos
                              </button>
                              {openPanel === deliverable.id && (
                                <PermissionPanel
                                  fileId={deliverable?.id}
                                  closePanel={() => setOpenPanel(null)}
                                />
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 px-6 text-center text-gray-500"
                    >
                      No se encontraron entregables.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-secundary text-white rounded hover:bg-terciary transition-colors duration-300"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="py-2 font-sans">
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-secundary text-white rounded hover:bg-terciary transition-colors duration-300"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};

export default DeliverablesList;
