"use client";

import React from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";

interface DeleteInvoiceProps {
  onClick: () => void;
  id: any; // o el tipo adecuado para `id`
}

const DeleteInvoice: React.FC<DeleteInvoiceProps> = ({ onClick, id }) => {
  const token = Cookies.get("token");
  const router = useRouter();

  const handleClick = async () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Estas a punto de eliminar este archivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2b4168",
      cancelButtonColor: "#5eba98",
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/invoices/${id}`,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          
          if (!response.ok) {
            throw new Error("No se logro borrar el archivo");
          }

          const data = await response.json();
          console.log(data);
          
          Swal.fire({
            title: "Eliminado",
            text: "La factura a sido eliminado",
            icon: "success",
            confirmButtonColor: "#2b4168",
          });

        } catch (error) {
          console.error("hubo un problema con la peticion, error");
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el archivo",
            "error"
          );
        }
      }
    });
  };

  return (
    <button onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 mx-auto hover:text-acent"
      >
        <title>Eliminar Factura</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  );
};

export default DeleteInvoice;
