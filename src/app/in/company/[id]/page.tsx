"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "sonner";

interface Company {
  id: number;
  name: string;
  cuit: string;
  address: string;
}

interface IdParams {
  params: {
    id: string;
  };
}

const CompanyDetails: React.FC<IdParams> = ({ params }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = params;

  // Función para obtener los detalles de una empresa por ID
  const fetchCompanyDetails = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
        setLoading(false);
      } else {
        toast.error('Error al cargar los detalles de la empresa');
      }
    } catch (error: any) {
      console.error("Error al obtener detalles de la empresa", error);
      toast.error('Error al cargar los detalles');
    }
  };

  // Llama a la función para obtener los detalles al cargar el componente
  useEffect(() => {
    if (id) {
      fetchCompanyDetails(id);
    }
  }, [id]);

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (!company) {
    return <p>No se encontraron detalles de la empresa.</p>;
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-[1.5rem] mb-6">Detalles de Empresa</h1>
        <p><strong>ID:</strong> {company.id}</p>
        <p><strong>Razón Social:</strong> {company.name}</p>
        <p><strong>CUIT:</strong> {company.cuit}</p>
        <p><strong>Dirección:</strong> {company.address}</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
