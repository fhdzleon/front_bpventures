import React from "react";
import Image from "next/image";
import ItemsSideBarTop from "./ItemsSideBarTop";
import ItemsSidebarBot from "./ItemsSidebarBot";
import SecurityButton from "../buttonSecurity/ButtonSecurity";
import Avatar from "./Avatar";

const Sidebar = () => {
  return (
    <div className="flex-col w-1/5 md:w-2/6 lg:max-w-80 2xl:max-w-80 min-h-screen items-center  bg-slate-300 md:flex">
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
        <SecurityButton />
      </div>

      <div className="md:flex hidden flex-col items-center  md:mb-12 justify-center">
        <Avatar />
      </div>
    </div>
  );
};

export default Sidebar;
