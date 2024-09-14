"use client";
import { ButtonAdd } from "@/components/Buttons/ButtonAdd";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";

const BillingTable = () => {
  const [invoicesData, setInvoicesData] = useState<any[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<string>(""); // Estado para la empresa seleccionada
  const { userData, loading, fetchAgain } = useAuth();

  const fetchInvoices = async () => {
    try {
      const response = await getAllInvoices();
      setInvoicesData(response);
      // alert("Invoices fetched successfully");
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchInvoices();
    }
  }, [loading, fetchAgain]);

  const titleInvoicesList = `Lista de facturas para ${selectedCompany || "todas las empresas"}`;

  // Obtener la lista de empresas únicas
  const companies = Array.from(new Set(invoicesData.map((invoice) => invoice?.company?.name)));

  // Filtrar facturas según la empresa seleccionada
  const filteredInvoices = selectedCompany ? invoicesData.filter((invoice) => invoice.company.name === selectedCompany) : invoicesData;

  return (
    <>
      <div className="m-5  bg-white">
        <h1 className="text-4xl font-futura text-secondary">{titleInvoicesList}</h1>

        <div className="flex justify-between items-center ">
          <ButtonAdd children="Agregar Factura" hrefString="/in/invoices/create" />

          <select
            id="companySelect"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <option value="">Todas las empresas</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de facturas filtradas */}
      <ListInvoiceComponent invoicesData={filteredInvoices} isAdmin={true} fetchInvoices={fetchInvoices} />
    </>
  );
};

export default BillingTable;
