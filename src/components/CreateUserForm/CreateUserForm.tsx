"use client";
import { RegisterUser } from "@/helpers/auth.helper";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Button from "../FormComponent/Button";
import "../../styles/form-style.css";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";


interface ICreateUser {
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
}

const generateRandomPassword = (length: number = 12): string => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?/";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<ICreateUser>({
    email: "",
    password: "",
    Names: "",
    LastName: "",
    Position: "",
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordGeneration = () => {
    const newPassword = generateRandomPassword();
    setFormData({
      ...formData,
      password: newPassword,
    });
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res =  await RegisterUser(formData);
      router.push(`${PATHROUTES.LIST}/${res.id}`);

      toast.success("¡Usuario registrado exitosamente!");
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      toast.error(error.message);
    }
  };

  const fieldLabels: { [key: string]: string } = {
    email: "Correo electrónico",
    password: "Contraseña",
    Names: "Nombres",
    LastName: "Apellidos",
    Position: "Puesto",
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />
      <form className="form-apply" onSubmit={handleSubmit}>
        <h2 className="text-center text-[1.2rem] mb-6">Creación de Usuario</h2>
        {Object.keys(formData).map((field, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={field} className="label-apply">
              {fieldLabels[field]}
            </label>
            <div className="relative">
              <input
                className="input-apply"
                type={field === "password" && !passwordVisible ? "password" : "text"}
                name={field}
                value={formData[field as keyof ICreateUser]}
                onChange={handleChange}
                placeholder={fieldLabels[field]}
                // required
              />
              {field === "password" && (
                <button type="button" onClick={handlePasswordVisibilityToggle} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500">
                  {passwordVisible ? "Ocultar" : "Mostrar"}
                </button>
              )}
            </div>
            {field === "password" && (
              <Button onClick={handlePasswordGeneration} type="button">
                Generar Contraseña
              </Button>
            )}
          </div>
        ))}
        <Button type="submit">Crear Usuario</Button>
      </form>
    </div>
  );
};

export default CreateUserForm;
