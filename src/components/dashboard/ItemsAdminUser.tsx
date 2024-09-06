import React from "react";
import { PATHROUTES } from "@/helpers/pathRoutes";
import Link from "next/link";

const ItemsAdminUser = () => {
  return (
    <div>
      <div className="hidden md:grid grid-cols-6 py-2 px-4 items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-8 hover:scale-125 md:hover:scale-100 md:size-6 col-start-2 md:col-start-1 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer"
        >
          <title>Usuarios</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>

        <h1 className="text-xs text-secundary hidden md:block font-futura   col-span-3">
          USUARIOS
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill=""
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4 hidden md:block text-secundary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      <Link href={PATHROUTES.LIST}>
        <div className="grid grid-cols-6 py-2 px-4 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4 hidden md:block text-secundary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 hover:scale-125 md:hover:scale-100 col-start-2 transform transition-all duration-500 ease-in-out md:col-start-2 md:size-6 text-secundary"
          >
            <title>Ver usuarios</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
            />
          </svg>

          <h1 className="text-xs text-secundary hidden md:block font-futura cursor-pointer col-span-3">
            VER USUARIOS
          </h1>
        </div>
      </Link>

      <Link href={PATHROUTES.CREATE_USER}>
        <div className="grid grid-cols-6 py-2 px-4 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4 hidden md:block text-secundary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 hover:scale-125 p-0 m-0 md:hover:scale-100 transform transition-all duration-500 ease-in-out col-start-2 md:col-start-2 md:size-6 text-secundary"
          >
            <title>Agregar usuarios</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>

          <h1 className="text-xs text-secundary hidden md:block font-futura cursor-pointer col-span-3">
            <Link href={PATHROUTES.CREATE_USER}>AGREGAR USUARIO</Link>
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default ItemsAdminUser;
