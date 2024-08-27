"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PATHROUTES } from "@/helpers/pathRoutes";

const EditUser = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push(`${PATHROUTES.UPDATE_USER}/${user.id}`);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex hover:bg-acent transition duration-300 space-x-2 bg-secundary px-4 py-1 rounded-full"
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <p className="font-futura text-white">Editar</p>
      </button>
    </div>
  );
};

export default EditUser;
