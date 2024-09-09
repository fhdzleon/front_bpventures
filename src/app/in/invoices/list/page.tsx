"use client";
import BillingTableComponent from "@/components/List-Invoice/List-Invoice";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";

const BillingTable = () => {
  // const [invoicesAdmin, setInvoicesAdmin] = useState<any[]>([{}]);
  const [invoicesData, setInvoicesData] = useState<any[]>([
    {
      id: 1,
      number: "INV-0001",
      path: "path/to/invoice1.pdf",
      issueDate: "2023-12-31",
      dueDate: "2024-01-31",
      amount: "100.00",
      user: {
        id: 1,
        email: "user1@example.com",
        isAdmin: true,
      },
      invoiceStatus: {
        name: "Pending",
      },
      company: {
        name: "Company1",
      },
    },
  ]);
  const { userData, loading, fetchAgain } = useAuth();

  const fetchInvoices = async () => {
    try {
      // if (!loading) {
      const response = await getAllInvoices();
      setInvoicesData(response);
      // }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchInvoices();
    }
  }, [loading, fetchAgain]);

  return (
    <>
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Lista de Facturas
      </h1>
      <pre>{JSON.stringify(userData?.isAdmin, null, 2)}</pre>
      {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
      <ListInvoiceComponent invoicesData={invoicesData} isAdmin={true} />
    </>
  );
};

export default BillingTable;
