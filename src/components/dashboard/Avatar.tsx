"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Avatar = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <Image
        src="https://i.ibb.co/893QsZJ/avatardashboard.png"
        /* src="https://i.ibb.co/4Jt1dX0/147133.png" */ //* ESTE ES EL AVATAR CON FONDO AMARILLO
        alt="avatar"
        height={400}
        width={160}
      />

      <h1 className="text-secundary font-bold text-lg">Bienvenido</h1>
      {/* <h1 className="text-secundary text-lg">${user.name}</h1> */}
      <h1 className="text-secundary text-lg">Henry</h1>
    </div>
  );
};

export default Avatar;
