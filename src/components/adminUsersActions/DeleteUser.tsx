"use client";

import React from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";
import DeleteIcon from "../icons/DeleteIcon";

const DeleteUser = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const router = useRouter();

  const handleClick = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estas a punto de eliminar a este usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2b4168",
      cancelButtonColor: "#5eba98",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/status/${id}/3`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("No se logró borrar el usuario");
          }

          const data = await response.json();

          Swal.fire({
            title: "Eliminado!",
            text: "El usuario ha sido eliminado.",
            icon: "success",
            confirmButtonColor: "#2b4168",
          }).finally(() => router.push(PATHROUTES.LIST));
        } catch (error) {
          console.error("Hubo un problema con la petición", error);
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el usuario.",
            "error"
          );
        }
      }
    });
  };

  return (
<div>
  <button
    onClick={handleClick}
    className="flex space-x-2 bg-secundary px-4 py-1 rounded-full text-white transition duration-300 hover:bg-red-600"
  >
    <DeleteIcon />
    <p className="font-futura">Eliminar</p>
  </button>
</div>
  );
  
  
};

export default DeleteUser;
