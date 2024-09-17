/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import getDeliverableExtension from "@/helpers/getDeliverableExtension";

export interface Deliverable {
  autor: string;
  tipo: string;
  fechaCreacion: string;
  archivo: any;
  permisos: any;
  id: number;
  deliverableName: string;
  deliverableType: string;
  permissionType: string;
  deliverablePath: string;
  deliverableCategory: string;
  lastDate: string;
  deliverableIsFolder: boolean;
}

const DeliverableWidget = () => {
  const [allDeliverables, setAllDeliverables] = useState<Deliverable[]>([]);
  const token = Cookies.get("token");
  const { user } = useAuth();

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/deliverables/user/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setAllDeliverables(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDeliverables();
  }, []);

  return (
    <div className="p-6 font-futura">
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Últimos Archivos
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary sans text-white">
            <tr>
              <th className="py-3 px-6 font-sans text-left text-lg">Nombre</th>
              <th className="py-3 px-6 font-sans text-center text-lg">
                Categoria
              </th>
              <th className="py-3 px-6 font-sans text-center text-lg">
                Última modificación
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allDeliverables.map((deliverable) => {
              /* console.log(allDeliverables); */

              const extension = !deliverable.deliverableIsFolder
                ? getDeliverableExtension(deliverable.deliverablePath)
                : null;

              return (
                <tr
                  key={deliverable.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-sans text-sm text-gray-900">
                    <div className="flex space-x-2 items-center">
                      {deliverable.deliverableIsFolder ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                          />
                        </svg>
                      ) : deliverable.deliverableType === "Link" ? (
                        <div className="flex mr-4 justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-secundary"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                            />
                          </svg>
                        </div>
                      ) : extension === "pdf" ? (
                        <Image
                          src="https://i.postimg.cc/jjnx06MK/pdfIcon.png"
                          alt="PDF"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      ) : extension === "xls" || extension === "xlsx" ? (
                        <Image
                          src="https://i.postimg.cc/mgtRCNfM/excelicon.png"
                          alt="XLS"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      ) : extension === "doc" || extension === "docx" ? (
                        <Image
                          src="https://i.postimg.cc/yY78gZ8X/wordIcon.png"
                          alt="DOC"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      ) : extension === "txt" ? (
                        <Image
                          src="https://i.postimg.cc/Kzryx0BX/txtIcon.png"
                          alt="TXT"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      ) : extension === "ppt" ? (
                        <Image
                          src="https://i.postimg.cc/rs0C5PJ3/ppIcon.png"
                          alt="PPT"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      ) : extension === "jpg" ||
                        extension === "png" ||
                        extension === "jpeg" ||
                        extension === "gif" ||
                        extension === "svg" ||
                        extension === "bmp" ? (
                        <Image
                          src="https://i.postimg.cc/76yyFFCM/image-Icon.png"
                          alt="Image"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      ) : (
                        <Image
                          src="https://i.postimg.cc/wx2drb9L/fileicon.png"
                          alt="Otro"
                          width={20}
                          height={20}
                          className="mr-2 object-contain"
                        />
                      )}
                      <span>{deliverable.deliverableName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                    {deliverable.deliverableCategory}
                  </td>
                  <td className="py-4 px-6 font-sans text-center text-sm text-gray-700">
                    {deliverable.lastDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {allDeliverables.length === 0 && (
          <p className="p-6 text-gray-600">
            No se encontraron archivos recientes.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeliverableWidget;
