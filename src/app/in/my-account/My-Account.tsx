"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useRouter } from "next/navigation";

const MyAccount = () => {
  const { userData } = useAuth();
  const router = useRouter();

  const handleEditUser = () => {
    // Lógica para editar el usuario
    // useRouter().push(`/in/update-user/${userData?.id}`);
    router.push(`/in/update-user/${userData?.id}`);
  };
  return (
    <div className="flex items-start flex-col">
   
      <h2>Mi Cuenta</h2>
<div>
  <h2> Id:{userData?.id}</h2>
  <h2> Email:{userData?.email}</h2>
  <h2>  Nombre:{userData?.Names}</h2>
  <h2> Apellido: {userData?.LastName}</h2>
  <h2> Puesto:{userData?.Position}</h2>
  <h2> Estado:{userData?.statusId}</h2>
</div>
     <button
        className="font-futura bg-[#2B4168] hover:bg-[#1e2a44] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
        type="submit"
        onClick={handleEditUser}
      >
        Editar
      </button>
    </div>
  );
};

export default MyAccount;
