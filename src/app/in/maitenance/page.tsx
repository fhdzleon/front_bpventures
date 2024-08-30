import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col items-center text-3xl space-y-5 justify-center h-screen">
      <Image
        src={"https://i.postimg.cc/9MGFVQ6t/inprocess.png"}
        alt="logo"
        width={650}
        height={10}
      />
      <h1 className="text-secundary font-futura">Modulo en construccion</h1>
      <h1 className="text-secundary font-futura">Pronto estara disponible</h1>
    </div>
  );
};

export default Page;
