"use client";
import BillingTableComponent from "@/components/List-Invoice/List-Invoice";
import ListInvoiceById from "@/components/List-Invoice/ListInvoiceById";
import { useAuth } from "@/context/AuthContext-1";

const BillingTable = () => {
  const { userData } = useAuth();
  return (
    <>
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Lista de Facturas: {userData?.Names}
      </h1>
      <ListInvoiceById id={userData?.id} />
    </>
  );
};

export default BillingTable;
