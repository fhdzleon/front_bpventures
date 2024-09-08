// import React from "react";

// import InvoiceDetail from "../../../../components/DetailInvoice/DetailInvoice";
// import { GetInvoices } from "@/helpers/auth.helper";
// import { useAuth } from "@/context/AuthContext";

// export interface Invoice {
//   id: number;
//   amount: number;
//   invoiceStatusId: number;
//   issueDate: string; 
//   userId: number;
// }

// interface IdParams {
//   params: {
//     id: string; 
//   };
// }
// const { userData } = useAuth();
// const DetailUser: React.FC<IdParams> = async ({ params }) => {


//   const idUser = Number(params.id);
//   const Invoices = await GetInvoices(userData.id);


//   const oneinvoice = Invoices.find((invoice: {id:number}) => invoice.id === idUser);

//   return Invoices ? (
//     <InvoiceDetail Invoice={oneinvoice} />
//   ) : (
//     <div className="mt-10 flex flex-col justify-center text-center items-center">
//       <h1 className="text-3xl font-bold mt-20 justify-center text-center text-amber-400 mb-4">
//         Factura NO ENCONTRADA
//       </h1>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/132/132244.png"
//         alt="No Encontrado"
//         className="max-w-sm"
//       />
//     </div>
//   );
// };

// export default DetailUser;
'use client'

import React, { ReactNode, useEffect, useState } from "react";
import InvoiceDetail from "../../../../components/DetailInvoice/DetailInvoice";
import { getInvoicesById } from "@/helpers/auth.helper";
import { useAuth } from "@/context/AuthContext";

export interface Invoice {
  invoicePath: any;
  invoiceDueDate: ReactNode;
  invoiceIssueDate: ReactNode;
  invoiceAmount: ReactNode;
  invoiceNumber: ReactNode;
  id: number;
  amount: number;
  invoiceStatusId: number;
  issueDate: string; 
  userId: number;
}

interface IdParams {
  params: {
    id: string; 
  };
}

const DetailUser: React.FC<IdParams> = ({ params }) => {
  const { userData } = useAuth();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userData) return; 
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const idUser = Number(params.id);
        const invoices = await getInvoicesById(userData.id);

        const oneinvoice = invoices.find((invoice: { id: number; }) => invoice.id === idUser);
        setInvoice(oneinvoice || null);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setInvoice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [params.id, userData]); // Ahora userData es la dependencia

  if (loading) {
    return <div className="bg-[#2B4168] mb-5 text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex">Cargando...</div>;
  }

  return invoice ? (
    //TODO: to be improve types
    <InvoiceDetail Invoice={invoice} />
  ) : (
    <div className="mt-10 flex flex-col justify-center text-center items-center">
      <h1 className="text-3xl font-bold mt-20 justify-center text-center text-amber-400 mb-4">
        Factura NO ENCONTRADA
      </h1>
      <img
        src="https://cdn-icons-png.flaticon.com/512/132/132244.png"
        alt="No Encontrado"
        className="max-w-sm"
      />
    </div>
  );
};

export default DetailUser;
