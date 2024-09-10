"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Toaster, toast } from "sonner";
import { PATHROUTES } from '@/helpers/pathRoutes';

  import FilterInput from '@/components/Search/Search'; 
import { ButtonAdd } from '@/components/Buttons/ButtonAdd';
interface Company {
  id: number;
  name: string;
  cuit: string;
  address: string;
}

const CompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filter, setFilter] = useState(''); 
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
 
  const itemsPerPage = 5; 



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

 


  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Empresa eliminada correctamente');
        fetchCompanies();
      } else {
        toast.error('Error al eliminar la empresa');
      }
    } catch (error: any) {
      console.error("Error al eliminar empresa", error);
      toast.error('Error al eliminar la empresa');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  
  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
    <div className="container mx-auto px-6 w-4/5 font-futura">
      <ButtonAdd children="Agregar empresa" hrefString="/in/company/create" />

      <Toaster richColors />
      <h1 className="text-4xl font-futura mb-6 text-secundary">
        Lista de Empresas
      </h1>
      <FilterInput filter={filter} onFilterChange={setFilter} />

      {loading ? (
        <p className="text-center">Cargando empresas...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-secundary font-futura text-white">
              <tr>
                <th className="py-3 px-6 font-futura text-left text-lg">ID</th>
                <th className="py-3 px-6 font-futura text-left text-lg">Razón Social</th>
                <th className="py-3 px-6 font-futura text-left text-lg">CUIT</th>
                <th className="py-3 px-6 font-futura text-left text-lg">Dirección</th>
                <th className="py-3 px-6 font-futura text-left text-lg">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredCompanies.length > 0 ? (
        filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6 font-futura text-sm text-gray-900">
                      {company.id}
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-900" >
                    <Link href={`/in/company/${company.id}`}>
                      {company.name}
                    </Link>
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      {company.cuit}
                    </td>
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      {company.address}
                    </td>

                    {/* <td className="py-4 px-6 font-futura text-sm text-gray-700"> */}
                    <td className="py-4 px-6 font-futura text-sm text-gray-700">
                      <div className="flex space-x-2">

                        <Link href={`/in/company/${company.id}/details`}>
                          {/* <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Ver Detalles</button> */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor"
                            className="size-8 hover:scale-125 hover:text-blue-700 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "

                          >
                            <title>Ver Detalles</title>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </Link>

                        <Link href={`/in/company/${company.id}/edit`}>
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                              stroke-width="1.5" stroke="currentColor"
                              className="size-8 hover:scale-125 hover:text-blue-700 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "

                            >
                              <title>Editar Empresa</title>
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          {/* <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button> */}
                        </Link>


                        <Link href={`/in/company/${company.id}/users`}>
                          {/* <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Ver Usuarios</button> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-8 hover:scale-125 hover:text-blue-700 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
                          >
                            <title>Ver Usuarios</title>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                            />
                          </svg>
                        </Link>

                        <Link href={`/in/company/${company.id}/invoices`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-8 hover:scale-125 hover:text-green-500 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "

                          >
                            <title>Facturación</title>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                            />
                          </svg>
                          {/* <button className="bg-purple-500 text-white px-2 py-1 rounded mr-2">Ver Facturas</button> */}
                        </Link>


                        <button
                          onClick={() => {
                            if (confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
                              handleDelete(company.id);
                            }
                          }}
                          // className=" text-secundary hover:text-red-500 px-2 py-1 rounded flex justify-center items-center"
                          className="size-8 hover:scale-125 hover:text-red-500 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "

                        >

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <title>Eliminar Empresa</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>


                      </div>
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
        


     
      
   
 </div>

 
      )}
   <div className=" flex justify-between mt-4 ">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-200 text-black rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Anterior
            </button>
            <p className="text-sm">
              Página {currentPage} de {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-gray-200 text-black rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Siguiente
            </button>
          </div>
  </div>
   
   </div>
   
  );
};

export default CompanyTable;
