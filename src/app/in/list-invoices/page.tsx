"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { GetInvoices } from "@/helpers/auth.helper";
import InvoiceDetail, {
  Invoice,
} from "@/components/DetailInvoice/DetailInvoice";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import VoucherUpload from "@/components/invoice/VoucherUpload";
import PreviewButton from "@/components/PreviewButton/PreviewButton";
import DeleteInvoice from "@/components/InvoicesButton/ButtonDelete";
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
  const { userData, loading } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (!loading) {
          const response = await GetInvoices(userData?.id);
          setInvoices(response);
        }
      } catch (error) {
        console.error("Error fetching invoices", error);
      }
    };
    fetchInvoices();
  }, [userData?.id]);

  return (
    <div className="m-5  overflow-x-auto mt-5   rounded-lg">
      {/* <pre>{JSON.stringify(invoices, null, 2)}</pre> */}
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Lista de Facturas: {userData?.Names}
      </h1>
      <ButtonUploadInvoice userId={userData?.id} />
      <div className="mt-4 overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
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
                    <DeleteInvoice id={invoice.id} />
                    {/* boton de modal  */}
                    <button onClick={() => handleOpenModal(invoice)}>
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
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
                    {isModalOpenVoucher && selectedInvoice && (
                      <div className=" fixed inset-0  flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl  sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                          {/* <InvoiceDetail Invoice={selectedInvoice} /> */}
                          <VoucherUpload Invoice={selectedInvoice} />
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
    </div>
  );
};

export default BillingTable;
