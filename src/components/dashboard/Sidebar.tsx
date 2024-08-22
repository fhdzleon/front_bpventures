import React from "react";
import Image from "next/image";
import ItemsSideBarTop from "./ItemsSideBarTop";
import ItemsSidebarBot from "./ItemsSidebarBot";
 
const Sidebar = () => {
  return (
    <div className="flex-col h-screen w-1/6  items-center border-sky-100 bg-slate-300 flex   ">
      <div className="flex">
        <Image
          src={"https://i.ibb.co/56pzqfC/bp-ventures-color.png"}
          alt="logo"
          width={220}
          height={10}
        />
      </div>

      <div className="flex-grow">
        <ItemsSideBarTop />
        <ItemsSidebarBot />
      </div>

      <div className="flex flex-col items-center mb-7 justify-center">
        <Image
          src="https://i.ibb.co/4Jt1dX0/147133.png"
          alt="avatar"
          height={400}
          width={160}
        />
        <h1 className="text-secundary font-bold text-lg">Bienvenido</h1>
        <h1 className="text-secundary text-lg">Usuario</h1>
      </div>
    </div>
  );
};

export default Sidebar;
