"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { getAllInvoices, getInvoicesById } from "@/helpers/auth.helper";
import InvoiceDetail, { Invoice } from "@/components/DetailInvoice/DetailInvoice";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import VoucherUpload from "@/components/invoice/VoucherUpload";
import DeleteInvoice from "@/components/InvoicesButton/ButtonDelete";
import Link from "next/link";
import { PATHROUTES } from "@/helpers/pathRoutes";
import InvoiceDownload from "@/components/InvoicesButton/Buttondowland";
import EyeIcon from "../icons/EyeIcon";
import VoucherIcon from "../icons/UploadIcon";
import EditIcon from "../icons/EditIcon";

const BillingTableComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesAdmin, setInvoicesAdmin] = useState<any[]>([{}]);
  const { userData, loading, fetchAgain } = useAuth();

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

  const fetchInvoices = async () => {
    try {
      if (!loading) {
        const response = await getAllInvoices();
        setInvoicesAdmin(response);
      }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [fetchAgain]);

  return (
    <div className="m-5 overflow-x-auto mt-5 rounded-lg">
      <div className="mt-4 overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 font-futura text-left text-lg">Factura</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Monto</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Estado</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Fecha de Emisión</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Vencimiento</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Usuario</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Empresa</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoicesAdmin &&
              invoicesAdmin.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 font-futura text-sm text-gray-900">{invoice.number}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">${invoice.amount}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.invoiceStatus?.name}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.issueDate}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.dueDate}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.user?.email}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.company?.name}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700 flex space-x-4">
                    <InvoiceDownload userId={userData?.id || ""} invoiceId={invoice.id} />

                    <button title="vista previa" onClick={() => handleOpenModal(invoice)}>
                      <EyeIcon />
                    </button>

                    {isModalOpen && selectedInvoice && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
                        >
                          <InvoiceDetail Invoice={selectedInvoice} />
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
                          onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
                        >
                          <VoucherUpload Invoice={selectedInvoice} />
                          <button onClick={handleCloseModalVoucher} className="mt-4 bg-secundary text-white px-4 py-2 rounded-full">
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}

                    {userData?.isAdmin && (
                      <>
                        {/* ========== EDITAR ========== */}
                        <a href={`${PATHROUTES.INVOICES}/${invoice.id}/edit`} className="hover:text-acent">
                          <button>
                            <EditIcon />
                          </button>
                        </a>

                        {userData.isAdmin && <DeleteInvoice id={invoice.id} />}
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {invoices.length === 0 && <p className="p-6 text-gray-600">No se encontraron facturas.</p>}
      </div>
    </div>
  );
};

export default BillingTableComponent;
