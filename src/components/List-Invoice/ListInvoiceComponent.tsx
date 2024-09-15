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
import Notifications from "../ButtonAlerts/ButtonAlerts";
import { useSocket } from "@/context/WebSocket";


const ListInvoiceComponent = ({ invoicesData, isAdmin, companyName, userEmail, titleInvoicesList, fetchInvoices }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceInterface | null>(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(invoicesData.length / itemsPerPage);
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const socket = useSocket();

  const { userData, loading, fetchAgain } = useAuth();

  // useEffect(() => {
  //   // Escuchar el evento de factura pendiente
  //   socket.on("pendingInvoice", (pendingInvoice) => {
  //     alert(`Factura pendiente: ${pendingInvoice.number}, monto: ${pendingInvoice.amount}`);
  //   });

  //   // Escuchar el evento de factura vencida
  //   socket.on("overdueInvoice", (overdueInvoice) => {
  //     alert(`¡Factura vencida!: ${overdueInvoice.number}, monto: ${overdueInvoice.amount}`);
  //   });

  //   // Limpieza al desmontar el componente
  //   return () => {
  //     socket.off("pendingInvoice");
  //     socket.off("overdueInvoice");
  //   };
  // }, [socket]);

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

  const filteredInvoices = invoicesData?.filter((invoice: InvoiceInterface) =>
    invoice.number && typeof invoice.number === "string" ? invoice.number.toLowerCase().includes(filter.toLowerCase()) : false
  );

  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const hasPermission = (invoice: { permissions: any[] }, permission: any) => {
    return invoice.permissions && Array.isArray(invoice.permissions) && invoice.permissions.some((p) => p.permissionType.name === permission);
  };



  return (
    <div className="m-5 max-h-screen  mt-5 rounded-lg">
      {/* <PreloaderLoad/> */}
      {loading && <PreloaderAwait />}
      {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
      {titleInvoicesList && (
        <h1 className="text-4xl font-futura mb-6 text-secundary">{titleInvoicesList}</h1>
      )}
      <FilterInput filter={filter} onFilterChange={setFilter} />
      <div className="overflow-auto mt-4 bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-secundary font-futura text-white">
            <tr>
              <th className="py-3 px-4 font-futura text-left text-lg"> Factura</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Monto</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Estado</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Emisión</th>
              <th className="py-3 px-4 font-futura text-left text-lg">Vencimiento</th>

              {!companyName && (
                <>
                  <th className="py-3 px-4 font-futura text-left text-lg">Empresa</th>
                </>
              )}
              {/* {isAdmin && (
                <>
                  <th className="py-3 px-4 font-futura text-left text-lg">
                    Usuario
                  </th>
                </>
              )} */}
              <th className="py-3 px-4 font-futura text-left text-lg">Acciones</th>
              <th className={`py-3 px-4 font-futura text-left text-lg ${userData?.isAdmin ? "" : "bg-secondary text-transparent"}`}>{userData?.isAdmin ? "Permisos" : ""}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentInvoices.length > 0 ? (
              currentInvoices.map((invoice: InvoiceInterface) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 font-futura text-sm text-gray-900">{invoice.number}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">${invoice.amount}</td>
                  <td className={`py-4 px-6 font-futura text-sm ${getStatusColor(invoice.invoiceStatus?.id)}`}>{invoice.invoiceStatus?.name}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.issueDate}</td>
                  <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.dueDate}</td>
                  {!companyName && (
                    <>
                      <td className="py-4 px-6 font-futura text-sm text-gray-700">{invoice.company?.name}</td>
                    </>
                  )}
                  {/* {isAdmin && (
                    <>
                      <td className="py-4 px-6 font-futura text-sm text-gray-700">
                        {invoice.user?.email}
                      </td>
                    </>
                  )} */}
                  <td className="py-4 px-6 font-futura text-sm text-gray-700 flex space-x-4">
                    <InvoiceDownload userId={userData?.id || ""} invoiceId={invoice.id} />
                    {userData?.isAdmin ? (
                      <button title="vista previa" onClick={() => handleOpenModal(invoice)}>
                        <EyeIcon />
                      </button>
                    ) : (
                      invoice.permissions?.some((p: { permissionType: { name: string } }) => p.permissionType.name === "view") && (
                        <button title="vista previa" onClick={() => handleOpenModal(invoice)}>
                          <EyeIcon />
                        </button>
                      )
                    )}

                    {isModalOpen && selectedInvoice && (
                      <div className="fixed inset-0 flex items-center justify-center bg-secundary z-50" onClick={handleCloseModal}>
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button onClick={handleCloseModal} className="mt-4 bg-secundary text-white px-4 py-2 rounded-full flex ml-auto">
                            Cerrar
                          </button>
                          <InvoiceDetail Invoice={selectedInvoice as InvoiceInterface} />
                        </div>
                      </div>
                    )}

                    <button title="voucher" onClick={() => handleOpenModalVoucher(invoice)}>
                      <VoucherIcon />
                    </button>

                    {isModalOpenVoucher && selectedInvoice && (
                      <div className="fixed inset-0 flex items-center justify-center bg-secundary ml-0 z-50" onClick={handleCloseModalVoucher}>
                        <div
                          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto h-screen"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button onClick={handleCloseModalVoucher} className="mt-4 bg-secundary text-white px-4 py-2 rounded-full flex ml-auto">
                            Cerrar
                          </button>
                          <VoucherUpload Invoice={selectedInvoice as InvoiceInterface} fetchInvoices={fetchInvoices} />
                        </div>
                      </div>
                    )}

                    {userData?.isAdmin ? (
                      // Si es administrador, muestra todas las acciones
                      <>
                        {/* ========== EDITAR ========== */}
                        <a href={`${PATHROUTES.INVOICES}/${invoice.id}/edit`} className="hover:text-acent">
                          <button>
                            <EditIcon />
                          </button>
                        </a>
                        <DeleteInvoice id={invoice.id} />
                      </>
                    ) : (
                      invoice.permissions?.some((p: { permissionType: { name: string } }) => p.permissionType.name === "edit") && (
                        <a href={`${PATHROUTES.INVOICES}/${invoice.id}/edit`} className="hover:text-acent">
                          <button>
                            <EditIcon />
                          </button>
                        </a>
                      )
                    )}
                  </td>{" "}

                  <td className="py-4 px-6 font-futura text-sm text-gray-700 relative">
                    {userData?.isAdmin && (
                      <>
                        <button onClick={() => togglePanel(invoice.id)}
                          className="w-6 h-6 mx-auto hover:text-acent">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            className="size-8 hover:scale-125 hover:text-blue-700 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "

                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128c.332-.183.582-.495.644-.869l.214-1.28Z"
                            />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>

                        </button>
                        {openPanel === invoice.id && ( // Aquí se usa openPanel en lugar de setOpenPanel
                          <PermissionPanel
                            fileId={invoice.id} // Asegúrate de pasar el id correcto
                            closePanel={() => setOpenPanel(null)}
                          />
                        )}
                      </>
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

        {/* {invoicesData.length === 0 && <p className="p-6 text-gray-600">No se encontraron facturas.</p>} */}
      </div>
      {filteredInvoices.length > 0 && (
        <div className="pagination-container flex justify-between items-center mt-4">
          {/* Paginación */}
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50">
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50">
          Siguiente
          </button>
        </div>
      )}

    </div>
  );
};

export default ListInvoiceComponent;
