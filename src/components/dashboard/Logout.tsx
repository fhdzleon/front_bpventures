"use client";

import { PATHROUTES } from "@/helpers/pathRoutes";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();

  const clickHandler = () => {
    localStorage.clear();
    document.cookie =
      "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict;";
    router.push(PATHROUTES.LOGIN);
  };

  return (
    <div>
      <div className="grid grid-cols-6 py-2 px-4 items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-8 hover:scale-125 md:hover:scale-100 col-start-2 md:col-start-1 md:size-6 text-secundary transform transition-all duration-500 ease-in-out cursor-pointer"
          onClick={clickHandler}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>

        <button
          onClick={clickHandler}
          className="text-xs font-futura text-secundary hidden md:block  col-span-3"
        >
          CERRAR SESION
        </button>
      </div>
    </div>
  );
};

export default Logout;
