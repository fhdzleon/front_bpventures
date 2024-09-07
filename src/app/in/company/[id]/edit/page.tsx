"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "sonner";

interface Company {
  name: string;
  cuit: string;
  address: string;
}

interface IdParams {
  params: {
    id: string;
  };
}

const EditCompany: React.FC<IdParams> = ({ params }) => {
  const [company, setCompany] = useState<Company>({
    name: '',
    cuit: '',
    address: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = params;

  // Función para obtener los detalles de la empresa por ID
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

  // Función para actualizar los detalles de la empresa
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      if (response.ok) {
        toast.success('Empresa actualizada correctamente');
        router.push(`/in/company/${id}`); // Navegar de nuevo a los detalles
      } else {
        toast.error('Error al actualizar la empresa');
      }
    } catch (error: any) {
      console.error("Error al actualizar empresa", error);
      toast.error('Error al actualizar la empresa');
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompanyDetails(id);
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />
      <form className="w-full max-w-2xl" onSubmit={handleUpdate}>
        <h1 className="text-center text-[1.5rem] mb-6">Editar Empresa</h1>

        <div className="mb-4">
          <label className="block">Razón Social:</label>
          <input
            type="text"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">CUIT:</label>
          <input
            type="text"
            value={company.cuit}
            onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">Dirección:</label>
          <input
            type="text"
            value={company.address}
            onChange={(e) => setCompany({ ...company, address: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Actualizar Empresa
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
