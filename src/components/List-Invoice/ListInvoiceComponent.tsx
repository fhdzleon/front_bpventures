"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import InvoiceDetail from "@/components/DetailInvoice/DetailInvoice";
import VoucherUpload from "@/components/invoice/VoucherUpload";
import DeleteInvoice from "@/components/InvoicesButton/ButtonDelete";
import { PATHROUTES } from "@/helpers/pathRoutes";
import InvoiceDownload from "@/components/InvoicesButton/Buttondowland";
import EyeIcon from "../icons/EyeIcon";
import VoucherIcon from "../icons/UploadIcon";
import EditIcon from "../icons/EditIcon";
import PreloaderLoad from "../preloader/PreloaderLoad";
import PreloaderAwait from "../preloader/PreloaderAwait";

const ListInvoiceComponent = ({ invoicesData, isAdmin, companyName, userEmail }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceInterface | null>(null);
  const { userData, loading, fetchAgain } = useAuth();

  const handleOpenModal = (invoice: InvoiceInterface) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleOpenModalVoucher = (invoice: InvoiceInterface) => {
    setSelectedInvoice(invoice);
    setIsModalOpenVoucher(true);
  };

  const handleCloseModalVoucher = () => {
    setIsModalOpenVoucher(false);
    setSelectedInvoice(null);
  };

  const getStatusColor = (statusId: number | undefined) => {
    switch (statusId) {
      case 1:
        return 'text-black'; // Negro
      case 2:
        return 'text-yellow-500'; // Amarillo
      case 3:
        return 'text-green-500'; // Verde
      case 4:
        return 'text-red-500'; // Rojo
      default:
        return 'text-gray-700'; // Color por defecto si no coincide
    }
  };

  return (
    <div className="m-5 overflow-x-auto mt-5 rounded-lg">
      {/* <PreloaderLoad/> */}
      {loading &&  <PreloaderAwait/>}
      {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
      <h1 className="text-4xl font-futura mb-6 text-secundary">Lista de Facturas: {userEmail}</h1>
      <div className="mt-4 overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">

        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 font-futura text-left text-lg">Factura</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Monto</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Estado</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Fecha de Emisión</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Vencimiento</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Empresa</th>
              {isAdmin && (
                <>
                  <th className="py-3 px-4 font-futura text-left text-lg">Usuario</th>
                </>
              )}
              <th className="py-3 px-4 font-futura text-left text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoicesData &&
              invoicesData.map((invoice: InvoiceInterface) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 font-futura text-sm text-gray-900">{invoice.number}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">${invoice.amount}</td>
                  <td className={`py-4 px-6 font-futura text-sm ${getStatusColor(invoice.invoiceStatus?.id)}`}>
                    {invoice.invoiceStatus?.name}
                  </td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.issueDate}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.dueDate}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.company?.name}</td>
                  {isAdmin && (
                    <>
                      <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.user?.email}</td>
                    </>
                  )}
                  <td className="py-4 px-6 font-futura text-sm text-gray-700 flex space-x-4">
                    <InvoiceDownload userId={userData?.id || ""} invoiceId={invoice.id} />

                    <button title="vista previa" onClick={() => handleOpenModal(invoice)}>
                      <EyeIcon />
                    </button>

                    {isModalOpen && selectedInvoice && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <InvoiceDetail Invoice={selectedInvoice as InvoiceInterface} />
                          <button onClick={handleCloseModal} className="mt-4 bg-secundary text-white px-4 py-2 rounded-full">
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}

                    <button title="voucher" onClick={() => handleOpenModalVoucher(invoice)}>
                      <VoucherIcon />
                    </button>

                    {isModalOpenVoucher && selectedInvoice && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModalVoucher}>
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <VoucherUpload Invoice={selectedInvoice as InvoiceInterface} />
                          <button onClick={handleCloseModalVoucher} className="mt-4 bg-secundary text-white px-4 py-2 rounded-full">
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}

                    {isAdmin && (
                      <>
                        {/* ========== EDITAR ========== */}
                        <a href={`${PATHROUTES.INVOICES}/${invoice.id}/edit`} className="hover:text-acent">
                          <button>
                            <EditIcon />
                          </button>
                        </a>
                        <DeleteInvoice id={invoice.id} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {invoicesData.length === 0 && <p className="p-6 text-gray-600">No se encontraron facturas.</p>}
      </div>
    </div>
  );
};

export default ListInvoiceComponent;
