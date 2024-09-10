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
import FilterInput from "../Search/Search";
import PermissionPanel from "./PanelPermissionInvoices";

const ListInvoiceComponent = ({
  invoicesData,
  isAdmin,
  companyName,
  userEmail,
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [selectedInvoice, setSelectedInvoice] =
    useState<InvoiceInterface | null>(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(invoicesData.length / itemsPerPage);
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const { userData, loading, fetchAgain } = useAuth();

  const togglePanel = (fileId: number | null) => {
    setOpenPanel(openPanel === fileId ? null : fileId);
  };
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
        return "text-black"; // Negro
      case 2:
        return "text-yellow-500"; // Amarillo
      case 3:
        return "text-green-500"; // Verde
      case 4:
        return "text-red-500"; // Rojo
      default:
        return "text-gray-700"; // Color por defecto si no coincide
    }
  };

  const indexOfLastInvoice = currentPage * itemsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;

  const filteredInvoices = invoicesData.filter((invoice: InvoiceInterface) =>
    invoice.number.toLowerCase().includes(filter.toLowerCase())
  );

  const currentInvoices = filteredInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="m-5 max-h-screen mt-5 rounded-lg">
      {/* <PreloaderLoad/> */}
      {loading && <PreloaderAwait />}
      {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
      {/* <h1 className="text-4xl font-futura mb-6 text-secundary">
        Lista de Facturas: {userEmail}
      </h1> */}
      <FilterInput filter={filter} onFilterChange={setFilter} />
      <div className="mt-4 o bg-white shadow-lg rounded-lg border border-gray-300">
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
                Empresa
              </th>
              {isAdmin && (
                <>
                  <th className="py-3 px-4 font-futura text-left text-lg">
                    Usuario
                  </th>
                </>
              )}
              <th className="py-3 px-4 font-futura text-left text-lg">
                Acciones
              </th>
              <th className="py-3 px-4 font-futura text-left text-lg">
                Permisos
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentInvoices.length > 0 ? (
              currentInvoices.map((invoice: InvoiceInterface) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-futura text-sm text-gray-900">
                    {invoice.number}
                  </td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">
                    ${invoice.amount}
                  </td>
                  <td
                    className={`py-4 px-6 font-futura text-sm ${getStatusColor(
                      invoice.invoiceStatus?.id
                    )}`}
                  >
                    {invoice.invoiceStatus?.name}
                  </td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">
                    {invoice.issueDate}
                  </td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">
                    {invoice.dueDate}
                  </td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">
                    {invoice.company?.name}
                  </td>
                  {isAdmin && (
                    <>
                      <td className="py-4 px-6 font-futura text-sm text-gray-700">
                        {invoice.user?.email}
                      </td>
                    </>
                  )}
                  <td className="py-4 px-6 font-futura text-sm text-gray-700 flex space-x-4">
                    <InvoiceDownload
                      userId={userData?.id || ""}
                      invoiceId={invoice.id}
                    />

                    <button
                      title="vista previa"
                      onClick={() => handleOpenModal(invoice)}
                    >
                      <EyeIcon />
                    </button>

                    {isModalOpen && selectedInvoice && (
                      <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                        onClick={handleCloseModal}
                      >
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <InvoiceDetail
                            Invoice={selectedInvoice as InvoiceInterface}
                          />
                          <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-secundary text-white px-4 py-2 rounded-full"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      title="voucher"
                      onClick={() => handleOpenModalVoucher(invoice)}
                    >
                      <VoucherIcon />
                    </button>

                    {isModalOpenVoucher && selectedInvoice && (
                      <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                        onClick={handleCloseModalVoucher}
                      >
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <VoucherUpload
                            Invoice={selectedInvoice as InvoiceInterface}
                          />
                          <button
                            onClick={handleCloseModalVoucher}
                            className="mt-4 bg-secundary text-white px-4 py-2 rounded-full"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    )}

                    {isAdmin && (
                      <>
                        {/* ========== EDITAR ========== */}
                        <a
                          href={`${PATHROUTES.INVOICES}/${invoice.id}/edit`}
                          className="hover:text-acent"
                        >
                          <button>
                            <EditIcon />
                          </button>
                        </a>
                        <DeleteInvoice id={invoice.id} />
                      </>
                    )}
                  </td>{" "}
                  <td className="py-4 px-6 font-futura text-sm text-gray-700 relative">
                    <button
                      onClick={() => togglePanel(invoice.id)} // Aquí se debería usar invoice.id
                      className="w-6 h-6 mx-auto hover:text-acent"
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
                    {openPanel === invoice.id && ( // Aquí se usa openPanel en lugar de setOpenPanel
                      <PermissionPanel
                        fileId={invoice.id} // Asegúrate de pasar el id correcto
                        closePanel={() => setOpenPanel(null)}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-6 text-gray-600 text-center">
                  No se encontraron facturas.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {invoicesData.length === 0 && (
          <p className="p-6 text-gray-600">No se encontraron facturas.</p>
        )}
      </div>
      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListInvoiceComponent;
