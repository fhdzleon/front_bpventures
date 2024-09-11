import React from "react";
import Link from "next/link";
import { PATHROUTES } from "@/helpers/pathRoutes";

const ItemsSidebarBot = () => {
  return (
    <div className="my-10">
      
      <Link href={PATHROUTES.INVOICES+"/me"}>
        <div className="grid grid-cols-6 py-2 px-4 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 hover:scale-125 md:hover:scale-100 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
          >
            <title>Mis Facturas</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>

          <h1 className="text-xs font-futura text-secundary hidden md:block  col-span-3">
            MIS FACTURAS
          </h1>
        </div>
      </Link>

      <Link href={PATHROUTES.MY_ACCOUNT}>
        <div className="grid grid-cols-6 py-2 px-4 items-center  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 hover:scale-125 md:hover:scale-100 md:size-6 col-start-2 md:col-start-1 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer "
          >
            <title>Mi cuenta</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <h1 className="text-xs text-secundary hidden md:block  font-futura  col-span-3">
            MI CUENTA
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default ItemsSidebarBot;
