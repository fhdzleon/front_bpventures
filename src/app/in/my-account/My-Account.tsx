import React from "react";
import UpdateUser from "../update-user/Update-user";
import Security from "../security/page";

const MyAccount = () => {




  return (
    <div className="grid-rows-5 ">
      <section className="grid-span-1 w-full p-5 rounded-xl  ">
      <UpdateUser />
      </section>
      <hr />
      <section className="grid-span-1  w-full rounded-xl ">
      <Security />
      </section>
    </div>
  );
};

export default MyAccount;
