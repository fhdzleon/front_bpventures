"use client";
import { useAuth } from "@/context/AuthContext";
import FileTableNew from "../../../components/permisosprueba/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GetInvoices } from "@/helpers/auth.helper";
import InvoiceDetail, {
  Invoice,
} from "@/components/DetailInvoice/DetailInvoice";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import VoucherUpload from "@/components/invoice/VoucherUpload";

const BillingTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleOpenModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleOpenModalVoucher = (invoice: Invoice) => {
    setSelectedInvoice(invoice);    
    setIsModalOpenVoucher(true);
  };
  const handleCloseModalVoucher = () => {
    setIsModalOpenVoucher(false); 
    setSelectedInvoice(null);
  };

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoicePath: null,
      invoiceNumber: "INV-001",
      invoiceIssueDate: "30-08-2024",
      invoiceDueDate: "15-09-2024",
      invoiceAmount: "1500.00",
      invoiceStatus: "Payed",
      overdueIndicator: false,
    },
  ]);
  const { userData } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await GetInvoices(userData.id);
        setInvoices(response);
      } catch (error) {
        console.error("Error fetching invoices", error);
      }
    };
    fetchInvoices();
  }, [userData?.id]);

  return (
    <div className="m-5 overflow-x-auto mt-5 bg-white shadow-lg rounded-lg">
      {/* <pre>{JSON.stringify(invoices, null, 2)}</pre> */}
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Lista de Facturas: {userData?.Names}
      </h1>
      <ButtonUploadInvoice userId={userData?.id}/>
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
            {invoices &&
              invoices?.map((invoice) => (
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
                          d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                        />
                      </svg>
                    </button>
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    {/* boton de modal  */}
                    <button onClick={() => handleOpenModal(invoice)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                        />
                      </svg>
                    </button>

                    {isModalOpen && selectedInvoice && (
                      <div className=" fixed inset-0  flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl  sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                          <InvoiceDetail Invoice={selectedInvoice} />
                          <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-secundary text-white px-4 py-2 rounded-full"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}


{/* voucher */}
                    <button onClick={() => handleOpenModalVoucher(invoice)}>
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
                          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                    {isModalOpenVoucher && selectedInvoice &&  (
                      <div className=" fixed inset-0  flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl  sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                          {/* <InvoiceDetail Invoice={selectedInvoice} /> */}
                          <VoucherUpload Invoice={selectedInvoice}/>
                          {/* <pre>{JSON.stringify(selectedInvoice, null, 2)}</pre> */}
                          {/* <h2>Factura Id: {invoice.id}</h2>
                          <h2>Numero de Factura: {invoice.invoiceNumber}</h2> */}

                          <button
                            onClick={handleCloseModalVoucher}
                            className="mt-4 bg-secundary text-white px-4 py-2 rounded-full"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="p-6 text-gray-600">No se encontraron facturas.</p>
        )}
      </div>

      <div> <FileTableNew /></div>
    </div>
  );
};

export default BillingTable;
