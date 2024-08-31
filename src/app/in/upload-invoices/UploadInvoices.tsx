import {UploadInvoiceComponet} from "@/components/invoice/UploadInvoiceComponet";
import React from "react";

export const UploadInvoices = () => {
  return (
    <div className="container mx-auto py-6 w-4/5 font-futura">
      <h1 className="text-4xl font-futura  text-secundary">Mis Facturas</h1>
      <UploadInvoiceComponet />
    </div>
  );
};

export default UploadInvoices;
