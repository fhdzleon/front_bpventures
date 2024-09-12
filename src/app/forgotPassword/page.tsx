"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";



const Page: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Obtén el dominio actual
    const domain = window.location.origin;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, domain: domain }), // Envía el dominio junto con el email
      });
      const data = await response.json();
      if (response.ok) {
        setIsModalOpen(true); // Abre el modal si la solicitud fue exitosa
      } else {
        console.error("Failed to reset password");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleRedirect = () => {
    router.push(PATHROUTES.LOGIN);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 hidden md:block justify-center">
        <Image src="/img/fondocombinado.svg" alt="Login Background" layout="fill" objectFit="cover" className="rotate-180" priority />
      </div>
      <section className="relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Image src={"https://i.postimg.cc/htcz7S3y/bp-ventures-color.png"} alt="logo" width={220} height={10} />
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-secundary dark:border-secundary sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Olvidaste tu contraseña?</h1>
            <p className="font-light text-gray-500 dark:text-gray-400">No te preocupes, Ingresa tu correo electrónico para restablecer tu contraseña.</p>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tu Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* <button
                type="submit"
                className=" text-center bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center">

                Reiniciar Contraseña
              </button> */}
              <button
                type="submit"
                className=" text-center bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-xxl hover:bg-[#4a9c80] transition duration-300 flex items-center border border-white dark:border-white dark:bg-primary-600 dark:hover:text-white dark:hover:bg-slate-400 dark:focus:ring-primary-800">
                Reiniciar Contraseña
              </button>

            </form>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-4">Email enviado</h2>
              <p className="mb-4 max-w-[30rem]">
                Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico <b> {email}</b>
                <br />
                <br />
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar el proceso.
              </p>

              <button onClick={handleRedirect} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
