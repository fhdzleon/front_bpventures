import UploadInvoices from "@/components/invoice/UploadInvoices";
import React from "react";

const Deliverables = () => {
  return (
    <div className="container mx-auto py-6 w-4/5 font-futura">
      <h1 className="text-4xl font-futura  text-secundary">Mis Archivos</h1>
      <UploadInvoices />
    </div>
  );
};

export default UploadInvoices;
