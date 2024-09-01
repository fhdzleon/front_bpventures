import Link from "next/link";
import React from "react";

export interface Invoice {
  id: number;
  amount: number;
  invoiceStatusId: number;
  issueDate: string;
  userId: number;
}

interface InvoiceDetailProps {
  Invoice: Invoice;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ Invoice }) => {

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
    <section className="mb-12 p-4 bg-white rounded-xl shadow-lg m-4">
      <Link href="/in/list-invoices">
        <button className="bg-[#2B4168] mb-5 text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex ">
          Volver
        </button>
      </Link>
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#2B4168] mb-4">Información de Facturación</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-bold text-gray-700">Monto:</span> {"$" + Invoice.amount}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">Fecha de Emisión:</span> {Invoice.issueDate}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">Estado:</span> {getInvoiceStatus(Invoice.invoiceStatusId)}
          </p>
        </div>
      </div>
    </section>
  );
};



export default InvoiceDetail;
