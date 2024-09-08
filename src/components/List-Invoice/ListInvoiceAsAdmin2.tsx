"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { getAllInvoices, getUserById } from "@/helpers/auth.helper";
import InvoiceDetail, { InvoiceInterface } from "@/components/DetailInvoice/DetailInvoice";
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
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceInterface | null>(null);

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

  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);
  const [invoicesAdmin, setInvoicesAdmin] = useState<any[]>([
    {
      id: 1,
      number: "INV-0001",
      path: "path/to/invoice1.pdf",
      issueDate: "2024-01-01T00:00:00.000Z",
      dueDate: "2024-02-01T00:00:00.000Z",
      amount: "100.00",
      createdAt: "2024-09-07T23:49:36.030Z",
      updatedAt: null,
      user: {
        id: 1,
        email: "user1@example.com",
        password: "$2b$10$z2hbyUoyqwBl/GuG5upLuu4G5g1ahRwif2ee5OBWcYCzduHxcmy6K",
        Names: "User1",
        LastName: "LastName1",
        Position: "Position1",
        empresa: null,
        cuit: null,
        domicilio: null,
        verifiedEmail: false,
        mfaEnabled: false,
        mfaBackupCodes: "",
        mfaSecret: "",
        mfaVerified: null,
        createdAt: "2024-09-07T23:49:34.741Z",
        modifiedAt: "2024-09-07T23:49:34.741Z",
        statusId: 1,
        isAdmin: true,
      },
      invoiceStatus: {
        id: 1,
        name: "Pending",
        createdAt: "2024-09-07T23:49:35.967Z",
        updatedAt: null,
      },
      company: {
        id: 1,
        name: "Company1",
        address: "Address1",
        cuit: "200000001",
      },
    },
    {
      id: 2,
      number: "INV-0002",
      path: "path/to/invoice2.pdf",
      issueDate: "2024-02-01T00:00:00.000Z",
      dueDate: "2024-03-01T00:00:00.000Z",
      amount: "150.00",
      createdAt: "2024-09-07T23:49:36.030Z",
      updatedAt: null,
      user: {
        id: 2,
        email: "user2@example.com",
        password: "$2b$10$pU5RZspg7uvh.yqJbTzofeAnrBom3v01EmIViRDKlhXE09J92idMO",
        Names: "User2",
        LastName: "LastName2",
        Position: "Position2",
        empresa: null,
        cuit: null,
        domicilio: null,
        verifiedEmail: false,
        mfaEnabled: false,
        mfaBackupCodes: "",
        mfaSecret: "",
        mfaVerified: null,
        createdAt: "2024-09-07T23:49:34.804Z",
        modifiedAt: "2024-09-07T23:49:34.804Z",
        statusId: 1,
        isAdmin: true,
      },
      invoiceStatus: {
        id: 2,
        name: "Payed",
        createdAt: "2024-09-07T23:49:35.967Z",
        updatedAt: null,
      },
      company: {
        id: 2,
        name: "Company2",
        address: "Address2",
        cuit: "200000002",
      },
    },
  ]);
  const { userData, loading, fetchAgain } = useAuth();

  const fetchInvoicesById = async () => {
    try {
      if (!loading) {
        const response = await getUserById(userData?.id);
        setInvoices(response);
      }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
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
    fetchInvoicesById();
    fetchInvoices();
  }, [userData?.id, fetchAgain]);

  return (
    <div className="m-5 overflow-x-auto mt-5 rounded-lg">
      <pre>{JSON.stringify(invoicesAdmin, null, 2)}</pre>
      <h1 className="text-4xl font-futura mb-6 text-secundary">Lista de Facturas: {userData?.Names}</h1>
      <ButtonUploadInvoice userId={userData?.id} />
      <div className="mt-4 overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 font-futura text-left text-lg">Factura</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Monto</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Estado</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Fecha de Emisión</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Vencimiento</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices &&
              invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 font-futura text-sm text-gray-900">{invoice.invoiceNumber}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">${invoice.invoiceAmount}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.invoiceStatus}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.invoiceIssueDate}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.invoiceDueDate}</td>
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
