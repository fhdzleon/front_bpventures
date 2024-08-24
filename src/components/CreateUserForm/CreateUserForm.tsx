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

    try {
      await RegisterUser(formData);
      alert('User registered successfully');
    } catch (error: any) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-b from-white via-[#d6dbdc] to-white dark:from-black dark:via-black dark:to-black p-6 rounded-lg shadow-lg text-[color:rgb(var(--foreground-rgb))]">
      <div>
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
      </button>
    </form>
  );
};

export default CreateUserForm;
