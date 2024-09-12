"use client";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import ButtonUploadInvoice from "@/components/invoice/ButtonUploadInvoices";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices, getUserById } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IdParams {
  params: {
    id: string;
  };
}

const BillingTable: React.FC<IdParams> = ({ params }) => {
  const [invoicesData, setInvoicesData] = useState<any[]>([{}]);
  const { userData, loading, fetchAgain } = useAuth();
  const [companyName, setCompanyName] = useState<string>("");
  const companyId = parseInt(params.id);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`
        );
        if (response.ok) {
          const data = await response.json();
          setInvoicesData(data.invoices);
          setCompanyName(data.name);
          // setLoading(false);
        } else {
          toast.error("Error al cargar los usuarios");
        }
      } catch (error: any) {
        console.error("Error al obtener usuarios", error);
        toast.error("Error al cargar los usuarios");
      }
    };

    fetchUsers();
  }, [companyId]);

  const titleInvoicesList = `Lista de Facturas de: ${companyName}`

  return (
    <>
       <button
        onClick={() => window.history.back()} // Alternativa usando window.history.back()
        className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 mb-4"
      >
        Volver
      </button>
     {/* <button
        onClick={() => router.back()} // Uso correcto de router.back()
        className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 mb-4"
      >
        Volver
      </button> */}
      {/* <pre>{JSON.stringify(invoicesData, null, 2)}</pre> */}
      <ListInvoiceComponent
        invoicesData={invoicesData}
        isAdmin={false}
        companyName={companyName}
        titleInvoicesList={titleInvoicesList}
      />
    </>
  );
};

export default BillingTable;
