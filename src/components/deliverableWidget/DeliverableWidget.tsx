/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

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
  lastDate: string;
}

const deliverableWidget = () => {
  const [allDeliverables, setAllDeliverables] = useState<Deliverable[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/deliverables/user/${user.id}`
        );
        const data = await response.json();
        console.log(data);

        setAllDeliverables(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDeliverables();
  }, []);

  return (
    <div className="p-6 font-futura ">
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Ultimos Archivos
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary sans text-white">
            <tr>
              <th className="py-3 px-6 font-sans text-left text-lg">Nombre</th>
              <th className="py-3 px-6 font-sans text-left text-lg">Tipo</th>
              <th className="py-3 px-6 font-sans text-left text-lg">
                Permisos
              </th>
              <th className="py-3 px-6 font-sans text-left text-lg">
                Ultima fecha de modificacion
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allDeliverables.map((deliverable) => (
              <tr
                key={deliverable.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-sans text-sm text-gray-900">
                  {deliverable.deliverableName}
                </td>
                <td className="py-4 px-6 font-sans text-sm text-gray-700">
                  {deliverable.deliverableType}
                </td>
                <td className="py-4 px-6 font-sans text-sm text-gray-700">
                  {deliverable.permissionType}
                </td>
                <td className="py-4 px-6 font-sans text-sm text-gray-700">
                  {deliverable.lastDate}
                </td>
              </tr>
            ))}
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

export default deliverableWidget;
