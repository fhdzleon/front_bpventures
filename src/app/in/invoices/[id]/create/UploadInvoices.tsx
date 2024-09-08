import UpdateInvoiceComponent from "@/components/invoice/UpdateInvoiceComponent";
import UploadInvoiceComponent from "@/components/invoice/UploadInvoiceComponet";
// import {UploadInvoiceComponet} from "@/components/invoice/UploadInvoiceComponet";
import {VoucherUpload} from "@/components/invoice/VoucherUpload";
import React from "react";

interface IdParams {
  params: {
    id: number; 
  };
}
export const UploadInvoices: React.FC <IdParams> = ({ params }) => {
  return (
    <div className="container mx-auto py-6 w-4/5 font-futura">
      <h1 className="text-4xl font-futura  text-secundary">Cargar Facturas</h1>
      <UploadInvoiceComponent userId={params?.id} />
      {/* <VoucherUpload /> */}
    </div>
  );
};

export default UploadInvoices;
