// src/components/DetailInvoice/DetailInvoice.tsx

import React from "react";
import ButtonComponent from "../Buttons/ButtonComponent";

interface InvoiceDetailProps {
  Invoice: InvoiceInterface;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ Invoice }) => {
  const getInvoiceStatus = (invoiceStatus: string) => {
    switch (invoiceStatus.toLowerCase()) {
      case "payed":
        return "Pagado";
      case "pending":
        return "Pendiente";
      case "canceled":
        return "Anulado";
      default:
        return "Estado desconocido";
    }
  };

  const renderInvoiceFile = () => {
    if (!Invoice.path) {
      return <p>No hay archivo asociado.</p>;
    }

    const fileExtension = Invoice.path.split(".").pop()?.toLowerCase();
    const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}/${Invoice.path}`;

    if (fileExtension === "pdf") {
      return (
        <div className="mb-4">
          <strong>Archivo PDF:</strong>
          <iframe
            src={fileUrl}
            title="Factura PDF"
            className="w-full h-96 border-0"
          />
          <span onClick={() => window.open(fileUrl, "_blank")}
            className="mt-5 flex"
          >
            <ButtonComponent text="Ver en Nueva Ventana"  />
          </span>
        </div>
      );
    } else if (
      fileExtension &&
      ["jpg", "jpeg", "png", "gif"].includes(fileExtension)
    ) {
      return (
        <div className="mb-4">
          <strong>Previsualización de Imagen:</strong>
          <img src={fileUrl} alt="Factura" className="mt-2 max-w-full h-auto" />
          <button
            onClick={() => window.open(fileUrl, "_blank")}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Ver en Nueva Ventana
          </button>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <strong>Archivo:</strong>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Descargar archivo
          </a>
          <button
            onClick={() => window.open(fileUrl, "_blank")}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Ver en Nueva Ventana
          </button>
        </div>
      );
    }
  };

  return (
    <section className="mb-12 p-4 bg-white rounded-xl  m-4">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#2B4168] mb-4">
          Información de Facturación
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-bold text-gray-700">Monto:</span>{" "}
            {"$" + Invoice.amount}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">Fecha de Emisión:</span>{" "}
            {Invoice.issueDate}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">
              Fecha de Vencimiento:
            </span>{" "}
            {Invoice.dueDate}
          </p>
          {/* <p className="text-lg">
            <span className="font-bold text-gray-700">Estado:</span>{" "}
            {getInvoiceStatus(Invoice?.invoiceStatus?.name ?? '')}
          </p> */}
          {renderInvoiceFile()}
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
