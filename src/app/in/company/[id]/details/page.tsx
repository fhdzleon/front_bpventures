"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";
import Link from "next/link";
import Swal from 'sweetalert2';
import '../../../../../styles/style.css';

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
        customClass: {
          confirmButton: 'custom-ok-button',
        },
      });
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
    <div className="m-3 max-w-4xl mx-auto p-8  rounded-xl font-sans">

      <button
        onClick={() => router.back()}
        className="bg-[#2B4168] text-white mt-5 mb-5 py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center"
      >
        Volver
      </button>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#2B4168] border-[#2B4168] pb-2">Detalles de la Empresa</h1>
        </div>
      </section>

      <div className="bg-gradient-to-br bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-futura text-[#2B4168] mb-8">Información de la Empresa</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-lg">
              <strong className="font-futura">ID de Empresa:</strong> {company.id}
            </p>
            <p className="text-lg">
              <strong className="font-futura">Razón Social:</strong> {company.name}
            </p>
            <p className="text-lg">
              <strong className="font-futura">CUIT:</strong> {company.cuit}
            </p>
            <p className="text-lg">
              <strong className="font-futura">Dirección:</strong> {company.address}
            </p>
          </div>
        </div>
      </div>

      <section className=" bg-gradient-to-br  bg-white p-8 rounded-lg shadow-lg">
        <h2 className=" mt-19 text-3xl  text-left font-futura text-[#2B4168] ">Información de Facturación</h2>
        <div className="flex">
          <Link href={`/in/company/${company.id}/invoices`}>
            <button className="flex m-8  text-white font-futura  p-2 rounded-full bg-[#2B4168] hover:bg-acent ">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto hover:text-acent">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              Ver Facturas
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CompanyDetails;
