"use client";

import { ButtonAdd } from "@/components/Buttons/ButtonAdd";
import ListInvoiceComponent from "@/components/List-Invoice/ListInvoiceComponent";
import FilterInput from "@/components/Search/Search";
import { useAuth } from "@/context/AuthContext";
import { getAllInvoices } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";

const BillingTable = () => {
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const { userData, loading, fetchAgain } = useAuth();
  const [filter, setFilter] = useState("");

  const fetchInvoices = async () => {
    try {
      const response = await getAllInvoices();
      setInvoicesData(response);
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
  const companies = Array.from(new Set(invoicesData.map((invoice) => invoice?.company?.name)));

  // Filtrar facturas según la empresa seleccionada y el término de búsqueda
  const filteredInvoices = invoicesData
    .filter((invoice) => (selectedCompany ? invoice.company.name === selectedCompany : true))
    .filter((invoice) => invoice.number && typeof invoice.number === "string"
      ? invoice.number.toLowerCase().includes(filter.toLowerCase())
      : false);

  return (
    <div className="m-5 max-h-screen mt-5 rounded-lg">
      <pre>{JSON.stringify(invoicesData, null, 2)}</pre>
      <h1 className="text-4xl font-futura mb-6 text-secundary">{titleInvoicesList}</h1>

      <div className="flex items-center mb-4 space-x-4">
        <FilterInput filter={filter} onFilterChange={setFilter} />

        <select id="companySelect" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="py-2 font-sans h-12 text-secundary  rounded-xl  px-4">
          <option value="">Todas las empresas</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>

        <ButtonAdd children="Agregar Factura" hrefString="/in/invoices/create" />
      </div>

      {/* Lista de facturas filtradas */}
      <ListInvoiceComponent 
      invoicesData={filteredInvoices} isAdmin={true} fetchInvoices={fetchInvoices} />
    </div>
  );
};

export default BillingTable;
