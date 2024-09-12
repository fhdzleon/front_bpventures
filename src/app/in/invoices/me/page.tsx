"use client";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices, getUserById } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";

const BillingTable = () => {
  // const [invoicesAdmin, setInvoicesAdmin] = useState<any[]>([{}]);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);

  const [invoicesData2, setInvoicesData2] = useState([]);
  const { userData, loading, fetchAgain } = useAuth();

  const fetchInvoices = async () => {
    try {
      if (!loading) {
        const response = await getUserById(userData?.id);
        console.log(response);

        // const response = await getUserById(3);
        setInvoicesData(response.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  const fetchInvoices2 = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/invoices/user/${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setInvoicesData2(data);
    } catch (error) {
      console.log("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    if(userData?.isAdmin) fetchInvoices();

    if(!userData?.isAdmin) fetchInvoices2();

  }, [fetchAgain, userData?.id]);
  
  
  console.log(invoicesData);
  console.log(invoicesData2);

  const titleInvoicesList = `Lista de Facturas de: ${userData?.Names}`;

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
        invoicesData={userData?.isAdmin ?  invoicesData: invoicesData2}
        isAdmin={false}
        userEmail={userData?.email}
        titleInvoicesList={titleInvoicesList}
      />
    </>
  );
};

export default BillingTable;
