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
        throw new Error("Failed to send emails");
      }

      // Mostrar SweetAlert2 al éxito
      Swal.fire({
        icon: 'success',
        title: 'Emails sent successfully!',
        text: 'All due soon invoices have been notified.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error sending emails:", error);

      // Mostrar SweetAlert2 en caso de error
      Swal.fire({
        icon: 'error',
        title: 'Failed to send emails',
        text: 'There was an error sending the emails. Please try again later.',
        confirmButtonText: 'OK',
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
      {loading ? "Sending..." : text}
    </button>
  );
};

export default ButtonSendEmail;
