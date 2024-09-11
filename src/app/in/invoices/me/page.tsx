"use client";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices, getUserById } from "@/helpers/auth.helper";
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
      if (!loading) {
        const response = await getUserById(userData.id);
        // const response = await getUserById(3);
        setInvoicesData(response.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [fetchAgain, userData?.id]);

  const titleInvoicesList = `Lista de Facturas de: ${userData?.Names}`

  return (
    <>
      {/* <h1 className="text-4xl font-futura mb-6 text-secundary">Lista de Facturas: {userData?.Names}</h1> */}
      {/* ButtonUploadInvoice */}

      {/* <p>boton de prueba</p> */}
      {/* <pre>{JSON.stringify(userData?.id, null, 2)}</pre> */}
      {/* <ButtonUploadInvoice userId={userData?.id} /> */}

      {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
      <ListInvoiceComponent
        invoicesData={invoicesData}
        isAdmin={false}
        userEmail={userData?.email}
        titleInvoicesList={titleInvoicesList}
      />
    </>
  );
};

export default BillingTable;
