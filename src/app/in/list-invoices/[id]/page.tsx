import React from "react";

import InvoiceDetail from "../../../../components/DetailInvoice/DetailInvoice";
const UsersData = [{
    id: 1,
    amount: 150.0,
    invoiceStatusId: 3,
    issueDate: "2024-08-01",
    userId: 101,
  },
  {
    id: 2,
    amount: 300.5,
    invoiceStatusId: 2,
    issueDate: "2024-08-10",
    userId: 102,
  },
  {
    id: 3,
    amount: 75.2,
    invoiceStatusId: 1,
    issueDate: "2024-08-15",
    userId: 103,
  },
  {
    id: 4,
    amount: 200.0,
    invoiceStatusId: 2,
    issueDate: "2024-08-20",
    userId: 104,
  },
  {
    id: 5,
    amount: 50.0,
    invoiceStatusId: 1,
    issueDate: "2024-08-25",
    userId: 105,
  },
];
export interface Invoice {
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
  const idUser = Number(params.id);


  const Invoices: Invoice[] = UsersData;


  const oneinvoice = Invoices.find((invoice) => invoice.id === idUser);

  return Invoices ? (
    <InvoiceDetail Invoice={oneinvoice} />
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

