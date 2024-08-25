import React from "react";
import Link from "next/link";
import { PATHROUTES } from "@/helpers/pathRoutes";

const ItemsSideBarTop = () => {
  return (
    <div className="my-7">
      <Link href={PATHROUTES.HOME}>
        <div className="grid grid-cols-6 px-4 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 col-start-2 hover:scale-125 md:hover:scale-100 transform transition-all duration-500 ease-in-out md:col-start-1 md:size-6 text-secundary "
          >
            <title>Home</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <h1 className="text-xs hidden md:block font-futura text-secundary col-span-3">
            PAGINA PRINCIPAL
          </h1>
        </div>
      </Link>

      <div className="grid mt-4 grid-cols-6 px-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-8 hover:scale-125 md:hover:scale-100 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
        >
          <title>Mi unidad</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>

        <h1 className="text-xs hidden md:block text-secundary col-span-3">
          MI UNIDAD
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default ItemsSideBarTop;
