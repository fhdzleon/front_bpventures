"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Usar Link para navegación en Next.js
import { Toaster, toast } from "sonner";

interface Company {
  id: number;
  name: string;
  cuit: string;
  address: string;
}

const CompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener las empresas desde el backend
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
        setLoading(false);
      } else {
        toast.error('Error al cargar las empresas');
      }
    } catch (error: any) {
      console.error("Error al obtener empresas", error);
      toast.error('Error al cargar las empresas');
    }
  };

  // Función para eliminar una empresa
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Empresa eliminada correctamente');
        // Refrescar la lista de empresas
        fetchCompanies();
      } else {
        toast.error('Error al eliminar la empresa');
      }
    } catch (error: any) {
      console.error("Error al eliminar empresa", error);
      toast.error('Error al eliminar la empresa');
    }
  };

  // Llama a la función de fetch al cargar el componente
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-[1.2rem] mb-6">Lista de Empresas</h1>
        {loading ? (
          <p className="text-center">Cargando empresas...</p>
        ) : (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Razón Social</th>
                <th className="border px-4 py-2">CUIT</th>
                <th className="border px-4 py-2">Dirección</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company.id}>
                    <td className="border px-4 py-2">{company.id}</td>
                    <td className="border px-4 py-2">{company.name}</td>
                    <td className="border px-4 py-2">{company.cuit}</td>
                    <td className="border px-4 py-2">{company.address}</td>
                    <td className="border px-4 py-2">
                      <Link href={`/in/company/${company.id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Ver Detalles</button>
                      </Link>
                      <Link href={`/in/company/edit/${company.id}`}>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
                            handleDelete(company.id);
                          }
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">No hay empresas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CompanyTable;
