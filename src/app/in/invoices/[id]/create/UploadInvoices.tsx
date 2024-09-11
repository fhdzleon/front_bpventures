"use client";
import UploadInvoiceComponent from "@/components/invoice/UploadInvoiceComponet";
import { getUserById } from "@/helpers/auth.helper";
import React, { useEffect, useState } from "react";

interface IdParams {
  params: {
    id: number;
  };
}
export const UploadInvoices: React.FC<IdParams> = ({ params }) => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<any>();

  const fetchUserById = async () => {
    try {
      const res = await getUserById(params.id);
      setUserName(res.Names);
      setUserEmail(res.email);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <div className="container mx-auto py-6 w-4/5 font-futura">
      <h1 className="text-4xl font-futura  text-secundary">Usuario: {userName} ({userEmail}) </h1>
      <UploadInvoiceComponent userId={params?.id} />
      {/* <VoucherUpload /> */}
    </div>
  );
};

export default UploadInvoices;
