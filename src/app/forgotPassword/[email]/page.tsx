'use client'

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";

const Page: React.FC = () => {
  const router = useRouter();
  const { email } = useParams();
  const [newPassword, setNewPassword] = useState('');

    console.log(email);
    console.log(newPassword);
    
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?token=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: newPassword })
      });

      console.log(response);
      if (response.ok) {
        
        router.push(PATHROUTES.LOGIN);
      } else {
        console.error('Failed to reset password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const emailNew = atob('am1nZy45NW5AZ21haWwuY29t');

  return (
    <div className="relative">
      <p>{email}</p>
      <div className="absolute inset-0 hidden md:block justify-center">
        <Image
          src="/img/fondocombinado.svg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="rotate-180"
          priority
        />
      </div>
      <section className="relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Image
            src="https://i.postimg.cc/htcz7S3y/bp-ventures-color.png"
            alt="logo"
            width={220}
            height={10}
          />
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-secundary dark:border-secundary sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingresa tu nueva Contraseña
            </h1>
            <h2 className="dark:text-white">{emailNew}</h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-secundary bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:text-white dark:hover:bg-slate-400 dark:focus:ring-primary-800"
              >
                Resetear Contraseña
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
