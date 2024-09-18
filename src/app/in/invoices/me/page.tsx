"use client";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices, getUserById } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";
const BillingTable = () => {
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [invoicesData2, setInvoicesData2] = useState<any[]>([]);
  const { userData, loading, fetchAgain } = useAuth();

  const fetchInvoicesAdmin = async () => {
    try {
      if (userData?.id) {
        const response = await getUserById(userData.id);
        setInvoicesData(response.invoices);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  const fetchInvoicesClient = async () => {
    try {
      if (userData?.id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/invoices/user/${userData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setInvoicesData2(data);
      }
    } catch (error) {
      console.log("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      if (userData.isAdmin) {
        fetchInvoicesAdmin();
      } else {
        fetchInvoicesClient();
      }
    }
  }, [fetchAgain, userData?.id]);

  const titleInvoicesList = `Lista de Facturas de ${userData?.Names || 'Usuario'}`;

  return (
    <div className="m-5 max-h-screen mt-5 rounded-lg">
    {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
    {/* <pre>{JSON.stringify(invoicesData2, null, 2)}</pre> */}
      <ListInvoiceComponent
        invoicesData={invoicesData2 }
        isAdmin={ false}
        // userEmail={userData?.email || ''}
        titleInvoicesList={titleInvoicesList}
        fetchInvoices={fetchInvoicesClient}
      />
    </div>
  );
};

export default BillingTable;
