import React from "react";
import UpdateUser from "../update-user/Update-user";
import Security from "@/components/Security2Fa/Security2Fa";

const MyAccount = () => {
  return (
    <div className="grid-rows-5 ">
      <section className="grid-span-1 w-full p-5 rounded-xl  ">
        <UpdateUser />
      </section>
      <hr />
      <section className="grid-span-1 w-full  rounded-xl ">
        <Security />
      </section>
    </div>
  );
};

export default MyAccount;
