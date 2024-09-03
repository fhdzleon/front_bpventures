"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Avatar = () => {
  const { userData, loading } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(userData?.Names || "");
  }, [userData?.Names]);
  return (
    <>
      {!loading ? (
        <>
          <div className="flex flex-col items-center justify-center mt-7">
            <Image
              src="https://i.postimg.cc/7hR9Z5NW/avatardashboard.png"
              alt="avatar"
              height={400}
              width={160}
              className="mb-4" // Margen inferior para espaciar la imagen del texto
            />
            <h1 className="text-secundary font-bold text-lg mb-1">
              Bienvenido
            </h1>
            <h1 className="text-secundary text-lg">{name}</h1>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center mt-7">
            <span className="loader"></span>
          </div>
        </>
      )}
    </>
  );
};

export default Avatar;
