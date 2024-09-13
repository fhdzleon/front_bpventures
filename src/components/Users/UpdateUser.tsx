"use client";
import React, { useEffect, useState } from "react";
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";
import { useParams } from "next/navigation";
import PreloaderLoad from "../preloader/PreloaderLoad";
import { GetUserById, UpdateUser } from "@/helpers/auth.helper";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

// Función para obtener empresas
const getCompanies = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
    if (!response.ok) {
      throw new Error("Error al obtener las empresas");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

interface User {
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
  Empresa: string;
  Cuit: number;
  Domicilio: string;
}

interface Props {
  id: number;
}

const UpdateUserComponent: React.FC<Props> = ({ id }) => {
  const userId = id;
  const params = useParams();

  const myAccount = Object.keys(params).length === 0;

  const [userDataForm, setUserDataForm] = useState<User>({
    email: "",
    password: "",
    Names: "",
    LastName: "",
    Position: "",
    Empresa: "",
    Cuit: 0,
    Domicilio: "",
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const { loading, userData, setUserData } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const router = useRouter();

  const fetchUserById = async () => {
    try {
      const response = await GetUserById(userId);
      setUserDataForm(response);
      setSelectedCompanyId(companies.find((company: any) => company.name === response.Empresa)?.id || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
        if (companiesData.length > 0) {
          setSelectedCompanyId(companiesData.find((company: any) => company.name === userData?.Empresa)?.id || companiesData[0].id);
        }
        await fetchUserById();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataForm((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...userDataForm,
        Empresa: companies.find((company) => company.id === selectedCompanyId)?.name || "",
      };

      await UpdateUser(updatedUser, userId.toString());

      // Mostrar SweetAlert para éxito
      Swal.fire({
        icon: "success",
        title: "¡Usuario actualizado exitosamente!",
        text: "Redirigiendo...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Aquí puedes redirigir después de la confirmación
        // router.push(PATHROUTES.LIST);
        window.location.href = PATHROUTES.LIST;
      });
    } catch (error: any) {
      console.error("Error al actualizar el usuario:", error);

      // Mostrar SweetAlert para errores
      Swal.fire({
        icon: "error",
        title: "Error al actualizar el usuario",
        text: error.message || "Hubo un problema al intentar actualizar el usuario.",
      });
    }
  };

  const fieldLabels: { [key: string]: string } = {
    email: "Correo electrónico",
    password: "Contraseña",
    Names: "Nombres",
    LastName: "Apellidos",
    Position: "Puesto",
    Empresa: "Empresa",
    Cuit: "CUIT",
    Domicilio: "Domicilio",
  };

  return (
    <div className="flex w-full justify-center">
      {loading && <PreloaderLoad />}
      <div className="md:grid md:grid-cols-2 p-5 bg-white shadow-lg rounded-lg">
        {myAccount ? (
          <div className="col-span-1 font-futura">
            <h2 className="text-start mt-10 text-2xl text-[#2B4168]">Editar mi Cuenta</h2>
            <p className="text-black/50">Si deseas editar los datos de tu cuenta, puedes llenar los siguientes campos:</p>
          </div>
        ) : (
          <div className="col-span-1 font-futura">
            <h2 className="text-start mt-10 text-2xl text-[#2B4168]">Actualizar la Información del Usuario</h2>
            <p className="text-black/50">Si deseas editar los datos de este usuario, llena los siguientes campos:</p>
          </div>
        )}

        <div className="col-span-1">
          <form className="form-apply" onSubmit={handleSubmit}>
            {["email", "password", "Names", "LastName", "Position", "Domicilio", "Cuit"].map((field, index) => (
              <React.Fragment key={index}>
                <label htmlFor={field} className="label-apply">
                  {fieldLabels[field]}
                </label>
                <div className="relative">
                  <input
                    className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                    type={field === "password" && !passwordVisible ? "password" : "text"}
                    name={field}
                    value={userDataForm[field as keyof User]}
                    onChange={handleInputChange}
                    placeholder={fieldLabels[field]}
                  />
                  {field === "password" && (
                    <button type="button" onClick={handlePasswordVisibilityToggle} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500">
                      {passwordVisible ? "Ocultar" : "Mostrar"}
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
            {/* Campo para seleccionar empresa */}
            <div className="mb-4">
              <label htmlFor="companyId" className="label-apply">
                {fieldLabels["Empresa"]}
              </label>
              <select id="companyId" value={selectedCompanyId ?? ""} onChange={handleCompanyChange} className="input-apply" required>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Guardar Cambios</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
