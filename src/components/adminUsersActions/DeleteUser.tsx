"use client";

import React from "react";
import { useParams } from "next/navigation";

const DeleteUser = () => {
  const { id } = useParams();

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/status/${id}/3`,
        {
          method: "PUT",
          headers: {
            "content-type": "applicatio/json",
            /* Authorization: `Bearer ${token}`, */ //!<-- ACCEDER AL TOKEN
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se logro borrar el usuario");
      }
      const data = (await response).json();
    } catch (error) {
      console.error("Hubo un problema con la peticion");
    }
    alert("Borrado");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex space-x-2 bg-secundary px-4 py-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-5 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>

        <p className="font-futura text-white">Eliminar</p>
      </button>
    </div>
  );
};

export default DeleteUser;