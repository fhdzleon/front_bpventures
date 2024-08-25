"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import ItemsSideBarTop from "./ItemsSideBarTop";
import ItemsSidebarBot from "./ItemsSidebarBot";
import { AuthContextType, useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const {userData} = useAuth();
  return (
    <div className="flex-col min-h-screen w-1/5  md:w-2/6 lg:w-2/6 2xl:w-1/6  items-center  bg-slate-300 md:flex   ">
      <div className=" hidden md:flex">
        <Image
          src={"https://i.ibb.co/56pzqfC/bp-ventures-color.png"}
          alt="logo"
          width={220}
          height={10}
        />
      </div>

      <div className=" md:hidden mt-5 flex">
        <Image
          src={"https://i.ibb.co/SyxGR9k/isologo-bp-ventures-a-color.png"}
          alt="logo"
          width={220}
          height={10}
        />
      </div>
      <div className="flex-grow">
        <ItemsSideBarTop />
        <ItemsSidebarBot />
      </div>

      <div className="md:flex hidden flex-col items-center  md:mb-7 justify-center">
        <Image
          src="https://i.ibb.co/4Jt1dX0/147133.png"
          alt="avatar"
          height={400}
          width={160}
        />
        <h1 className="text-secundary font-bold text-lg">Bienvenido</h1>
        <h1 className="text-secundary text-lg"> {userData?.Names}</h1>
      </div>
    </div>
  );
};

export default Sidebar;
