"use client";
import BillingTableComponent from "@/components/List-Invoice/List-Invoice";
import ListInvoiceAsAdmin from "@/components/List-Invoice/ListInvoiceAsAdmin";

const BillingTable = () => {
  return (
    <>
      <h1 className="text-4xl font-futura mb-6 text-secundary">Lista de Facturas</h1>

      <ListInvoiceAsAdmin />
    </>
  );
};

export default BillingTable;
