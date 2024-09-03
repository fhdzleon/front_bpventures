import Link from "next/link";
import React from "react";

export interface Invoice {
id: number,
invoicePath: null,
invoiceNumber: string,
invoiceIssueDate: string,
invoiceDueDate: string,
invoiceAmount: string,
invoiceStatus: string,
overdueIndicator: boolean
}

interface InvoiceDetailProps {
  Invoice: Invoice;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ Invoice }: { Invoice: Invoice}) => {

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

  return (
    <section className="mb-12 p-4 bg-white rounded-xl shadow-lg m-4">
    
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#2B4168] mb-4">Información de Facturación</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-bold text-gray-700">Monto:</span> {"$" + Invoice.invoiceAmount}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">Fecha de Emisión:</span> {Invoice.invoiceIssueDate}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">Fecha de Emisión:</span> {Invoice.invoiceDueDate}
          </p>
          <p className="text-lg">
            <span className="font-bold text-gray-700">Estado:</span> {getInvoiceStatus(Invoice.invoiceStatus)}
          </p>
        </div>
      </div>
    </section>
  );
};



export default InvoiceDetail;
