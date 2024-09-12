"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import DeleteDeliverable from "../deliverablesActions/DeleteDeliverable";
import DownloadDeliverable from "../deliverablesActions/DownloadDeliverable";
import EditDeliverable from "../deliverablesActions/EditDeliverable";
import SortDeliverable from "../sortDeliverables/SortDeliverable";
import Image from "next/image";
import PermissionPanel from "./permissionpanel";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { fetchDeliverables } from "@/helpers/fetchDeliverables";
import SearchBar from "./Searchbar";
import getDeliverableExtension from "@/helpers/getDeliverableExtension";
import UploadDeliverable from "../deliverablesActions/UploadDeliverable";
import FilterDeliverableForBussines from "../filterDeliverableForBussines/FilterDeliverableForBussines";
import LinkDeliverable from "../deliverablesActions/LinkDeliverable";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const togglePanel = (fileId: number | null) => {
    setOpenPanel(openPanel === fileId ? null : fileId);
  };

  /* console.log(deliverableData); */
  /* console.log("datos", userData); */

  useEffect(() => {
    fetchDeliverables(
      userData?.id,
      token,
      currentPage,
      /* itemsPerPage, */
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

  const fetchDeliverables2 = async () => {
    await fetchDeliverables(
      userData?.id,
      token,
      currentPage,
      /* itemsPerPage, */
      currentFolder,
      setDeliverableData
    );
  };

  // const fetchDeliverables = (
  //   userId: number | undefined,
  //   token: string | undefined,
  //   currentPage: number,
  //   itemsPerPage: number,
  //   currentFolder: string | null,
  //   setDeliverableData: (data: any) => void
  // ) => {
  //   // Lógica para obtener los deliverables
  //   console.log('Fetching deliverables with:', {
  //     userId,
  //     token,
  //     currentPage,
  //     itemsPerPage,
  //     currentFolder,
  //   });
  //   // Simulación de API call
  //   setDeliverableData(['deliverable1', 'deliverable2']);
  // };
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
  /*   console.log(deliverableData); */

  return (
    <>
      <div className="flex items-center space-x-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchdeliverable={fetchDeliverables2}
        />
        <FilterDeliverableForBussines
          userId={userData.id}
          token={token}
          currentPage={currentPage}
          currentFolder={currentFolder}
        />
        <UploadDeliverable
          currentFolder={currentFolder}
          parentId={currentFolder}
        />
      </div>

      {!loading ? (
        <div className="mt-4">
          <span className="font-mono ">{pathView}/</span>
          <div className=" bg-white shadow-lg rounded-lg border border-gray-300">
            <table className=" min-w-full divide-y divide-gray-300">
              <thead className="bg-secundary font-futura text-white">
                <tr>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    <div className=" flex justify-evenly items-center">
                      Nombre:
                      <SortDeliverable
                        UserId={userData?.id}
                        column="name"
                        currentFolder={currentFolder}
                      />
                    </div>
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    <div className=" flex justify-evenly items-center">
                      Fecha
                      <SortDeliverable
                        UserId={userData?.id}
                        column="date"
                        currentFolder={currentFolder}
                      />
                    </div>
                  </th>
                  <th className="py-3 px-4 w-1/6 font-sans text-center text-md">
                    <div className=" flex justify-evenly items-center">
                      Categorias
                      <SortDeliverable
                        UserId={userData?.id}
                        column="category"
                        currentFolder={currentFolder}
                      />
                    </div>
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
                {Array.isArray(deliverableData) &&
                deliverableData?.length > 0 ? (
                  deliverableData
                    ?.sort(
                      (a: any, b: any) =>
                        b.deliverableIsFolder - a.deliverableIsFolder
                    )
                    .map((deliverable: any) => {
                      const extension = !deliverable.deliverableIsFolder
                        ? getDeliverableExtension(deliverable.deliverablePath)
                        : null;
                      return (
                        <tr
                          key={deliverable.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-6 font-sans text-end text-sm text-gray-700">
                            <div className="grid grid-cols-2  items-center">
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
                              ) : deliverable.deliverableType === "Link" ? (
                                <div className="flex mr-4 justify-end">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-8 text-secundary"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                    />
                                  </svg>
                                </div>
                              ) : extension === "pdf" ? (
                                <div className="flex mr-4 justify-end">
                                  <Image
                                    src="https://i.postimg.cc/jjnx06MK/pdfIcon.png"
                                    alt="PDF"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
                                  />
                                </div>
                              ) : extension === "xls" ||
                                extension === "xlsx" ? (
                                <div className="flex mr-4  justify-end">
                                  <Image
                                    src="https://i.postimg.cc/mgtRCNfM/excelicon.png"
                                    alt="XLS"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
                                  />
                                </div>
                              ) : extension === "doc" ||
                                extension === "docx" ? (
                                <div className="flex mr-4  justify-end">
                                  <Image
                                    src="https://i.postimg.cc/yY78gZ8X/wordIcon.png"
                                    alt="DOC"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
                                  />
                                </div>
                              ) : extension === "txt" ? (
                                <div className="flex mr-4  justify-end">
                                  <Image
                                    src="https://i.postimg.cc/Kzryx0BX/txtIcon.png"
                                    alt="txt"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
                                  />
                                </div>
                              ) : extension === "ppt" ? (
                                <div className="flex mr-4  justify-end">
                                  <Image
                                    src="https://i.postimg.cc/rs0C5PJ3/ppIcon.png"
                                    alt="power point"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
                                  />
                                </div>
                              ) : extension === "jpg" ||
                                extension === "png" ||
                                extension === "jpeg" ||
                                extension === "gif" ||
                                extension === "svg" ||
                                extension === "bmp" ? (
                                <div className="flex mr-4  justify-end">
                                  <Image
                                    src="https://i.postimg.cc/76yyFFCM/image-Icon.png"
                                    alt="image"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="flex mr-4  justify-end">
                                  <Image
                                    src="https://i.postimg.cc/wx2drb9L/fileicon.png"
                                    alt="Otro Tipo"
                                    width={30}
                                    height={30}
                                    className=" object-contain"
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
                                {deliverable.permissionTypes?.includes(
                                  "owner"
                                ) || userData.isAdmin ? (
                                  <>
                                    {deliverable.deliverableType !== "Link" ? (
                                      <DownloadDeliverable
                                        path={deliverable.deliverablePath}
                                      />
                                    ) : (
                                      <LinkDeliverable
                                        path={deliverable.deliverablePath}
                                      />
                                    )}
                                    <EditDeliverable
                                      id={deliverable.id}
                                      name={deliverable.deliverableName}
                                      description={""}
                                      category={""}
                                      path={deliverable.deliverablePath}
                                      type={deliverable.deliverableType}
                                    />
                                    <DeleteDeliverable id={deliverable.id} />
                                  </>
                                ) : (
                                  <>
                                    {deliverable.permissionTypes?.includes(
                                      "view"
                                    ) &&
                                      (deliverable.deliverableType !==
                                      "Link" ? (
                                        <DownloadDeliverable
                                          path={deliverable.deliverablePath}
                                        />
                                      ) : (
                                        <LinkDeliverable
                                          path={deliverable.deliverablePath}
                                        />
                                      ))}

                                    {deliverable.permissionTypes?.includes(
                                      "edit"
                                    ) && (
                                      <EditDeliverable
                                        id={deliverable.id}
                                        name={deliverable.deliverableName}
                                        description="Aqui debia haber una descripcion"
                                        category={
                                          deliverable.deliverableCategory
                                        }
                                        path={deliverable.deliverablePath}
                                        type={deliverable.deliverableType}
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
                      );
                    })
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
        </div>
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
function setFilteredDeliverables(filtered: any) {
  throw new Error("Function not implemented.");
}
