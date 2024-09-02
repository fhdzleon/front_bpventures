"use client";
import FileTableNew from '../../../components/permisosprueba/table'

import Link from "next/link";

import React, { useState } from "react";

//SOLO PORQUE NECESITABA INFO
const usersData = [
  { id: 101, name: "Juan Pérez" },
  { id: 102, name: "Ana Gómez" },
  { id: 103, name: "Carlos Rodríguez" },
  { id: 104, name: "María López" },
  { id: 105, name: "Lucía Fernández" },
  { id: 106, name: "Pedro Martínez" },
  { id: 107, name: "Laura Sánchez" },
  { id: 108, name: "Sofía Ramírez" },
  { id: 109, name: "Ricardo Hernández" },
  { id: 110, name: "Elena Vargas" },
];
//SOLO PORQUE NECESITABA EJEMPLOS
const invoicesData = [
  {
    id: 1,
    amount: 150.0,
    invoiceStatusId: 3,
    issueDate: "2024-08-01",
    userId: 101,
  },
  {
    id: 2,
    amount: 300.5,
    invoiceStatusId: 2,
    issueDate: "2024-08-10",
    userId: 102,
  },
  {
    id: 3,
    amount: 75.2,
    invoiceStatusId: 1,
    issueDate: "2024-08-15",
    userId: 103,
  },
  {
    id: 4,
    amount: 200.0,
    invoiceStatusId: 2,
    issueDate: "2024-08-20",
    userId: 104,
  },
  {
    id: 5,
    amount: 50.0,
    invoiceStatusId: 1,
    issueDate: "2024-08-25",
    userId: 105,
  },
];
const BillingTable = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [users] = useState(usersData);

  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Usuario no encontrado";
  };

  const handleDownload = (id: number) => {
    console.log(`Descargando factura con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
    console.log(`Eliminando factura con ID: ${id}`);
  };

  const getInvoiceStatus = (invoiceStatusId: number) => {
    switch (invoiceStatusId) {
      case 1:
        return "Pagado";
      case 2:
        return "Pendiente";
      case 3:
        return "Anulado";
      default:
        return "Estado desconocido";
    }
  };

  return (
    <div className="m-5 overflow-x-auto mt-5 bg-white shadow-lg rounded-lg ">
      <h1 className="text-4xl font-futura mb-6 text-primary">
        Lista de Facturas
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Usuario
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">Monto</th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Estado
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Fecha de Emisión
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-futura text-sm text-gray-900">
                  {getUserName(invoice.userId)}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  {getInvoiceStatus(invoice.invoiceStatusId)}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  {invoice.issueDate}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700 flex space-x-4">
                  <button onClick={() => handleDownload(invoice.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto hover:text-acent"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(invoice.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto hover:text-acent"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <Link href={`/in/list-invoices/${invoice.id}`}>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto hover:text-acent"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="p-6 text-gray-600">No se encontraron facturas.</p>
        )}
      </div>
    </div>

  );
};

export default BillingTable;