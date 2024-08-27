'use client'
import Link from "next/link";
import EditUser from "../adminUsersActions/EditUser";
import DeleteUser from "../adminUsersActions/DeleteUser";
import BlockUser from "../adminUsersActions/BlockUser";
import { PATHROUTES } from "@/helpers/pathRoutes";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
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

  const {blocked} = useAuth();
    
  return (
    <div className="m-3 max-w-4xl mx-auto p-8 bg-gray-100 shadow-xl rounded-xl font-sans">
      <section className="mb-12">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#2B4168]  border-[#2B4168] pb-2">
              Detalles del Usuario
            </h1>
            <Link href="/in/list">
              <button className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center">
                Volver
              </button>
            </Link>
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
                  { !blocked ? "Activo" : "Bloqueado"}
                </span>
             
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-wrap gap-6">
          <BlockUser />
          <DeleteUser />
          <EditUser />
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gradient-to-br bg-white p-8 rounded-lg shadow-lg">
         <Link href={PATHROUTES.MAITENANCE}> <h2 className="text-3xl font-futura text-[#2B4168] mb-6">
            Información de Facturación
          </h2></Link>
          <p className="text-lg font-futura mb-4">Estado de Facturación:</p>
          <p className="text-lg">Sin facturas pendientes</p>
        </div>
       <Link href={PATHROUTES.MAITENANCE}> <button className="m-5 bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center">
          <svg
            width="22"
            height="15"
            viewBox="0 0 22 15"
            fill="none"
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
              fill="white"
            />
          </svg>{" "}
          Ver Facturación
        </button></Link>
      </section>
    </div>
  );
};

export default UserDetailView;
