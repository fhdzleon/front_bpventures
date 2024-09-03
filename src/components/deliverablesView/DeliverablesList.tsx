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
import { fetchDeliverables } from "@/helpers/fetchDeliverables";
import FileTableNew from "../permisosprueba/table";
import PreviewViewDeliverable from "@/components/permisosprueba/PreviewButton";

const DeliverablesList = () => {
  const { setDeliverableData, userData, deliverableData, loading, fetchAgain } =
    useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [pathView, setpathView] = useState<string>("miUnidad");
  const itemsPerPage = 10;
  const token = Cookies.get("token");
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const togglePanel = (fileId: number | null) => {
    setOpenPanel(openPanel === fileId ? null : fileId);
  };

  useEffect(() => {
    fetchDeliverables(
      userData?.id,
      token,
      currentPage,
      itemsPerPage,
      currentFolder,
      setDeliverableData
    );
  }, [
    currentPage,
    setDeliverableData,
    token,
    userData?.id,
    fetchAgain,
    currentFolder,
  ]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviusPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleOpenFolder = (folderId: string, route: string) => {
    setFolderStack([...folderStack, currentFolder!]);
    setCurrentFolder(folderId);
    setpathView((prevPathView) => `${prevPathView}/${route}`);
    setCurrentPage(1);
  };

  const handleBack = () => {
    const previousFolder = folderStack.pop();
    setCurrentFolder(previousFolder || null);
    setFolderStack([...folderStack]);
    setpathView((prevPathView) =>
      prevPathView.substring(0, prevPathView.lastIndexOf("/"))
    );
    setCurrentPage(1);
  };

  return (
    <>
      {!loading ? (
        <>
          <span className="font-mono ">{pathView}/</span>
          <div className=" bg-white shadow-lg rounded-lg border border-gray-300">
            <table className=" min-w-full divide-y divide-gray-300">
              <thead className="bg-secundary font-futura text-white">
                <tr>
                  <th className="py-3 px-4 w-2/6 font-sans text-center text-md first:">
                    Nombre
                  </th>

                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    Fecha de Creación
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md ">
                    Categorias
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md ">
                    Acciones
                  </th>
                  <th className=" py-3 px-4  w-1/6 font-sans text-center text-md">
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
                        className="cursor-pointer text-secundary"
                        onClick={handleBack}
                      >
                        Regresar...
                      </span>
                    </td>
                  </tr>
                )}
                {deliverableData && deliverableData.length > 0 ? (
                  deliverableData
                    /* deliverableMock */
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
                              <div className="flex mr-4  justify-end">
                                <Image
                                  src="https://i.postimg.cc/BZLCfcr4/file-10-icon-icons-com-68948.png"
                                  alt="XLS"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            ) : deliverable.deliverableType === "doc" ? (
                              <div className="flex mr-4  justify-end">
                                <Image
                                  src="https://i.postimg.cc/RCkLSJmf/file-5-icon-icons-com-68953.png"
                                  alt="DOC"
                                  width={30}
                                  height={30}
                                />
                              </div>
                            ) : deliverable.deliverableType === "jpg" ||
                              deliverable.deliverableType === "png" ? (
                              <div className="flex mr-4  justify-end">
                                <Image
                                  src="https://i.postimg.cc/hPRVWF81/file-3-icon-icons-com-68952.png"
                                  alt="DOC"
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
                                  ? () =>
                                      handleOpenFolder(
                                        deliverable.id,
                                        deliverable.deliverableName
                                      )
                                  : undefined
                              }
                            >
                              {deliverable.deliverableName}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                          {deliverable.lastDate}
                        </td>
                        <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                          {deliverable.deliverableCategory}
                        </td>
                        {!deliverable.deliverableIsFolder && (
                          <td>
                            <div className="grid grid-cols-3 justify-center justify-items-center">
                              {/* Si el usuario es owner, puede hacer todo */}
                              {deliverable.permissionTypes?.includes("owner") ||
                              userData.isAdmin ? (
                                <>
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
                                </>
                              ) : (
                                <>
                                  {deliverable.permissionTypes?.includes(
                                    "view"
                                  ) && (
                                    <DownloadDeliverable
                                      id={deliverable.id}
                                      path={deliverable.deliverablePath}
                                      type={deliverable.deliverableType}
                                    />
                                  )}

                                  {deliverable.permissionTypes?.includes(
                                    "edit"
                                  ) && (
                                    <EditDeliverable
                                      id={deliverable.id}
                                      name={deliverable.deliverableName}
                                      description="Aqui debia haber una descripcion"
                                      category={deliverable.deliverableCategory}
                                    />
                                  )}

                                  {deliverable.permissionTypes?.includes(
                                    "owner"
                                  ) && (
                                    <DeleteDeliverable id={deliverable.id} />
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        )}

                        {(deliverable.permissionTypes?.includes("owner") ||
                          userData?.isAdmin) &&
                        !deliverable.deliverableIsFolder ? (
                          <td className="py-4 px-6 text-sm text-center text-gray-700 relative">
                            <button
                              onClick={() => togglePanel(deliverable?.id)}
                              className="w-6 h-6 mx-auto hover:text-acent "
                            >
                              {/* Administrar permisos */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128c.332-.183.582-.495.644-.869l.214-1.28Z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </button>
                            {openPanel === deliverable?.id && (
                              <PermissionPanel
                                fileId={deliverable?.id}
                                closePanel={() => setOpenPanel(null)}
                              />
                            )}
                          </td>
                        ) : null}
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-4 px-6 text-center text-gray-600"
                    >
                      No se encontraron archivos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviusPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 font-sans text-gray-700 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="font-sans">Página {currentPage}</span>

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
      ) : (
        <>
          <div className="flex  flex-col items-center justify-center mt-7">
            <span className="loader"></span>
          </div>
        </>
      )}
    </>
  );
};

export default DeliverablesList;
