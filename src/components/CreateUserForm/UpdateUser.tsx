"use client";

import { useAuth } from "@/context/AuthContext";
import { GetUserById, UpdateUser } from "@/helpers/auth.helper";
import React, { useEffect, useState } from "react";
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";

interface User {
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
}
interface Props {
  id: number;
}
const UpdateUserComponent: React.FC<Props> = (props) => {
  const { id } = props;
  const userId = id; // Considera hacer esto dinámico si es necesario

  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
    Names: "",
    LastName: "",
    Position: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await GetUserById(userId.toString());
        setUserData(res); // Aquí se actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const userData2 = {
    email: "newemail@example.com",
    Names: "John Updated",
    LastName: "Doe Updated",
    Position: "Manager",
    mfaEnabled: false,
    active: true,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await UpdateUser(userData, userId.toString());
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex w-full justify-center ">
      <div className="md:grid md:grid-cols-2  p-5 bg-white shadow-lg rounded-lg">
        <div className="col-span-1 font-futura ">
          <h2 className=" text-start mt-10 text-2xl text-[#2B4168]">
            Editar Usuario
          </h2>
          <p className="text-black/50">
            Si deseas editar los datos de tu usuario puedes llenar los
            siguientes campos
          </p>
        </div>

        <div className="col-span-1">
          <form className="form-apply" onSubmit={handleSubmit}>
            {["email", "password", "Names", "LastName", "Position"].map(
              (field, index) => (
                <>
                  <label htmlFor={field} className="label-apply">
                    {field}
                  </label>
                  <input
                    key={index}
                    className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={userData[field as keyof User]}
                    onChange={handleInputChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                  />
                </>
              )
            )}

            <Button type="submit">Guardar Cambios</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
