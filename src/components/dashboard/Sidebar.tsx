import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className=" h-screen w-1/5 border-sky-100 bg-slate-300 flex items-start justify-center ">
      <Image
        src={"https://i.ibb.co/56pzqfC/bp-ventures-color.png"}
        alt="logo"
        width={300}
        height={10}
      />
    </div>
  );
};

export default Sidebar;
