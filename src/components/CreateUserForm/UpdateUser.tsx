"use client";

import { useAuth } from "@/context/AuthContext";
import { GetUserById, UpdateUser } from "@/helpers/auth.helper";
import React, { useEffect, useState } from "react";
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from "sonner";

interface User {
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
  oldPassword?: string; // Añadido para la contraseña antigua
}
interface Props {
  id: number;
}

const UpdateUserComponent: React.FC<Props> = (props) => {
  const { id } = props;
  const userId = id;

  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
    Names: "",
    LastName: "",
    Position: "",
    oldPassword: "", // Añadido para la contraseña antigua
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await GetUserById(userId.toString());
        setUserData(res);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOldPasswordVisibilityToggle = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await UpdateUser(userData, userId.toString());
      toast.success("Usuario actualizado exitosamente!");
    } catch (error:any) {
      console.error("Error al actualizar el usuario:", error);
      toast.error(error.message);

    }
  };

  const fieldLabels: { [key: string]: string } = {
    email: "Correo electrónico",
    password: "Contraseña",
    oldPassword: "Contraseña antigua", // Etiqueta para el nuevo campo
    Names: "Nombres",
    LastName: "Apellidos",
    Position: "Puesto",
  };

  return (
    <div className="flex w-full justify-center">
      <Toaster richColors />
      <div className="md:grid md:grid-cols-2 p-5 bg-white shadow-lg rounded-lg">
        <div className="col-span-1 font-futura">
          <h2 className="text-start mt-10 text-2xl text-[#2B4168]">Editar Usuario</h2>
          <p className="text-black/50">Si deseas editar los datos de tu usuario, puedes llenar los siguientes campos:</p>
        </div>

        <div className="col-span-1">
          <form className="form-apply" onSubmit={handleSubmit}>
            {["email", "oldPassword", "password", "Names", "LastName", "Position"].map((field, index) => (
              <React.Fragment key={index}>
                <label htmlFor={field} className="label-apply">
                  {fieldLabels[field]}
                </label>
                {field === "Position" ? (
                  <select
                    id={field}
                    name={field}
                    className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                    value={userData[field as keyof User]}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="gerente">Gerente</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="operario">Operario</option>
                  </select>
                ) : (
                  <div className="relative">
                    <input
                      className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                      type={(field === "password" && !passwordVisible) || (field === "oldPassword" && !oldPasswordVisible) ? "password" : "text"}
                      name={field}
                      value={userData[field as keyof User]}
                      onChange={handleInputChange}
                      placeholder={fieldLabels[field]}
                      required
                    />
                    {field === "password" && (
                      <button type="button" onClick={handlePasswordVisibilityToggle} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500">
                        {passwordVisible ? "Ocultar" : "Mostrar"}
                      </button>
                    )}
                    {field === "oldPassword" && (
                      <button type="button" onClick={handleOldPasswordVisibilityToggle} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500">
                        {oldPasswordVisible ? "Ocultar" : "Mostrar"}
                      </button>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}

            <Button type="submit">Guardar Cambios</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
