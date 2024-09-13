"use client";

import React from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";
import DeleteIcon from "../../../../components/icons/DeleteIcon";

const DeleteCompany = ({ id, fetchCompanies }: { id: number; fetchCompanies: () => void }) => {
  // const { id } = useParams(); // Obtener el ID de la empresa
  const token = Cookies.get("token");
  const router = useRouter();

  const handleClick = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de eliminar esta empresa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2b4168",
      cancelButtonColor: "#5eba98",
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json(); // Capturamos el mensaje de error del backend
            throw new Error(errorData.message || "No se logró borrar la empresa");
          }

          fetchCompanies();
          Swal.fire({
            title: "¡Eliminado!",
            text: "La empresa ha sido eliminada.",
            icon: "success",
            confirmButtonColor: "#2b4168",
          }).finally(() => router.push(PATHROUTES.DELETE_COMPANY));
        } catch (error: any) {
          console.error("Hubo un problema con la petición", error);

          // Mostramos el mensaje de error proveniente del backend
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="size-8 hover:scale-125 hover:text-red-500 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <title>Eliminar Empresa</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default DeleteCompany;
