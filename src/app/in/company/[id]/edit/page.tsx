"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import Button from '@/components/FormComponent/Button';
import "../../../../../styles/form-style.css";
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los detalles de la empresa',
        });
      }
    } catch (error: any) {
      console.error("Error al obtener detalles de la empresa", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar los detalles',
      });
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
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Empresa actualizada correctamente',
        });
        // router.push(`/in/company/${id}`);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la empresa',
        });
      }
    } catch (error: any) {
      console.error("Error al actualizar empresa", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la empresa',
      });
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
  
    <div className="flex flex-col justify-start items-center w-full min-h-screen">
      {/* <Toaster richColors /> */}
      <button
        onClick={() => router.back()}
        className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 self-start ml-4 mt-4"
      >
        Volver
      </button>

      <form className="form-apply" onSubmit={handleUpdate}>
        <h1 className="text-center text-[1.2rem] mb-6">Editar Empresa</h1>

        <div className="mb-4">
          <label className="label-apply" htmlFor="name">Razón Social:</label>
          <input
            type="text"
            id="name"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="cuit">CUIT:</label>
          <input
            type="text"
            id="cuit"
            value={company.cuit}
            onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            value={company.address}
            onChange={(e) => setCompany({ ...company, address: e.target.value })}
            className="input-apply"
            required
          />
        </div>

        <Button type="submit">Actualizar Empresa</Button>
      </form>

    </div>
  );
};

export default EditCompany;