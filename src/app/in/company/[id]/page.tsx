// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Toaster, toast } from "sonner";

// interface Company {
//   id: number;
//   name: string;
//   cuit: string;
//   address: string;
// }

// interface IdParams {
//   params: {
//     id: string;
//   };
// }

// const CompanyDetails: React.FC<IdParams> = ({ params }) => {
//   const [company, setCompany] = useState<Company | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();
//   const { id } = params;

//   // Función para obtener los detalles de una empresa por ID
//   const fetchCompanyDetails = async (id: string) => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`);
//       if (response.ok) {
//         const data = await response.json();
//         setCompany(data);
//         setLoading(false);
//       } else {
//         toast.error('Error al cargar los detalles de la empresa');
//       }
//     } catch (error: any) {
//       console.error("Error al obtener detalles de la empresa", error);
//       toast.error('Error al cargar los detalles');
//     }
//   };

//   // Llama a la función para obtener los detalles al cargar el componente
//   useEffect(() => {
//     if (id) {
//       fetchCompanyDetails(id);
//     }
//   }, [id]);

//   if (loading) {
//     return <p>Cargando detalles...</p>;
//   }

//   if (!company) {
//     return <p>No se encontraron detalles de la empresa.</p>;
//   }

//   return (
//     <div className="flex justify-center items-center w-full min-h-screen">
//       <Toaster richColors />
//       <div className="w-full max-w-2xl">
//         <h1 className="text-center text-[1.5rem] mb-6">Detalles de Empresa</h1>
//         <p><strong>ID:</strong> {company.id}</p>
//         <p><strong>Razón Social:</strong> {company.name}</p>
//         <p><strong>CUIT:</strong> {company.cuit}</p>
//         <p><strong>Dirección:</strong> {company.address}</p>
//         <button
//           onClick={() => router.back()}
//           className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
//         >
//           Volver
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompanyDetails;

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
    <div className="m-3 max-w-4xl mx-auto p-8 bg-gray-100 shadow-xl rounded-xl font-sans">
      <Toaster richColors />

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#2B4168] border-[#2B4168] pb-2">Detalles de la Empresa</h1>
          {/* <BackButton /> */}
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

      {/* <button
        onClick={() => router.back()}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Volver
      </button> */}
      <button onClick={() => router.back()} 
      className="bg-[#2B4168] text-white mt-1 py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center">
        Volver
      </button>
    </div>
  );
};

export default CompanyDetails;
