"use client";
import React from "react";
import Security from "@/components/Security2Fa/Security2Fa";
import { useAuth } from "@/context/AuthContext-1";
import UpdateUserComponent from "@/components/Users/UpdateUser";

const MyAccount = () => {
  const { loading, user } = useAuth();
  return (
    <>
      {!loading ? (
        <>
          <div className="grid-rows-5 ">
            <section className="grid-span-1 w-full p-5 rounded-xl  ">
              {/* <UpdateUser /> */}
              <UpdateUserComponent id={user?.id} />
            </section>
            <hr />
            <section className="grid-span-1 w-full  rounded-xl ">
              <Security />
            </section>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-screen flex-col items-center justify-center mt-7">
            <span className="loader"></span>
          </div>
        </>
      )}
    </>
  );
};

export default MyAccount;
