"use client";	
import { RegisterUser } from "@/helpers/auth.helper";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import InputField from "../FormComponent/InputField";
import Button from "../FormComponent/Button";

interface ICreateUser {
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
}

export const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<ICreateUser>({
    email: "",
    password: "",
    Names: "",
    LastName: "",
    Position: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await RegisterUser(formData);
      toast.success("¡Usuario Registrado exitosamente!");

    } catch (error: any) {
      console.error('Error registering user:', error);
      toast.error(error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="flex justify-center items-center p-5 w-full min-w-lg">
       <Toaster richColors />

      {/* <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-balance dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-balance dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label htmlFor="Names" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Names</label>
        <input
          type="text"
          id="Names"
          name="Names"
          value={formData.Names}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-balance dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label htmlFor="LastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Last Name</label>
        <input
          type="text"
          id="LastName"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-balance dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label htmlFor="Position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Position</label>
        <input
          type="text"
          id="Position"
          name="Position"
          value={formData.Position}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-balance dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Create User
      </button> */}
        <div className="w-4/5 max-w-md p-5 bg-white shadow-lg rounded-lg">
        <h2 className="font-futura text-center">Crear Usuario</h2>

        <form className="form-apply" onSubmit={handleSubmit}>
          {["email", "password", "Names", "LastName", "Position"].map((field, index) => (
            <>
              <label htmlFor={field} key={index} className="label-apply">
              {field}
            </label>
            <input
              key={index}
             className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
              type={field === "password" ? "password" : "text"}
              name={field}
              // value={userData[field as keyof User]}
              // onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
            />
             </>
          ))}
          

          
          <Button type="submit">Crear Usuario</Button>
        </form>
      </div>
      
    </form>
    
    </>


  );
};

export default CreateUserForm;
