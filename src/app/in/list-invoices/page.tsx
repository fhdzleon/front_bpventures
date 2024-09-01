"use client";
import { useAuth } from '@/context/AuthContext';
import FileTableNew from '../../../components/permisosprueba/table'

import Link from "next/link";

import React, { useEffect, useState } from "react";
import { GetInvoices } from '@/helpers/auth.helper';
// formData.append('invoiceNumber', invoiceNumber);
// formData.append('issueDate', issueDate);
// formData.append('dueDate', dueDate);
// formData.append('amount', amount.toString());
// formData.append('userId', userId.toString());
// formData.append('invoiceStatusId', invoiceStatusId.toString());

//SOLO PORQUE NECESITABA INFO
// const usersData = [
//   { id: 101, name: "Juan Pérez" },
//   { id: 102, name: "Ana Gómez" },
//   { id: 103, name: "Carlos Rodríguez" },
//   { id: 104, name: "María López" },
//   { id: 105, name: "Lucía Fernández" },
//   { id: 106, name: "Pedro Martínez" },
//   { id: 107, name: "Laura Sánchez" },
//   { id: 108, name: "Sofía Ramírez" },
//   { id: 109, name: "Ricardo Hernández" },
//   { id: 110, name: "Elena Vargas" },
// ];
// //SOLO PORQUE NECESITABA EJEMPLOS
// const invoicesData = [
//   {
//     id: 1,
//     amount: 150.0,
//     invoiceStatusId: 3,
//     issueDate: "2024-08-01",
//     dueDate:"304959",
//     userId: 101,
//   },
//   {
//     id: 2,
//     amount: 300.5,
//     invoiceStatusId: 2,
//     issueDate: "2024-08-10",
//     dueDate:"304959",
//     userId: 102,
//   },
//   {
//     id: 3,
//     amount: 75.2,
//     invoiceStatusId: 1,
//     issueDate: "2024-08-15",
//     dueDate:"304959",
//     userId: 103,
//   },
//   {
//     id: 4,
//     amount: 200.0,
//     invoiceStatusId: 2,
//     issueDate: "2024-08-20",
//     dueDate:"304959",
//     userId: 104,
//   },
//   {
//     id: 5,
//     amount: 50.0,
//     invoiceStatusId: 1,
//     issueDate: "2024-08-25",
//     dueDate:"304959",
//     userId: 105,
//   },
// ];
const BillingTable = () => {
  const [invoices, setInvoices] = useState(
    [
      {
        "id": 0,
        "invoicePath": null,
        "invoiceNumber": "",
        "invoiceIssueDate": "",
        "invoiceDueDate": "",
        "invoiceAmount": "",
        "invoiceStatus": "",
        "overdueIndicator": false
      },
    ]);
  const [users] = useState();
  const { userData } = useAuth();


  useEffect(() => {
    const GetInvoices1 = async () => {
      try {
        const response = await GetInvoices(userData.id);
     
        setInvoices(response); 
      } catch (error) {
        console.error("Error fetching permissions", error);
      }
      
    };
    GetInvoices1()
  },[])

  // const getUserName = (userId: number) => {
  //   const user = users.find((user) => user.id === userId);
  //   return user ? user.name : "Usuario no encontrado";
  // };

  // const handleDownload = (id: number) => {
  //   console.log(`Descargando factura con ID: ${id}`);
  // };

  // const handleDelete = (id: number) => {
  //   setInvoices(invoices.filter((invoice) => invoice.id !== id));
  //   console.log(`Eliminando factura con ID: ${id}`);
  // };

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
      {/* <pre> {JSON.stringify(invoices,null,2)} </pre> */}
      <h1 className="text-4xl font-futura mb-6 text-primary">
        Lista de Facturas: {userData?.Names}
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 font-futura text-left text-lg">
              Factura
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">Monto</th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Estado
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Fecha de Emisión
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">
             Vencimiento
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices && invoices?.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-futura text-sm text-gray-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  ${invoice.invoiceAmount}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  {invoice.invoiceStatus}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  {invoice.invoiceIssueDate}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700">
                  {invoice.invoiceDueDate}
                </td>
                <td className="py-4 px-6 font-futura text-sm text-gray-700 flex space-x-4">
                  <button >
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
                  <button >
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

                  <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="p-6 text-gray-600">No se encontraron facturas.</p>
        )}
      </div>
      <FileTableNew/>
    </div>

  );
};

export default BillingTable;