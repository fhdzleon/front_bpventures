"use client";	
import { RegisterUser } from "@/helpers/auth.helper";
import React, { useState } from "react";

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
    // const errors = validateRegisterForm(userData);
    // if (Object.values(errors).some((error) => error !== '')) {
    //   alert('Password and confirm password do not match');
    //   setErrorUser(errors);
    //   return;
    // }

    try {
      await RegisterUser(formData);
      alert('User registered successfully');
      // router.push(PATHROUTES.LOGIN);
    } catch (error: any) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="Names">Names</label>
        <input
          type="text"
          id="Names"
          name="Names"
          value={formData.Names}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="LastName">Last Name</label>
        <input
          type="text"
          id="LastName"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="Position">Position</label>
        <input
          type="text"
          id="Position"
          name="Position"
          value={formData.Position}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;
