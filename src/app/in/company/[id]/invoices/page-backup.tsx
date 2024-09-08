// app/in/company/[id]/invoices/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "sonner";

interface Invoice {
  id: number;
  number: string;
  path: string;
  issueDate: string;
  dueDate: string;
  amount: string;
}

interface IdParams {
  params: {
    id: string;
  };
}

const ListInvoicesByCompany: React.FC<IdParams> = ({ params }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const companyId = parseInt(params.id);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setInvoices(data.invoices);
          setLoading(false);
        } else {
          toast.error('Error al cargar las facturas');
        }
      } catch (error: any) {
        console.error("Error al obtener facturas", error);
        toast.error('Error al cargar las facturas');
      }
    };

    fetchInvoices();
  }, [companyId]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-[1.2rem] mb-6">Facturas de la Empresa</h1>
        {loading ? (
          <p className="text-center">Cargando facturas...</p>
        ) : (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Número</th>
                <th className="border px-4 py-2">Ruta</th>
                <th className="border px-4 py-2">Fecha de Emisión</th>
                <th className="border px-4 py-2">Fecha de Vencimiento</th>
                <th className="border px-4 py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="border px-4 py-2">{invoice.id}</td>
                    <td className="border px-4 py-2">{invoice.number}</td>
                    <td className="border px-4 py-2">{invoice.path}</td>
                    <td className="border px-4 py-2">{new Date(invoice.issueDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{invoice.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">No hay facturas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListInvoicesByCompany;
