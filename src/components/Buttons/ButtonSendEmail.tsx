"use client";
import { useState } from "react";
import Swal from 'sweetalert2';

const ButtonSendEmail = ({ text }: { text: string }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/notify-due-soon`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("No se pudieron enviar correos electrónicos");
      }

      // Mostrar SweetAlert2 al éxito
      Swal.fire({
        icon: 'success',
        title: '¡Correos enviados exitosamente!',
        text: 'Se ha notificado a todas las facturas que están por vencer.',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2b4168",        
      });
    } catch (error) {
      console.error("Error al enviar correos:", error);

      // Mostrar SweetAlert2 en caso de error
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar correos',
        text: 'Hubo un error al enviar los correos. Por favor, inténtalo más tarde.',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2b4168",

      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {loading ? "Enviando..." : text}
    </button>
  );
};

export default ButtonSendEmail;
