import UpdateInvoiceComponent from "@/components/invoice/UpdateInvoiceComponent";
import {UploadInvoiceComponet} from "@/components/invoice/UploadInvoiceComponet";
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
      <h1 className="text-4xl font-futura  text-secundary">Actualizar Factura</h1>
      {/* <UploadInvoiceComponet userId={params?.id} /> */}
      {/* <VoucherUpload /> */}
      <UpdateInvoiceComponent invoiceId={1} />
      {/* <UpdateInvoiceComponent invoiceId={params.id} /> */}

    </div>
  );
};

export default UploadInvoices;
