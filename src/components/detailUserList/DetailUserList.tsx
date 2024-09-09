"use client";
import Link from "next/link";
import EditUser from "../adminUsersActions/EditUser";
import DeleteUser from "../adminUsersActions/DeleteUser";
import BlockUser from "../adminUsersActions/BlockUser";
import { PATHROUTES } from "@/helpers/pathRoutes";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UploadInvoiceUser } from "../InvoicesButton/UploadInvoiceUser";
import BackButton from "../Buttons/BackButton";
export interface User {
  id: number;
  email: string;
  Names: string;
  LastName: string;
  Position: string;
  statusId: number;
}

interface UserDetailViewProps {
  user: User;
}

const UserDetailView: React.FC<UserDetailViewProps> = ({ user }) => {
  const { blocked } = useAuth();

  return (
    <div className="m-3 max-w-4xl mx-auto p-8 bg-gray-100 shadow-xl rounded-xl font-sans">
      <section className="mb-12">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#2B4168]  border-[#2B4168] pb-2">
              Detalles del Usuario
            </h1>
            <BackButton />
          </div>
        </section>
        <div className="bg-gradient-to-br bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-futura text-[#2B4168] mb-8">
            Información del Usuario
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg">
                <strong className="font-futura">ID de Usuario:</strong>{" "}
                {user.id}
              </p>
              <p className="text-lg">
                <strong className="font-futura">Nombre Completo:</strong>{" "}
                {user.Names} {user.LastName}
              </p>
              <p className="text-lg">
                <strong className="font-futura">Correo Electrónico:</strong>{" "}
                {user.email}
              </p>
              <p className="text-lg">
                <strong className="font-futura">Cargo:</strong> {user.Position}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg">
                <strong className="font-futura">Estado de la Cuenta:</strong>
                {"  "}
                <span
                  className={`p-2 m-3 font-futura inline-block rounded-full text-white ${
                    !blocked ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {!blocked ? "Activo" : "Bloqueado"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-wrap gap-6">
          <EditUser />
          <BlockUser />
          <DeleteUser />
        </div>
      </section>

      <section className=" bg-gradient-to-br  bg-white p-8 rounded-lg shadow-lg">
        <h2 className=" mt-19 text-3xl  text-left font-futura text-[#2B4168] ">
          Información de Facturación
        </h2>
        <div className="flex">
          <Link href={PATHROUTES.INVOICES}>
            <button className="flex m-8  text-white font-futura  p-2 rounded-full bg-[#2B4168] hover:bg-acent ">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-auto hover:text-acent"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              Ver Facturacion del Usuario
            </button>
          </Link>
          <Link href={`${PATHROUTES.INVOICES}/${user.id}/create`}>
            <UploadInvoiceUser />
          </Link>{" "}
        </div>
        {/* {userInvoices.length > 0 ? (
          userInvoices.map(invoice => (
            <InvoiceDetail key={invoice.id} Invoice={invoice} />
          ))
        ) : (
          <p>No hay facturas disponibles para este usuario.</p>
        )} */}
      </section>
    </div>
  );
};

export default UserDetailView;
