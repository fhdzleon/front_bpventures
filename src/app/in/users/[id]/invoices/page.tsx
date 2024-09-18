"use client";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";

const InvoicesByUser = ({params }: {params: { id: number }}) => {
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>("");
  const { userData, loading, fetchAgain } = useAuth();


  const { id } = params;
  const fetchInvoices = async () => {
    try {
      // if (!loading) {
      const response = await getUserById(id);
      setInvoicesData(response.invoices);
      setUserName(response.Names);
      // }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const titleInvoicesList = `Lista de facturas de: ${userName}`;

  return (
    <>
      {/* <pre>{JSON.stringify(userName, null, 2)}</pre> */}
      <div className="m-4">
      <ListInvoiceComponent isAdmin={false} invoicesData={invoicesData} titleInvoicesList={titleInvoicesList} />
      </div>
    </>
  );
};

export default InvoicesByUser;
